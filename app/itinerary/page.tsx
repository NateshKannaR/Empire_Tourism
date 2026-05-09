'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Plus, Trash2, GripVertical, MapPin, Clock, Camera, Utensils, Hotel, Plane, Car, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

type ActivityType = 'sightseeing' | 'food' | 'hotel' | 'transport' | 'photo';

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  type: ActivityType;
  notes: string;
  duration: string;
}

interface Day {
  id: string;
  date: string;
  label: string;
  activities: Activity[];
}

const typeConfig: Record<ActivityType, { icon: any; color: string; bg: string }> = {
  sightseeing: { icon: MapPin,    color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  food:        { icon: Utensils,  color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  hotel:       { icon: Hotel,     color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  transport:   { icon: Car,       color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/20' },
  photo:       { icon: Camera,    color: 'text-pink-400',   bg: 'bg-pink-500/10 border-pink-500/20' },
};

const initialDays: Day[] = [
  {
    id: 'd1', date: '2025-06-01', label: 'Day 1 — Arrival',
    activities: [
      { id: 'a1', time: '14:00', title: 'Arrive at Charles de Gaulle', location: 'Paris, France', type: 'transport', notes: 'Flight AF123', duration: '1h' },
      { id: 'a2', time: '16:30', title: 'Check-in Le Grand Hotel', location: '2 Rue Scribe, Paris', type: 'hotel', notes: 'Room 412', duration: '30m' },
      { id: 'a3', time: '19:00', title: 'Dinner at Café de Flore', location: 'Saint-Germain-des-Prés', type: 'food', notes: 'Reservation confirmed', duration: '2h' },
    ]
  },
  {
    id: 'd2', date: '2025-06-02', label: 'Day 2 — Eiffel & Louvre',
    activities: [
      { id: 'a4', time: '09:00', title: 'Eiffel Tower Visit', location: 'Champ de Mars, Paris', type: 'sightseeing', notes: 'Book tickets in advance', duration: '2h' },
      { id: 'a5', time: '12:00', title: 'Lunch at Le Jules Verne', location: 'Eiffel Tower, 2nd floor', type: 'food', notes: '', duration: '1.5h' },
      { id: 'a6', time: '14:30', title: 'Louvre Museum', location: 'Rue de Rivoli, Paris', type: 'sightseeing', notes: 'Focus on Mona Lisa wing', duration: '3h' },
      { id: 'a7', time: '18:00', title: 'Golden Hour Photos', location: 'Pont des Arts', type: 'photo', notes: '', duration: '1h' },
    ]
  },
];

const aiSuggestions = [
  { title: 'Montmartre Walk', type: 'sightseeing' as ActivityType, time: '10:00', duration: '2h', location: 'Montmartre, Paris' },
  { title: 'Seine River Cruise', type: 'sightseeing' as ActivityType, time: '15:00', duration: '1.5h', location: 'Port de la Bourdonnais' },
  { title: 'Versailles Day Trip', type: 'transport' as ActivityType, time: '09:00', duration: '6h', location: 'Versailles' },
];

export default function ItineraryPage() {
  const [days, setDays] = useState<Day[]>(initialDays);
  const [expandedDay, setExpandedDay] = useState<string>('d1');
  const [showAI, setShowAI] = useState(false);
  const [tripName, setTripName] = useState('Paris Adventure 2025');

  const addActivity = (dayId: string) => {
    setDays(prev => prev.map(d => d.id === dayId ? {
      ...d,
      activities: [...d.activities, {
        id: `a${Date.now()}`, time: '12:00', title: 'New Activity',
        location: '', type: 'sightseeing', notes: '', duration: '1h'
      }]
    } : d));
  };

  const removeActivity = (dayId: string, actId: string) => {
    setDays(prev => prev.map(d => d.id === dayId ? { ...d, activities: d.activities.filter(a => a.id !== actId) } : d));
  };

  const addDay = () => {
    const n = days.length + 1;
    setDays(prev => [...prev, { id: `d${Date.now()}`, date: '', label: `Day ${n}`, activities: [] }]);
  };

  const addSuggestion = (dayId: string, s: typeof aiSuggestions[0]) => {
    setDays(prev => prev.map(d => d.id === dayId ? {
      ...d,
      activities: [...d.activities, { id: `a${Date.now()}`, ...s, notes: 'AI suggested' }]
    } : d));
  };

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-2">
            <h1 className="text-5xl font-black">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Itinerary</span> Builder
            </h1>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowAI(!showAI)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" /> AI Suggestions
            </motion.button>
          </motion.div>
          <input
            value={tripName}
            onChange={e => setTripName(e.target.value)}
            className="text-xl text-gray-400 bg-transparent border-b border-white/10 focus:outline-none focus:border-emerald-500/50 pb-1 w-full max-w-sm transition-colors"
          />
        </div>
      </div>

      <div className="px-6 pb-24 max-w-4xl mx-auto">
        {/* AI Suggestions Panel */}
        <AnimatePresence>
          {showAI && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <h3 className="font-bold text-violet-300">AI Suggested Activities for Paris</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {aiSuggestions.map((s, i) => {
                  const cfg = typeConfig[s.type];
                  return (
                    <div key={i} className={`rounded-xl p-4 border ${cfg.bg}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                        <span className="font-semibold text-sm">{s.title}</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-3">{s.location} · {s.time} · {s.duration}</div>
                      <button
                        onClick={() => addSuggestion('d1', s)}
                        className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add to Day 1
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Days */}
        <div className="space-y-4">
          {days.map((day) => (
            <motion.div
              key={day.id}
              layout
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              {/* Day header */}
              <button
                onClick={() => setExpandedDay(expandedDay === day.id ? '' : day.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-sm font-bold">
                    {days.indexOf(day) + 1}
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{day.label}</div>
                    <div className="text-xs text-gray-500">{day.activities.length} activities</div>
                  </div>
                </div>
                {expandedDay === day.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {/* Activities */}
              <AnimatePresence>
                {expandedDay === day.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3">
                      {day.activities.map((act) => {
                        const cfg = typeConfig[act.type];
                        return (
                          <motion.div
                            key={act.id}
                            layout
                            className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} group`}
                          >
                            <GripVertical className="w-4 h-4 text-gray-600 mt-1 cursor-grab flex-shrink-0" />
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                              <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{act.time}</span>
                                <span className="text-xs text-gray-600">·</span>
                                <span className="text-xs text-gray-500">{act.duration}</span>
                              </div>
                              <div className="font-semibold text-sm">{act.title}</div>
                              {act.location && <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{act.location}</div>}
                              {act.notes && <div className="text-xs text-gray-500 mt-1 italic">{act.notes}</div>}
                            </div>
                            <button
                              onClick={() => removeActivity(day.id, act.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </motion.div>
                        );
                      })}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addActivity(day.id)}
                        className="w-full py-3 rounded-xl border border-dashed border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20 transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Activity
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addDay}
            className="w-full py-4 rounded-2xl border border-dashed border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Day
          </motion.button>
        </div>
      </div>
    </main>
  );
}
