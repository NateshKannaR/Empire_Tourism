import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { mapRecordToTrip, mapTripToRecord, TripRecord } from '@/lib/dataMappers';

interface Params {
  params: { id: string };
}

export async function GET(_: NextRequest, { params }: Params) {
  if (!supabaseServer) return NextResponse.json({ error: 'DB not configured.' }, { status: 503 });

  const { data, error } = await supabaseServer
    .from('trips').select('*').eq('id', params.id).single();

  if (error || !data) return NextResponse.json({ error: 'Trip not found.' }, { status: 404 });
  return NextResponse.json({ trip: mapRecordToTrip(data as TripRecord) });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!supabaseServer) return NextResponse.json({ error: 'DB not configured.' }, { status: 503 });

  try {
    const payload = await req.json();
    const record = mapTripToRecord({ ...payload, id: params.id });
    const { data, error } = await supabaseServer
      .from('trips').update(record).eq('id', params.id).select().single();
    if (error || !data) return NextResponse.json({ error: 'Failed to update trip.' }, { status: 500 });
    return NextResponse.json({ trip: mapRecordToTrip(data as TripRecord) });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  if (!supabaseServer) return NextResponse.json({ error: 'DB not configured.' }, { status: 503 });

  const { error } = await supabaseServer.from('trips').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: 'Failed to delete trip.' }, { status: 500 });
  return NextResponse.json({ success: true });
}
