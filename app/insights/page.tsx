'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud, Activity, Calendar, Lightbulb, TrendingUp, MapPin,
  Wallet, Compass, PlaneTakeoff, Users, Hotel, UtensilsCrossed,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { store } from '@/lib/store';
import { getTripInsights } from '@/lib/packingEngine';
import { TripData } from '@/lib/types';
import AdaptiveBackground from '@/components/AdaptiveBackground';
import { buildSmartPlan } from '@/lib/smartPlanner';
import Link from 'next/link';

const weatherIcons: Record<string, string> = { sunny: '☀️', rainy: '🌧️', cold: '❄️', hot: '🔥' };
const activityIcons: Record<string, string> = { beach: '🏖️', trekking: '🥾', business: '💼', urban: '🏙️', adventure: '🧗' };

function InsightCard({
  icon: Icon,
  title,
  content,
  color,
  delay,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
  color: string;
  delay: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl border ${accent} bg-gray-900/60 p-8 group hover:border-opacity-60 transition-all`}
    >
      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-10 ${color}`} />
      <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-20 flex items-center justify-center mb-5`}>
        <Icon className="w-6 h-6" style={{ color: 'inherit' }} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{content}</p>
    </motion.div>
  );
}

export default function InsightsPage() {
  const [trip, setTrip] = useState<TripData | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate({}));
    const trips = store.getTrips();
    if (trips.length > 0) setTrip(trips[0]);
    return () => { unsubscribe(); };
  }, []);

  if (!trip) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 relative">
        <AdaptiveBackground weather="sunny" activities={[]} duration={7} />
        <div className="max-w-4xl mx-auto text-center py-32">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-8"
          >
            <Lightbulb className="w-12 h-12 text-amber-400" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-3">No Trip Data</h2>
          <p className="text-gray-400 text-lg mb-10">Create a trip to unlock intelligent insights</p>
          <Link href="/planner">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-amber-500/20 flex items-center gap-3 mx-auto"
            >
              Plan a Trip <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </main>
    );
  }

  const insights = getTripInsights(trip);
  const smartPlan = buildSmartPlan(trip);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <AdaptiveBackground weather={trip.weather} activities={trip.activities} duration={trip.duration} />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">AI Intelligence</div>
          <h1 className="text-5xl font-bold text-white mb-2">Trip Insights</h1>
          <p className="text-gray-400">Contextual intelligence for your journey to {trip.destination}</p>
        </motion.div>

        {/* Trip Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-gray-900/80 to-orange-500/5 p-8 mb-10"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{trip.destination}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    <span>{trip.duration} days</span>
                    <span>•</span>
                    <span>{weatherIcons[trip.weather]} {trip.weather}</span>
                    <span>•</span>
                    <span>{trip.travelers ?? 1} traveler{(trip.travelers ?? 1) > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {trip.activities.map(a => (
                  <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm text-amber-300">
                    {activityIcons[a]} {a}
                  </span>
                ))}
                {trip.interests?.map(i => (
                  <span key={i} className="px-3 py-1.5 bg-gray-800/60 rounded-full text-sm text-gray-400 capitalize">{i}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Calendar, label: 'Duration', value: `${trip.duration} days`, color: 'text-blue-400' },
                { icon: Wallet, label: 'Budget', value: trip.budget ? `${trip.currency ?? '₹'}${trip.budget.toLocaleString()}` : 'Flexible', color: 'text-emerald-400' },
                { icon: Users, label: 'Party', value: trip.companionType ?? 'Solo', color: 'text-purple-400' },
                { icon: Hotel, label: 'Lodging', value: trip.lodging ?? 'Any', color: 'text-amber-400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-gray-900/60 rounded-2xl p-4 min-w-[120px]">
                  <Icon className={`w-4 h-4 ${color} mb-2`} />
                  <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                  <div className="font-semibold text-white capitalize text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insight Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <InsightCard
            icon={Cloud}
            title="Climate Summary"
            content={insights.climate}
            color="bg-blue-500 text-blue-400"
            accent="border-blue-500/20"
            delay={0.2}
          />
          <InsightCard
            icon={Activity}
            title="Activity Advisory"
            content={insights.activities}
            color="bg-green-500 text-green-400"
            accent="border-green-500/20"
            delay={0.25}
          />
          <InsightCard
            icon={Calendar}
            title="Duration-Based Packing"
            content={insights.duration}
            color="bg-purple-500 text-purple-400"
            accent="border-purple-500/20"
            delay={0.3}
          />
          <InsightCard
            icon={Wallet}
            title="Budget Guidance"
            content={insights.budget}
            color="bg-emerald-500 text-emerald-400"
            accent="border-emerald-500/20"
            delay={0.35}
          />
        </div>

        {/* Style + Mobility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          <div className="bg-gray-900/60 border border-cyan-500/20 rounded-3xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
              <Compass className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Travel Style</h3>
            <p className="text-gray-400 leading-relaxed">{insights.style}</p>
          </div>
          <div className="bg-gray-900/60 border border-indigo-500/20 rounded-3xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-5">
              <PlaneTakeoff className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Mobility Notes</h3>
            <p className="text-gray-400 leading-relaxed">{insights.mobility}</p>
          </div>
        </motion.div>

        {/* Smart Preparation Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-gray-900/60 border border-yellow-500/20 rounded-3xl p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Smart Preparation Notes</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.preparation.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                className="flex items-start gap-4 p-5 bg-gray-800/40 rounded-2xl border border-gray-700/40"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-400">{index + 1}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Smart Itinerary Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-gradient-to-br from-amber-500/10 to-gray-900/80 border border-amber-500/20 rounded-3xl p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <PlaneTakeoff className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Smart Itinerary Snapshot</h3>
              <p className="text-gray-400 text-sm">{smartPlan.headline}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
            <div className="space-y-3">
              {smartPlan.days.slice(0, 5).map((day, i) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="flex items-start gap-4 p-4 bg-gray-900/60 rounded-2xl border border-gray-800/60 hover:border-amber-500/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0">
                    D{day.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white">{day.title}</div>
                    <div className="text-sm text-gray-400 mt-0.5">{day.focus}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                    day.intensity === 'high' ? 'bg-red-500/10 text-red-400' :
                    day.intensity === 'balanced' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-green-500/10 text-green-400'
                  }`}>
                    {day.intensity}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900/60 rounded-2xl border border-gray-800/60 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Budget Split</div>
                <div className="space-y-4">
                  {smartPlan.budgetSplit.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="text-amber-300 font-semibold">
                          {trip.currency ?? '₹'} {item.estimate.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-800/60 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total Estimate</span>
                  <span className="text-white font-bold">{trip.currency ?? '₹'} {smartPlan.budgetTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-gray-900/60 rounded-2xl border border-gray-800/60 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Booking Checklist</div>
                <div className="space-y-2">
                  {smartPlan.bookingChecklist.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Intelligence Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Powered by SmartTrip AI Intelligence Engine</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
