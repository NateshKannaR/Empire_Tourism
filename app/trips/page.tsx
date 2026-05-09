'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  MapPin, Calendar, Cloud, Activity, Package, ChevronRight,
  Trash2, Plus, Users, Wallet, Compass, PlaneTakeoff, Clock
} from 'lucide-react';
import { store } from '@/lib/store';
import { TripData } from '@/lib/types';
import AdaptiveBackground from '@/components/AdaptiveBackground';

const destinationImages: Record<string, string> = {
  munnar: 'https://images.unsplash.com/photo-1580889240911-ced85d8b3b3e?w=600&q=80',
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
  ooty: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&q=80',
  kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
  rajasthan: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80',
  andaman: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  varanasi: 'https://images.unsplash.com/photo-1561361058-c24e01238a46?w=600&q=80',
  coorg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
};

const getDestinationImage = (destination: string) => {
  const key = destination.toLowerCase();
  for (const [k, v] of Object.entries(destinationImages)) {
    if (key.includes(k)) return v;
  }
  return destinationImages.default;
};

const weatherIcons: Record<string, string> = { sunny: '☀️', rainy: '🌧️', cold: '❄️', hot: '🔥' };
const activityIcons: Record<string, string> = { beach: '🏖️', trekking: '🥾', business: '💼', urban: '🏙️', adventure: '🧗' };
const companionIcons: Record<string, string> = { solo: '🧍', couple: '👫', family: '👨‍👩‍👧', group: '👥' };

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<TripData[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTrips(store.getTrips());
      forceUpdate({});
    });
    setTrips(store.getTrips());
    return unsubscribe;
  }, []);

  const handleDelete = (e: React.MouseEvent, tripId: string) => {
    e.stopPropagation();
    setDeletingId(tripId);
    setTimeout(() => {
      setTrips(prev => prev.filter(t => t.id !== tripId));
      setDeletingId(null);
    }, 400);
  };

  const viewTripDetails = (tripId: string) => {
    const tripIndex = trips.findIndex(t => t.id === tripId);
    if (tripIndex > 0) {
      const selectedTrip = trips[tripIndex];
      const newTrips = [selectedTrip, ...trips.filter(t => t.id !== tripId)];
      newTrips.forEach(trip => {
        const list = store.getPackingList(trip.id);
        if (list) store.setPackingList(list);
      });
    }
    router.push('/dashboard');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });

  if (trips.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 relative">
        <AdaptiveBackground weather="sunny" activities={[]} duration={7} />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center mx-auto mb-8"
            >
              <Package className="w-12 h-12 text-amber-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-3">No Trips Yet</h2>
            <p className="text-gray-400 text-lg mb-10">Start planning your first adventure to see it here</p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/planner')}
              className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-amber-500/20 flex items-center gap-3 mx-auto"
            >
              <Plus className="w-5 h-5" /> Plan Your First Trip
            </motion.button>
          </motion.div>
        </div>
      </main>
    );
  }

  const latestTrip = trips[0];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      <AdaptiveBackground weather={latestTrip.weather} activities={latestTrip.activities} duration={latestTrip.duration} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">Travel History</div>
            <h1 className="text-5xl font-bold text-white mb-2">My Trips</h1>
            <p className="text-gray-400">{trips.length} trip{trips.length !== 1 ? 's' : ''} planned</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/planner')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-semibold shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" /> New Trip
          </motion.button>
        </motion.div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {trips.map((trip, index) => {
              const packingList = store.getPackingList(trip.id);
              const totalItems = packingList?.items.length || 0;
              const packedItems = packingList?.items.filter(item => item.packed).length || 0;
              const progress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;
              const imgSrc = getDestinationImage(trip.destination);

              return (
                <motion.div
                  key={trip.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: deletingId === trip.id ? 0 : 1, y: 0, scale: deletingId === trip.id ? 0.9 : 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="group relative bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all cursor-pointer"
                  onClick={() => viewTripDetails(trip.id)}
                >
                  {/* Destination Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                    {/* Weather badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700/50">
                      <span className="text-sm">{weatherIcons[trip.weather]}</span>
                      <span className="text-xs text-gray-300 capitalize">{trip.weather}</span>
                    </div>

                    {/* Delete button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleDelete(e, trip.id)}
                      className="absolute top-4 right-4 w-9 h-9 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>

                    {/* Destination name overlay */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {trip.destination}
                      </h3>
                      <div className="text-gray-400 text-sm mt-0.5">
                        {formatDate(trip.startDate ?? trip.date)}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="bg-gray-800/60 rounded-xl p-3 text-center">
                        <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-white">{trip.duration}d</div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                      <div className="bg-gray-800/60 rounded-xl p-3 text-center">
                        <span className="text-lg block mb-1">{companionIcons[trip.companionType ?? 'solo']}</span>
                        <div className="text-sm font-semibold text-white capitalize">{trip.companionType ?? 'Solo'}</div>
                        <div className="text-xs text-gray-500">Party</div>
                      </div>
                      <div className="bg-gray-800/60 rounded-xl p-3 text-center">
                        <Wallet className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-white">
                          {trip.budget ? `${trip.currency ?? '₹'}${(trip.budget / 1000).toFixed(0)}k` : 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500">Budget</div>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {trip.activities.map(activity => (
                        <span key={activity} className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-300">
                          {activityIcons[activity]} {activity}
                        </span>
                      ))}
                      {trip.travelStyle && (
                        <span className="px-3 py-1 bg-gray-800/60 rounded-full text-xs text-gray-400 capitalize">
                          {trip.travelStyle}
                        </span>
                      )}
                    </div>

                    {/* Packing Progress */}
                    {totalItems > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400 flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5" /> Packing Progress
                          </span>
                          <span className="font-semibold text-amber-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1.5">{packedItems} of {totalItems} items packed</div>
                      </div>
                    )}

                    {/* View CTA */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-800/60">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {trip.transport && (
                          <span className="flex items-center gap-1">
                            <PlaneTakeoff className="w-3 h-3" /> {trip.transport}
                          </span>
                        )}
                        {trip.lodging && (
                          <span className="flex items-center gap-1">
                            <Compass className="w-3 h-3" /> {trip.lodging}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                        View Details <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
