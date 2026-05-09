'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, X, Route, Clock, Navigation } from 'lucide-react';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false, loading: () => (
  <div className="flex-1 flex items-center justify-center bg-gray-950">
    <div className="w-10 h-10 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
  </div>
)});

export const destinations = [
  { id: 1, name: 'Eiffel Tower',    city: 'Paris',     country: 'France',    lat: 48.8584,  lng: 2.2945,   type: 'landmark', rating: 4.8, img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80' },
  { id: 2, name: 'Colosseum',       city: 'Rome',      country: 'Italy',     lat: 41.8902,  lng: 12.4922,  type: 'heritage', rating: 4.7, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80' },
  { id: 3, name: 'Sagrada Familia', city: 'Barcelona', country: 'Spain',     lat: 41.4036,  lng: 2.1744,   type: 'landmark', rating: 4.9, img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80' },
  { id: 4, name: 'Acropolis',       city: 'Athens',    country: 'Greece',    lat: 37.9715,  lng: 23.7267,  type: 'heritage', rating: 4.8, img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80' },
  { id: 5, name: 'Big Ben',         city: 'London',    country: 'UK',        lat: 51.5007,  lng: -0.1246,  type: 'landmark', rating: 4.6, img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80' },
  { id: 6, name: 'Santorini',       city: 'Santorini', country: 'Greece',    lat: 36.3932,  lng: 25.4615,  type: 'nature',   rating: 4.9, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80' },
  { id: 7, name: 'Amalfi Coast',    city: 'Amalfi',    country: 'Italy',     lat: 40.6340,  lng: 14.6027,  type: 'nature',   rating: 4.8, img: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80' },
  { id: 8, name: 'Alhambra',        city: 'Granada',   country: 'Spain',     lat: 37.1760,  lng: -3.5881,  type: 'heritage', rating: 4.9, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 9, name: 'Taj Mahal',       city: 'Agra',      country: 'India',     lat: 27.1751,  lng: 78.0421,  type: 'heritage', rating: 5.0, img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80' },
  { id: 10, name: 'Machu Picchu',   city: 'Cusco',     country: 'Peru',      lat: -13.1631, lng: -72.5450, type: 'heritage', rating: 4.9, img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80' },
  { id: 11, name: 'Bali',           city: 'Bali',      country: 'Indonesia', lat: -8.3405,  lng: 115.0920, type: 'nature',   rating: 4.7, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
  { id: 12, name: 'Kyoto',          city: 'Kyoto',     country: 'Japan',     lat: 35.0116,  lng: 135.7681, type: 'heritage', rating: 4.8, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80' },
];

export type Destination = typeof destinations[0];

const typeColors: Record<string, string> = {
  landmark: 'bg-violet-500',
  heritage: 'bg-amber-500',
  nature: 'bg-emerald-500',
};

export default function MapsPage() {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState<number[]>([]);

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRoute = (id: number) =>
    setRoute(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);

  return (
    <main className="h-screen pt-14 sm:pt-16 bg-[#030712] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl z-20 flex-shrink-0">
        <h1 className="text-xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent hidden sm:block">Maps</h1>
        <div className="flex items-center gap-2 flex-1 max-w-sm bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search destinations..."
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none"
          />
        </div>
        {route.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm">
            <Route className="w-4 h-4" />
            {route.length} stops
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Real Map */}
        <MapView
          destinations={filtered}
          selected={selected}
          route={route}
          onSelect={setSelected}
        />

        {/* Sidebar */}
        <div className="w-72 border-l border-white/[0.06] bg-[#030712]/90 backdrop-blur-xl overflow-y-auto flex-shrink-0 hidden md:block">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">Destination Details</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <img src={selected.img} alt={selected.name} className="w-full h-36 object-cover rounded-xl mb-4" />
                <h2 className="text-lg font-black mb-1">{selected.name}</h2>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {selected.city}, {selected.country}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-sm">{selected.rating}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${typeColors[selected.type]}`}>{selected.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] text-center">
                    <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Best time</div>
                    <div className="text-xs font-semibold">Apr – Oct</div>
                  </div>
                  <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] text-center">
                    <Navigation className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Coords</div>
                    <div className="text-xs font-semibold">{selected.lat.toFixed(2)}, {selected.lng.toFixed(2)}</div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleRoute(selected.id)}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    route.includes(selected.id)
                      ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  }`}
                >
                  {route.includes(selected.id) ? '✓ In Route' : '+ Add to Route'}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5"
              >
                <h3 className="font-bold mb-4 text-xs text-gray-400 uppercase tracking-wider">
                  Destinations ({filtered.length})
                </h3>
                <div className="space-y-1">
                  {filtered.map((dest, i) => (
                    <motion.button
                      key={dest.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelected(dest)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors text-left group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${typeColors[dest.type]} flex items-center justify-center flex-shrink-0`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm group-hover:text-white transition-colors truncate">{dest.name}</div>
                        <div className="text-xs text-gray-500">{dest.city}, {dest.country}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400 flex-shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" /> {dest.rating}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
