'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Navigation, ZoomIn, ZoomOut, Layers, Star, X, Route, Clock, Compass } from 'lucide-react';

const destinations = [
  { id: 1, name: 'Eiffel Tower',    city: 'Paris',     country: 'France',    lat: 48.8584, lng: 2.2945,  type: 'landmark', rating: 4.8, img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80', x: 52, y: 28 },
  { id: 2, name: 'Colosseum',       city: 'Rome',      country: 'Italy',     lat: 41.8902, lng: 12.4922, type: 'heritage', rating: 4.7, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80', x: 56, y: 35 },
  { id: 3, name: 'Sagrada Familia', city: 'Barcelona', country: 'Spain',     lat: 41.4036, lng: 2.1744,  type: 'landmark', rating: 4.9, img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&q=80', x: 48, y: 34 },
  { id: 4, name: 'Acropolis',       city: 'Athens',    country: 'Greece',    lat: 37.9715, lng: 23.7267, type: 'heritage', rating: 4.8, img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80', x: 60, y: 38 },
  { id: 5, name: 'Big Ben',         city: 'London',    country: 'UK',        lat: 51.5007, lng: -0.1246, type: 'landmark', rating: 4.6, img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80', x: 49, y: 24 },
  { id: 6, name: 'Santorini',       city: 'Santorini', country: 'Greece',    lat: 36.3932, lng: 25.4615, type: 'nature',   rating: 4.9, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', x: 61, y: 40 },
  { id: 7, name: 'Amalfi Coast',    city: 'Amalfi',    country: 'Italy',     lat: 40.6340, lng: 14.6027, type: 'nature',   rating: 4.8, img: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80', x: 55, y: 37 },
  { id: 8, name: 'Alhambra',        city: 'Granada',   country: 'Spain',     lat: 37.1760, lng: -3.5881, type: 'heritage', rating: 4.9, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', x: 47, y: 38 },
];

const typeColors: Record<string, string> = {
  landmark: 'bg-violet-500',
  heritage: 'bg-amber-500',
  nature: 'bg-emerald-500',
  food: 'bg-orange-500',
};

const layers = ['Standard', 'Satellite', 'Terrain', 'Transit'];

export default function MapsPage() {
  const [selected, setSelected] = useState<typeof destinations[0] | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activeLayer, setActiveLayer] = useState('Standard');
  const [showLayers, setShowLayers] = useState(false);
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState<number[]>([]);

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRoute = (id: number) => {
    setRoute(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  return (
    <main className="h-screen pt-16 bg-[#030712] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl z-20">
        <h1 className="text-xl font-black">
          <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Maps</span>
        </h1>
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
            {route.length} stops in route
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Map area */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Terrain blobs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-64 bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-48 bg-emerald-900/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl" />

          {/* Route lines */}
          {route.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {route.slice(0, -1).map((id, i) => {
                const from = destinations.find(d => d.id === id);
                const to = destinations.find(d => d.id === route[i + 1]);
                if (!from || !to) return null;
                return (
                  <motion.line
                    key={`${id}-${route[i + 1]}`}
                    x1={`${from.x}%`} y1={`${from.y}%`}
                    x2={`${to.x}%`} y2={`${to.y}%`}
                    stroke="rgba(236, 72, 153, 0.5)"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                );
              })}
            </svg>
          )}

          {/* Destination markers */}
          {filtered.map((dest) => (
            <motion.button
              key={dest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(selected?.id === dest.id ? null : dest)}
            >
              {/* Pulse ring */}
              {selected?.id === dest.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-pink-400/50"
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Route number badge */}
              {route.includes(dest.id) && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold z-10">
                  {route.indexOf(dest.id) + 1}
                </div>
              )}

              <div className={`w-10 h-10 rounded-full ${typeColors[dest.type]} flex items-center justify-center shadow-lg ${selected?.id === dest.id ? 'ring-2 ring-white/50' : ''}`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 text-xs">
                  <div className="font-semibold">{dest.name}</div>
                  <div className="text-gray-400">{dest.city}, {dest.country}</div>
                </div>
              </div>
            </motion.button>
          ))}

          {/* Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="glass rounded-xl p-3 border border-white/[0.06]">
              <ZoomIn className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="glass rounded-xl p-3 border border-white/[0.06]">
              <ZoomOut className="w-4 h-4" />
            </motion.button>
            <div className="relative">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowLayers(!showLayers)} className="glass rounded-xl p-3 border border-white/[0.06]">
                <Layers className="w-4 h-4" />
              </motion.button>
              <AnimatePresence>
                {showLayers && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 10 }}
                    className="absolute right-full mr-2 top-0 glass rounded-xl p-2 border border-white/[0.06] w-32"
                  >
                    {layers.map(l => (
                      <button key={l} onClick={() => { setActiveLayer(l); setShowLayers(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${activeLayer === l ? 'bg-pink-500/20 text-pink-300' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="glass rounded-xl p-3 border border-white/[0.06]">
              <Compass className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Layer badge */}
          <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-1.5 border border-white/[0.06] text-xs text-gray-400">
            {activeLayer} · Zoom {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl overflow-y-auto flex-shrink-0">
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
                  <h3 className="font-bold">Destination Details</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <img src={selected.img} alt={selected.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                <h2 className="text-xl font-black mb-1">{selected.name}</h2>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {selected.city}, {selected.country}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{selected.rating}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${typeColors[selected.type]} bg-opacity-20 text-white`}>{selected.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="glass rounded-xl p-3 border border-white/[0.06] text-center">
                    <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Best time</div>
                    <div className="text-sm font-semibold">Apr – Oct</div>
                  </div>
                  <div className="glass rounded-xl p-3 border border-white/[0.06] text-center">
                    <Navigation className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Distance</div>
                    <div className="text-sm font-semibold">2.4 km</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleRoute(selected.id)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      route.includes(selected.id)
                        ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    }`}
                  >
                    {route.includes(selected.id) ? '✓ In Route' : '+ Add to Route'}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-sm text-gray-400 hover:text-white transition-colors">
                    <Navigation className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5"
              >
                <h3 className="font-bold mb-4 text-sm text-gray-400 uppercase tracking-wider">Destinations ({filtered.length})</h3>
                <div className="space-y-2">
                  {filtered.map((dest, i) => (
                    <motion.button
                      key={dest.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
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
