import { TripData, PackingItem, WeatherType, ActivityType } from './types';

export function generatePackingList(trip: TripData): PackingItem[] {
  const items: PackingItem[] = [];
  let itemId = 0;

  const addItem = (name: string, category: PackingItem['category'], quantity: number, reason: string) => {
    items.push({ id: `item-${itemId++}`, name, category, quantity, reason, packed: false });
  };

  // Base clothing scaled by duration
  const baseClothingMultiplier = Math.ceil(trip.duration / 3);
  addItem('T-shirts', 'clothing', 3 * baseClothingMultiplier, `${trip.duration} days requires multiple changes`);
  addItem('Underwear', 'clothing', trip.duration, 'Daily essentials for entire trip');
  addItem('Socks', 'clothing', trip.duration, 'Fresh pair for each day');
  addItem('Pants/Jeans', 'clothing', 2 + Math.floor(trip.duration / 5), 'Versatile bottoms for various activities');

  // Weather-based clothing
  if (trip.weather === 'cold') {
    addItem('Thermal jacket', 'clothing', 1, 'Cold climate protection');
    addItem('Sweaters', 'clothing', 2, 'Layering for warmth');
    addItem('Gloves', 'clothing', 1, 'Hand protection in cold weather');
    addItem('Beanie', 'clothing', 1, 'Head warmth essential');
  } else if (trip.weather === 'hot') {
    addItem('Shorts', 'clothing', 3, 'Hot weather comfort');
    addItem('Light shirts', 'clothing', 4, 'Breathable clothing for heat');
    addItem('Sun hat', 'clothing', 1, 'Sun protection essential');
  } else if (trip.weather === 'rainy') {
    addItem('Rain jacket', 'clothing', 1, 'Waterproof protection');
    addItem('Waterproof shoes', 'clothing', 1, 'Keep feet dry in wet conditions');
    addItem('Umbrella', 'essentials', 1, 'Rain coverage essential');
  }

  // Activity-based gear
  if (trip.activities.includes('beach')) {
    addItem('Swimwear', 'clothing', 2, 'Beach activities require swim gear');
    addItem('Beach towel', 'essentials', 1, 'Essential for beach visits');
    addItem('Sunscreen SPF 50+', 'essentials', 1, 'Skin protection from UV rays');
    addItem('Sunglasses', 'essentials', 1, 'Eye protection and comfort');
    addItem('Flip-flops', 'clothing', 1, 'Beach footwear');
  }

  if (trip.activities.includes('trekking') || trip.activities.includes('adventure')) {
    addItem('Hiking boots', 'activity-gear', 1, 'Proper footwear for trekking terrain');
    addItem('Backpack (30L)', 'activity-gear', 1, 'Carry essentials during hikes');
    addItem('Water bottle', 'activity-gear', 1, 'Hydration during activities');
    addItem('First aid kit', 'essentials', 1, 'Safety for outdoor activities');
    addItem('Trekking poles', 'activity-gear', 2, 'Support for challenging trails');
  }

  if (trip.activities.includes('business')) {
    addItem('Formal shirts', 'clothing', 3, 'Professional business attire');
    addItem('Dress pants', 'clothing', 2, 'Business meeting essentials');
    addItem('Blazer', 'clothing', 1, 'Professional appearance');
    addItem('Dress shoes', 'clothing', 1, 'Formal footwear');
    addItem('Tie', 'clothing', 2, 'Business formality');
    addItem('Laptop', 'electronics', 1, 'Work requirements');
    addItem('Business cards', 'essentials', 1, 'Networking essential');
  }

  if (trip.activities.includes('urban')) {
    addItem('Casual sneakers', 'clothing', 1, 'Comfortable city walking');
    addItem('Day bag', 'essentials', 1, 'Carry items while exploring');
    addItem('City guidebook/map', 'essentials', 1, 'Navigation assistance');
  }

  // Essential electronics
  addItem('Phone charger', 'electronics', 1, 'Keep devices powered');
  addItem('Power bank', 'electronics', 1, 'Backup power on the go');
  addItem('Universal adapter', 'electronics', 1, 'Compatible charging anywhere');
  
  if (trip.duration > 5) {
    addItem('Camera', 'electronics', 1, 'Capture memories on longer trips');
  }

  // Core essentials
  addItem('Toiletries kit', 'essentials', 1, 'Personal hygiene essentials');
  addItem('Medications', 'essentials', 1, 'Health and wellness');
  addItem('Travel documents', 'essentials', 1, 'ID, tickets, reservations');
  addItem('Wallet', 'essentials', 1, 'Money and cards');

  if (trip.duration > 7) {
    addItem('Laundry detergent packets', 'essentials', 1, 'Wash clothes during extended stay');
  }

  return items;
}

export function getTripInsights(trip: TripData) {
  const insights = {
    climate: '',
    activities: '',
    duration: '',
    budget: '',
    style: '',
    mobility: '',
    preparation: [] as string[]
  };

  // Climate insights
  const weatherInsights: Record<WeatherType, string> = {
    sunny: 'Expect clear skies and warm temperatures. Pack light, breathable fabrics.',
    rainy: 'Prepare for wet conditions. Waterproof gear is essential.',
    cold: 'Low temperatures expected. Layer clothing and pack warm essentials.',
    hot: 'High temperatures anticipated. Stay hydrated and protect from sun exposure.'
  };
  insights.climate = weatherInsights[trip.weather];

  // Activity insights
  const activityCount = trip.activities.length;
  insights.activities = activityCount > 2 
    ? `Diverse itinerary with ${activityCount} activity types. Pack versatile items.`
    : `Focused trip with ${trip.activities.join(' and ')} activities. Specialized gear recommended.`;

  // Duration insights
  if (trip.duration <= 3) {
    insights.duration = 'Short trip - pack light and focus on essentials only.';
  } else if (trip.duration <= 7) {
    insights.duration = 'Week-long trip - balance between variety and minimal luggage.';
  } else {
    insights.duration = 'Extended stay - consider laundry options to pack lighter.';
  }

  const currency = trip.currency ?? 'USD';
  if (trip.budget && trip.budget > 0) {
    insights.budget = `Target budget set at ${currency} ${trip.budget.toLocaleString()} for the full trip.`;
  } else {
    const estimate = Math.round(trip.duration * 180 * (trip.travelers ?? 1));
    insights.budget = `Estimated baseline budget: ${currency} ${estimate.toLocaleString()} based on trip length.`;
  }

  const travelStyle = trip.travelStyle ?? 'balanced';
  const pace = trip.pace ?? 'moderate';
  insights.style = `Plan leans ${travelStyle} with a ${pace} daily rhythm.`;

  const transportNote = trip.transport ? `Primary transport: ${trip.transport}.` : 'Plan transit options in advance.';
  const lodgingNote = trip.lodging ? `Stay focus: ${trip.lodging}.` : 'Shortlist lodging in a walkable district.';
  insights.mobility = `${transportNote} ${lodgingNote}`;

  // Smart preparation notes
  insights.preparation.push(`Check ${trip.destination} visa requirements and entry restrictions`);
  insights.preparation.push('Book accommodations and transportation in advance');
  
  if (trip.activities.includes('trekking') || trip.activities.includes('adventure')) {
    insights.preparation.push('Research trail conditions and difficulty levels');
    insights.preparation.push('Inform someone of your trekking itinerary');
  }
  
  if (trip.weather === 'rainy') {
    insights.preparation.push('Monitor weather forecasts daily before departure');
  }
  
  insights.preparation.push('Purchase travel insurance for peace of mind');

  return insights;
}
