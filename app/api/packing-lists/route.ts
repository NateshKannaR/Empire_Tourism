import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  if (!supabaseServer) return NextResponse.json({ lists: [] });

  const tripId = req.nextUrl.searchParams.get('tripId');

  if (tripId) {
    const { data, error } = await supabaseServer
      .from('packing_lists').select('*').eq('trip_id', tripId).single();
    if (error || !data) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    return NextResponse.json({ list: { tripId: data.trip_id, items: data.items } });
  }

  const { data, error } = await supabaseServer.from('packing_lists').select('*');
  if (error) return NextResponse.json({ error: 'Failed to load.' }, { status: 500 });

  const lists = (data ?? []).map((l) => ({ tripId: l.trip_id, items: l.items }));
  return NextResponse.json({ lists });
}

export async function POST(req: NextRequest) {
  if (!supabaseServer) return NextResponse.json({ error: 'DB not configured.' }, { status: 503 });

  try {
    const payload = await req.json();
    if (!payload?.tripId || !Array.isArray(payload?.items)) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }
    const { data, error } = await supabaseServer
      .from('packing_lists').upsert({ trip_id: payload.tripId, items: payload.items }).select().single();
    if (error || !data) return NextResponse.json({ error: 'Failed to save.' }, { status: 500 });
    return NextResponse.json({ list: { tripId: data.trip_id, items: data.items } });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
