export const faqKnowledge = [
  {
    keywords: ['what is', 'about', 'smarttrip', 'app', 'website'],
    answer: 'SmartTrip AI is an intelligent travel assistance platform that generates context-aware packing recommendations based on your destination, weather, duration, and activities. It helps you never forget essentials!'
  },
  {
    keywords: ['how', 'work', 'use', 'start'],
    answer: 'Simply go to the Plan Trip page, enter your destination, select trip duration, choose expected weather, and pick your activities. Our AI will generate a smart packing list tailored to your needs!'
  },
  {
    keywords: ['pack', 'packing', 'list', 'items'],
    answer: 'Our intelligent engine analyzes weather conditions, activities, and trip duration to recommend exactly what you need. Items are categorized into Clothing, Essentials, Electronics, and Activity Gear with explanations for each.'
  },
  {
    keywords: ['weather', 'sunny', 'rainy', 'cold', 'hot'],
    answer: 'Select your expected weather (Sunny, Rainy, Cold, or Hot) and we\'ll adapt your packing list accordingly. For example, cold weather adds thermal jackets and gloves, while rainy weather includes umbrellas and waterproof gear.'
  },
  {
    keywords: ['activities', 'beach', 'trekking', 'business', 'urban', 'adventure'],
    answer: 'Choose from Beach, Trekking, Business, Urban, or Adventure activities. Each adds specialized gear - like swimwear for beach trips, hiking boots for trekking, or formal wear for business travel.'
  },
  {
    keywords: ['dashboard', 'track', 'progress', 'check'],
    answer: 'The Packing Dashboard lets you mark items as packed, remove items, add custom items, and track your progress with a visual progress bar. You\'ll also get alerts for missing essentials!'
  },
  {
    keywords: ['trips', 'history', 'saved', 'previous'],
    answer: 'Visit My Trips page to see all your previous trips with their packing lists and progress. Click any trip card to view its full packing list and continue packing.'
  },
  {
    keywords: ['insights', 'advice', 'tips', 'recommendations'],
    answer: 'The Trip Insights page provides climate summaries, activity advisories, duration-based packing advice, and smart preparation notes tailored to your specific journey.'
  },
  {
    keywords: ['custom', 'add', 'own', 'item'],
    answer: 'Yes! On the Dashboard, click "Add Custom Item" to include anything specific to your trip that wasn\'t automatically suggested.'
  },
  {
    keywords: ['duration', 'days', 'long', 'short'],
    answer: 'Trip duration affects clothing quantities. Longer trips (7+ days) get more clothing items and laundry supplies, while short trips (1-3 days) focus on essentials only.'
  },
  {
    keywords: ['free', 'cost', 'price', 'pay'],
    answer: 'SmartTrip AI is completely free to use! Generate unlimited packing lists, track multiple trips, and get intelligent recommendations at no cost.'
  },
  {
    keywords: ['features', 'what can', 'capabilities'],
    answer: 'Key features include: AI-powered packing lists, weather-adaptive recommendations, activity-specific gear, interactive dashboard, progress tracking, trip history, custom items, and intelligent insights.'
  }
];

export function findAnswer(question: string): string | null {
  const lowerQuestion = question.toLowerCase();
  
  for (const faq of faqKnowledge) {
    if (faq.keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return faq.answer;
    }
  }
  
  return null;
}
