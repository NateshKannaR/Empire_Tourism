import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { mapRecordToTrip, mapTripToRecord, TripRecord } from '@/lib/dataMappers';

export async function GET() {
  if (!supabaseServer) return NextResponse.json({ trips: [] });

  const { data, error } = await supabaseServer
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Failed to load trips.' }, { status: 500 });

  const trips = (data as TripRecord[] | null)?.map(mapRecordToTrip) ?? [];
  return NextResponse.json({ trips });
}

export async function POST(req: NextRequest) {
  if (!supabaseServer) return NextResponse.json({ error: 'DB not configured.' }, { status: 503 });

  try {
    const payload = await req.json();
    if (!payload?.id || !payload?.destination || !payload?.duration || !payload?.weather) {
      return NextResponse.json({ error: 'Invalid trip payload.' }, { status: 400 });
    }
    const record = mapTripToRecord(payload);
    const { data, error } = await supabaseServer.from('trips').insert([record]).select().single();
    if (error || !data) return NextResponse.json({ error: 'Failed to create trip.' }, { status: 500 });
    return NextResponse.json({ trip: mapRecordToTrip(data as TripRecord) });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
