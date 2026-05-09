'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Cloud, Activity, Sparkles, Users, Wallet, Compass, Hotel, PlaneTakeoff, UtensilsCrossed } from 'lucide-react';
import AdaptiveBackground from '@/components/AdaptiveBackground';
import WeatherVisualization from '@/components/WeatherVisualization';
import ParticleSystem from '@/components/ParticleSystem';
import { TripData, WeatherType, ActivityType, CompanionType, TravelStyle, LodgingType, TransportType, PaceType, MealPreference } from '@/lib/types';
import { generatePackingList } from '@/lib/packingEngine';
import { store } from '@/lib/store';
import { buildSmartPlan } from '@/lib/smartPlanner';
import { fetchWeatherData, mapWeatherCondition } from '@/lib/weatherUtils';

export default function PlannerPage() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(7);
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [budget, setBudget] = useState(1800);
  const [currency, setCurrency] = useState('USD');
  const [travelers, setTravelers] = useState(1);
  const [companionType, setCompanionType] = useState<CompanionType>('solo');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('balanced');
  const [lodging, setLodging] = useState<LodgingType>('boutique');
  const [transport, setTransport] = useState<TransportType>('flight');
  const [pace, setPace] = useState<PaceType>('moderate');
  const [mealStyle, setMealStyle] = useState<MealPreference>('mixed');
  const [interests, setInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const weatherOptions: { type: WeatherType; label: string; emoji: string; color: string }[] = [
    { type: 'sunny', label: 'Sunny', emoji: '☀️', color: 'from-yellow-500/20 to-orange-500/20' },
    { type: 'rainy', label: 'Rainy', emoji: '🌧️', color: 'from-blue-500/20 to-cyan-500/20' },
    { type: 'cold', label: 'Cold', emoji: '❄️', color: 'from-blue-400/20 to-indigo-500/20' },
    { type: 'hot', label: 'Hot', emoji: '🔥', color: 'from-red-500/20 to-orange-600/20' },
  ];

  const activityOptions: { type: ActivityType; label: string; icon: string }[] = [
    { type: 'beach', label: 'Beach', icon: '🏖️' },
    { type: 'trekking', label: 'Trekking', icon: '🥾' },
    { type: 'business', label: 'Business', icon: '💼' },
    { type: 'urban', label: 'Urban', icon: '🏙️' },
    { type: 'adventure', label: 'Adventure', icon: '🧗' },
  ];

  const companionOptions: { type: CompanionType; label: string }[] = [
    { type: 'solo', label: 'Solo' },
    { type: 'couple', label: 'Couple' },
    { type: 'family', label: 'Family' },
    { type: 'group', label: 'Group' },
  ];

  const travelStyles: { type: TravelStyle; label: string }[] = [
    { type: 'relaxed', label: 'Relaxed' },
    { type: 'balanced', label: 'Balanced' },
    { type: 'fast', label: 'Fast-paced' },
    { type: 'luxury', label: 'Luxury' },
  ];

  const lodgingOptions: { type: LodgingType; label: string }[] = [
    { type: 'boutique', label: 'Boutique' },
    { type: 'hotel', label: 'Hotel' },
    { type: 'apartment', label: 'Apartment' },
    { type: 'resort', label: 'Resort' },
    { type: 'hostel', label: 'Hostel' },
  ];

  const transportOptions: { type: TransportType; label: string }[] = [
    { type: 'flight', label: 'Flight' },
    { type: 'train', label: 'Train' },
    { type: 'roadtrip', label: 'Road trip' },
    { type: 'cruise', label: 'Cruise' },
  ];

  const paceOptions: { type: PaceType; label: string }[] = [
    { type: 'low', label: 'Slow' },
    { type: 'moderate', label: 'Steady' },
    { type: 'high', label: 'High' },
  ];

  const mealOptions: { type: MealPreference; label: string }[] = [
    { type: 'local', label: 'Local eats' },
    { type: 'mixed', label: 'Mix of both' },
    { type: 'fine-dining', label: 'Fine dining' },
  ];

  const interestOptions = [
    'food',
    'culture',
    'nature',
    'nightlife',
    'photography',
    'wellness',
    'shopping',
  ];

  const toggleActivity = (activity: ActivityType) => {
    setActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const loadingSteps = [
    'Analyzing destination climate...',
    'Evaluating activity intensity...',
    'Optimizing packing quantities...',
    'Finalizing recommendations...'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const draftTrip: TripData = {
    id: 'draft',
    destination: destination || 'Your Destination',
    duration,
    weather,
    activities: activities.length > 0 ? activities : ['urban'],
    date: new Date().toISOString(),
    startDate,
    budget,
    currency,
    travelers,
    companionType,
    travelStyle,
    lodging,
    transport,
    pace,
    interests,
    mealStyle,
  };

  const smartPlan = buildSmartPlan(draftTrip);

  const handleGenerate = async () => {
    if (!destination || activities.length === 0) return;

    setIsGenerating(true);
    
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const trip: TripData = {
      id: `trip-${Date.now()}`,
      destination,
      duration,
      weather,
      activities,
      date: new Date().toISOString(),
      startDate,
      budget,
      currency,
      travelers,
      companionType,
      travelStyle,
      lodging,
      transport,
      pace,
      interests,
      mealStyle,
    };

    const packingItems = generatePackingList(trip);
    
    await store.addTrip(trip);
    await store.setPackingList({ tripId: trip.id, items: packingItems });

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsGenerating(false);
    router.push('/dashboard');
  };



  return (
    <main className="min-h-screen relative overflow-hidden">
      <AdaptiveBackground weather={weather} activities={activities} duration={duration} />

      <div className="pt-40 pb-32 px-8 max-w-[1400px] mx-auto">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-300">AI-Powered Intelligence</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            >
              Plan Your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent text-glow"
            >
              Perfect Journey
            </motion.span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full glow"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-10"
          >
            {/* Destination */}
            <div>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                <MapPin className="w-5 h-5 text-primary-400" />
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onBlur={async () => {
                    if (destination) {
                      setLoadingWeather(true);
                      try {
                        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';
                        const data = await fetchWeatherData(destination, apiKey);
                        
                        const temp = data.main.temp;
                        const condition = data.weather[0].main;
                        const detectedWeather = mapWeatherCondition(condition, temp);
                        
                        setWeatherData({
                          temperature: Math.round(temp),
                          condition: data.weather[0].description,
                          weatherType: detectedWeather,
                          humidity: data.main.humidity,
                          windSpeed: data.wind.speed,
                          icon: data.weather[0].icon,
                          city: data.name,
                          country: data.sys.country
                        });
                        setWeather(detectedWeather);
                        
                        const newsRes = await fetch(`/api/news?city=${destination}`);
                        const newsData = await newsRes.json();
                        if (!newsData.error) {
                          setNewsArticles(newsData.articles);
                        }
                      } catch (error) {
                        console.error('API error:', error);
                      }
                      setLoadingWeather(false);
                    }
                  }}
                  placeholder="Where are you heading?"
                  className="w-full px-6 py-5 glass rounded-2xl focus:outline-none focus:glow transition-all text-xl text-gray-100 placeholder-gray-500"
                />
                {loadingWeather && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-primary-500/20 border-t-primary-500 rounded-full" />
                  </div>
                )}
              </div>
              {weatherData && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-6"
                >
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold text-lg">{weatherData.city}, {weatherData.country}</div>
                        <div className="text-sm text-gray-400">Real-time weather data</div>
                      </div>
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
                        alt="weather" 
                        className="w-16 h-16" 
                      />
                    </div>
                    
                    <WeatherVisualization
                      weatherData={{
                        temperature: weatherData.temperature,
                        condition: weatherData.condition,
                        humidity: weatherData.humidity,
                        windSpeed: weatherData.windSpeed,
                        feelsLike: weatherData.temperature - (weatherData.condition.toLowerCase().includes('cold') ? 3 : weatherData.condition.toLowerCase().includes('hot') ? 2 : 0),
                        icon: weatherData.icon
                      }}
                      size="md"
                      interactive={true}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                <Calendar className="w-5 h-5 text-primary-400" />
                Duration
              </label>
              <div className="glass rounded-2xl p-8">
                <motion.div
                  key={duration}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
                >
                  {duration}
                  <span className="text-2xl ml-2">days</span>
                </motion.div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-3 bg-gray-800/50 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(14, 165, 233) 0%, rgb(14, 165, 233) ${(duration / 30) * 100}%, rgba(31, 41, 55, 0.5) ${(duration / 30) * 100}%, rgba(31, 41, 55, 0.5) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Dates + Travelers */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-6 py-4 glass rounded-2xl focus:outline-none focus:glow transition-all text-lg text-gray-100"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <Users className="w-5 h-5 text-primary-400" />
                  Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
                  className="w-full px-6 py-4 glass rounded-2xl focus:outline-none focus:glow transition-all text-lg text-gray-100"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                <Wallet className="w-5 h-5 text-primary-400" />
                Budget Target
              </label>
              <div className="grid md:grid-cols-[1fr_120px] gap-4">
                <input
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full px-6 py-4 glass rounded-2xl focus:outline-none focus:glow transition-all text-lg text-gray-100"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-4 glass rounded-2xl focus:outline-none focus:glow transition-all text-lg text-gray-100"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="AED">AED</option>
                </select>
              </div>
            </div>

            {/* Companion Type */}
            <div>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                <Users className="w-5 h-5 text-primary-400" />
                Travel Party
              </label>
              <div className="grid grid-cols-2 gap-3">
                {companionOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setCompanionType(option.type)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                      companionType === option.type ? 'glass-strong glow' : 'glass'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Weather & Activities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-10"
          >
            {/* Weather */}
            <div>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                <Cloud className="w-5 h-5 text-primary-400" />
                Expected Weather {weatherData && <span className="text-xs text-primary-400">(Auto-detected)</span>}
              </label>
              <div className="grid grid-cols-2 gap-4">
                {weatherOptions.map((option) => (
                  <motion.button
                    key={option.type}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setWeather(option.type)}
                    className={`relative p-6 rounded-2xl transition-all overflow-hidden ${
                      weather === option.type ? 'glass-strong glow' : 'glass'
                    }`}
                  >
                    {weather === option.type && (
                      <motion.div
                        layoutId="weather-glow"
                        className={`absolute inset-0 bg-gradient-to-br ${option.color} -z-10`}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="text-5xl mb-3">{option.emoji}</div>
                    <div className="text-lg font-medium">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                <Activity className="w-5 h-5 text-primary-400" />
                Activities
              </label>
              <div className="grid grid-cols-3 gap-3">
                {activityOptions.map((option) => (
                  <motion.button
                    key={option.type}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => toggleActivity(option.type)}
                    className={`relative p-5 rounded-xl transition-all ${
                      activities.includes(option.type) ? 'glass-strong glow' : 'glass'
                    }`}
                  >
                    {activities.includes(option.type) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl -z-10"
                      />
                    )}
                    <div className="text-4xl mb-2">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Travel Style + Pace */}
            <div className="glass rounded-3xl p-6 space-y-6">
              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <Compass className="w-5 h-5 text-primary-400" />
                  Travel Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {travelStyles.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setTravelStyle(option.type)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        travelStyle === option.type ? 'glass-strong glow' : 'glass'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <Compass className="w-5 h-5 text-primary-400" />
                  Daily Pace
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {paceOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setPace(option.type)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        pace === option.type ? 'glass-strong glow' : 'glass'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stay + Transport */}
            <div className="glass rounded-3xl p-6 space-y-6">
              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <Hotel className="w-5 h-5 text-primary-400" />
                  Lodging Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {lodgingOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setLodging(option.type)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        lodging === option.type ? 'glass-strong glow' : 'glass'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <PlaneTakeoff className="w-5 h-5 text-primary-400" />
                  Transport
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {transportOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setTransport(option.type)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        transport === option.type ? 'glass-strong glow' : 'glass'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Meals + Interests */}
            <div className="glass rounded-3xl p-6 space-y-6">
              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-primary-400" />
                  Meal Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {mealOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setMealStyle(option.type)}
                      className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        mealStyle === option.type ? 'glass-strong glow' : 'glass'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 text-lg font-medium text-gray-300 mb-4">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                  Trip Interests
                </label>
                <div className="flex flex-wrap gap-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm uppercase tracking-[0.2em] transition-all ${
                        interests.includes(interest) ? 'glass-strong glow' : 'glass'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Smart Plan Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16"
        >
          {/* News Section */}
          {newsArticles.length > 0 && (
            <div className="glass-strong rounded-3xl p-10 glow mb-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span>📰</span> Latest Travel News for {destination}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {newsArticles.slice(0, 4).map((article, idx) => (
                  <motion.a
                    key={idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass rounded-2xl p-5 hover:glass-strong transition-all group"
                  >
                    {article.image && (
                      <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                    )}
                    <div className="text-xs text-primary-400 mb-2">{article.source}</div>
                    <h4 className="font-semibold mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">{article.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">{article.description}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          <div className="glass-strong rounded-3xl p-10 glow">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary-400 mb-3">Smart Trip Blueprint</div>
                <h3 className="text-3xl font-bold mb-2">{smartPlan.headline}</h3>
                <p className="text-gray-400">Budget + itinerary preview built from your inputs.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {smartPlan.vibeTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full glass text-xs uppercase tracking-[0.2em] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
              <div className="space-y-4">
                {smartPlan.days.slice(0, 4).map((day) => (
                  <div key={day.day} className="flex items-start gap-4 glass rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center text-sm font-semibold">
                      D{day.day}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{day.title}</div>
                      <div className="text-sm text-gray-400">{day.focus}</div>
                    </div>
                    <div className="ml-auto text-xs uppercase tracking-[0.2em] text-primary-400">
                      {day.intensity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">Budget split</div>
                <div className="space-y-3">
                  {smartPlan.budgetSplit.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm text-gray-300">
                      <span>{item.label}</span>
                      <span className="text-primary-300 font-semibold">
                        {currency} {item.estimate.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-gray-400 text-sm">
                  Estimated total: <span className="text-gray-200 font-semibold">{currency} {smartPlan.budgetTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 80px rgba(14, 165, 233, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={!destination || activities.length === 0 || isGenerating}
            className="px-16 py-6 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 rounded-2xl text-white font-bold text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed glow-strong relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            <span className="relative z-10">Generate Smart Packing List</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Immersive Loading Screen */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl"
            />
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-24 h-24 mx-auto mb-12 rounded-full border-4 border-primary-500/20 border-t-primary-500"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-medium text-primary-300"
                >
                  {loadingSteps[loadingStep]}
                </motion.div>
              </AnimatePresence>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (loadingStep + 1) / loadingSteps.length }}
                className="h-1 w-96 mx-auto mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full origin-left"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
