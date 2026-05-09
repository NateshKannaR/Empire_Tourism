-- Create trips table
CREATE TABLE trips (
  id TEXT PRIMARY KEY,
  destination TEXT NOT NULL,
  duration INTEGER NOT NULL,
  weather TEXT NOT NULL,
  activities TEXT[] NOT NULL,
  date TEXT NOT NULL,
  start_date TEXT,
  companion_type TEXT,
  travel_style TEXT,
  lodging TEXT,
  transport TEXT,
  pace TEXT,
  travelers INTEGER,
  budget NUMERIC,
  currency TEXT,
  interests TEXT[],
  meal_style TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create packing_lists table
CREATE TABLE packing_lists (
  id SERIAL PRIMARY KEY,
  trip_id TEXT UNIQUE NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_trips_created_at ON trips(created_at DESC);
CREATE INDEX idx_packing_lists_trip_id ON packing_lists(trip_id);

-- Enable Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_lists ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - customize based on your auth needs)
CREATE POLICY "Allow all operations on trips" ON trips FOR ALL USING (true);
CREATE POLICY "Allow all operations on packing_lists" ON packing_lists FOR ALL USING (true);
