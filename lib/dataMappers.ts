import { TripData, WeatherType, ActivityType } from './types';

export interface TripRecord {
  id: string;
  destination: string;
  duration: number;
  weather: string;
  activities: string[];
  date: string;
  start_date?: string | null;
  travel_style?: string | null;
  pace?: string | null;
  travelers?: number | null;
  budget?: number | null;
  currency?: string | null;
  companion_type?: string | null;
  lodging?: string | null;
  transport?: string | null;
  interests?: string[] | null;
  meal_style?: string | null;
  notes?: string | null;
  created_at?: string;
}

export const mapTripToRecord = (trip: TripData): TripRecord => ({
  id: trip.id,
  destination: trip.destination,
  duration: trip.duration,
  weather: trip.weather,
  activities: trip.activities,
  date: trip.date,
  start_date: trip.startDate ?? null,
  travel_style: trip.travelStyle ?? null,
  pace: trip.pace ?? null,
  travelers: trip.travelers ?? null,
  budget: trip.budget ?? null,
  currency: trip.currency ?? null,
  companion_type: trip.companionType ?? null,
  lodging: trip.lodging ?? null,
  transport: trip.transport ?? null,
  interests: trip.interests ?? null,
  meal_style: trip.mealStyle ?? null,
  notes: trip.notes ?? null,
});

// Type guard to check if a string is a valid WeatherType
const isValidWeather = (weather: string): weather is WeatherType => {
  return ['sunny', 'rainy', 'cold', 'hot'].includes(weather);
};

// Type guard to check if a string array contains valid ActivityType values
const isValidActivities = (activities: string[]): activities is ActivityType[] => {
  const validActivities = ['beach', 'trekking', 'business', 'urban', 'adventure'];
  return activities.every(activity => validActivities.includes(activity));
};

// Helper function to safely cast optional enum-like fields
const safeCast = <T extends string>(value: string | null | undefined, validValues: T[]): T | undefined => {
  if (!value) return undefined;
  return validValues.includes(value as T) ? (value as T) : undefined;
};

export const mapRecordToTrip = (record: TripRecord): TripData => {
  // Validate weather type
  const weather = isValidWeather(record.weather) ? record.weather : 'sunny';
  
  // Validate activities
  const activities = isValidActivities(record.activities) ? record.activities : [];
  
  return {
    id: record.id,
    destination: record.destination,
    duration: record.duration,
    weather,
    activities,
    date: record.date,
    startDate: record.start_date ?? undefined,
    travelStyle: safeCast(record.travel_style, ['relaxed', 'balanced', 'fast', 'luxury']),
    pace: safeCast(record.pace, ['low', 'moderate', 'high']),
    travelers: record.travelers ?? undefined,
    budget: record.budget ?? undefined,
    currency: record.currency ?? undefined,
    companionType: safeCast(record.companion_type, ['solo', 'couple', 'family', 'group']),
    lodging: safeCast(record.lodging, ['hotel', 'boutique', 'apartment', 'resort', 'hostel']),
    transport: safeCast(record.transport, ['flight', 'train', 'roadtrip', 'cruise']),
    interests: record.interests ?? undefined,
    mealStyle: safeCast(record.meal_style, ['local', 'mixed', 'fine-dining']),
    notes: record.notes ?? undefined,
  };
};
