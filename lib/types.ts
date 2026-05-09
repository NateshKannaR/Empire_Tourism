export type WeatherType = 'sunny' | 'rainy' | 'cold' | 'hot';
export type ActivityType = 'beach' | 'trekking' | 'business' | 'urban' | 'adventure';
export type CompanionType = 'solo' | 'couple' | 'family' | 'group';
export type TravelStyle = 'relaxed' | 'balanced' | 'fast' | 'luxury';
export type LodgingType = 'hotel' | 'boutique' | 'apartment' | 'resort' | 'hostel';
export type TransportType = 'flight' | 'train' | 'roadtrip' | 'cruise';
export type PaceType = 'low' | 'moderate' | 'high';
export type MealPreference = 'local' | 'mixed' | 'fine-dining';

export interface TripData {
  id: string;
  destination: string;
  duration: number;
  weather: WeatherType;
  activities: ActivityType[];
  date: string;
  startDate?: string;
  budget?: number;
  currency?: string;
  travelers?: number;
  companionType?: CompanionType;
  travelStyle?: TravelStyle;
  lodging?: LodgingType;
  transport?: TransportType;
  pace?: PaceType;
  interests?: string[];
  mealStyle?: MealPreference;
  notes?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'essentials' | 'electronics' | 'activity-gear';
  quantity: number;
  reason: string;
  packed: boolean;
}

export interface PackingList {
  tripId: string;
  items: PackingItem[];
}
