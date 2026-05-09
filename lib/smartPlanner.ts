import { TripData, PaceType } from './types';

export interface SmartPlanDay {
  day: number;
  title: string;
  focus: string;
  intensity: 'low' | 'balanced' | 'high';
}

export interface SmartPlan {
  headline: string;
  budgetTotal: number;
  budgetSplit: { label: string; percent: number; estimate: number }[];
  days: SmartPlanDay[];
  timing: { checkIn: string; checkOut: string; bestDeparture: string };
  mobilityNotes: string[];
  bookingChecklist: string[];
  vibeTags: string[];
}

const intensityByPace: Record<PaceType, SmartPlanDay['intensity']> = {
  low: 'low',
  moderate: 'balanced',
  high: 'high',
};

const addDays = (duration: number, templates: { title: string; focus: string }[], pace: PaceType) => {
  const days: SmartPlanDay[] = [];
  const intensity = intensityByPace[pace];
  const midDays = Math.max(0, duration - 2);
  let templateIndex = 0;

  if (duration >= 1) {
    days.push({
      day: 1,
      title: 'Arrival + reset',
      focus: 'Check-in, short walk, local dinner, early night',
      intensity: 'low',
    });
  }

  for (let i = 0; i < midDays; i += 1) {
    const template = templates[templateIndex % templates.length];
    days.push({
      day: i + 2,
      title: template.title,
      focus: template.focus,
      intensity,
    });
    templateIndex += 1;
  }

  if (duration > 1) {
    days.push({
      day: duration,
      title: 'Departure glide',
      focus: 'Brunch, last stroll, airport buffer',
      intensity: 'low',
    });
  }

  return days;
};

const normalizeSplit = (parts: { label: string; percent: number }[]) => {
  const total = parts.reduce((sum, part) => sum + part.percent, 0);
  return parts.map(part => ({
    ...part,
    percent: Math.round((part.percent / total) * 100),
  }));
};

export function buildSmartPlan(trip: TripData): SmartPlan {
  const pace = trip.pace ?? 'moderate';
  const travelStyle = trip.travelStyle ?? 'balanced';
  const duration = trip.duration;
  const travelers = trip.travelers ?? 1;
  const baseBudget = duration * 180 * travelers;
  const budgetTotal = trip.budget && trip.budget > 0 ? trip.budget : baseBudget;

  const activityTemplates: { title: string; focus: string }[] = [
    { title: 'City heartbeat', focus: 'Iconic sights, skyline walk, museum window' },
    { title: 'Neighborhood slow lane', focus: 'Markets, cafes, tucked-away streets' },
    { title: 'Culture deep dive', focus: 'Gallery loop, heritage district, sunset views' },
    { title: 'Local flavor', focus: 'Food crawl, craft stores, evening vibe' },
    { title: 'Flex + recharge', focus: 'Buffer time, light shopping, spa break' },
  ];

  if (trip.activities.includes('beach')) {
    activityTemplates.unshift({
      title: 'Beach reset',
      focus: 'Sunrise dip, beach lunch, golden-hour stroll',
    });
  }
  if (trip.activities.includes('trekking') || trip.activities.includes('adventure')) {
    activityTemplates.unshift({
      title: 'Trail day',
      focus: 'Early start, scenic hike, recovery time',
    });
  }
  if (trip.activities.includes('business')) {
    activityTemplates.unshift({
      title: 'Business core',
      focus: 'Meetings, work blocks, quick evening walk',
    });
  }
  if (trip.activities.includes('urban')) {
    activityTemplates.unshift({
      title: 'City highlights',
      focus: 'Transit loop, design district, skyline views',
    });
  }

  const interestMap: Record<string, { title: string; focus: string }> = {
    food: { title: 'Food crawl', focus: 'Chef spots, markets, late dessert stop' },
    nature: { title: 'Nature reset', focus: 'Parks, coastal path, scenic lookout' },
    culture: { title: 'Culture layers', focus: 'Museums, heritage walk, local story' },
    nightlife: { title: 'Nightlife run', focus: 'Cocktails, live music, late snack' },
    photography: { title: 'Photo loop', focus: 'Sunrise angles, hidden alleys, skyline' },
    wellness: { title: 'Wellness flow', focus: 'Pilates, spa, slow afternoon' },
    shopping: { title: 'Design finds', focus: 'Boutiques, vintage, artisan gifts' },
  };

  (trip.interests ?? []).forEach(interest => {
    const template = interestMap[interest];
    if (template) {
      activityTemplates.unshift(template);
    }
  });

  const days = addDays(duration, activityTemplates, pace);

  const split = normalizeSplit([
    { label: 'Stay', percent: travelStyle === 'luxury' ? 46 : 34 },
    { label: 'Food', percent: travelStyle === 'luxury' ? 24 : 22 },
    { label: 'Experiences', percent: travelStyle === 'fast' ? 26 : 22 },
    { label: 'Transit', percent: trip.transport === 'roadtrip' ? 20 : 15 },
    { label: 'Buffer', percent: travelStyle === 'relaxed' ? 10 : 7 },
  ]);

  const budgetSplit = split.map(part => ({
    ...part,
    estimate: Math.round((budgetTotal * part.percent) / 100),
  }));

  const mobilityNotes = [
    trip.transport === 'train' ? 'Book flexible rail passes for mid-trip day hops.' : '',
    trip.transport === 'roadtrip' ? 'Plan fuel stops and keep a 90-minute buffer per leg.' : '',
    trip.transport === 'flight' ? 'Aim for arrivals before 4pm for smoother check-in.' : '',
    trip.lodging === 'apartment' ? 'Choose a base within 15 minutes of transit hubs.' : '',
  ].filter(Boolean);

  const bookingChecklist = [
    'Lock transport 6-8 weeks out for the best fares.',
    'Reserve 1-2 signature experiences ahead of time.',
    'Confirm lodging in a walkable, well-lit district.',
    'Set up a local data plan or eSIM before departure.',
    'Share a lightweight itinerary with your travel party.',
  ];

  const vibeTags = [
    trip.travelStyle ?? 'balanced',
    trip.pace ?? 'moderate',
    trip.companionType ?? 'solo',
    ...trip.activities,
    ...(trip.interests ?? []),
  ]
    .filter(Boolean)
    .slice(0, 8);

  const headline = `${trip.destination} · ${duration} days · ${travelStyle} mood`;

  return {
    headline,
    budgetTotal,
    budgetSplit,
    days,
    timing: {
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      bestDeparture: pace === 'high' ? '6:30 AM' : '8:30 AM',
    },
    mobilityNotes,
    bookingChecklist,
    vibeTags,
  };
}
