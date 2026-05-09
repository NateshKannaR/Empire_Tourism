'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Package, Search, Calendar, Users, ArrowRight, ArrowLeftRight, Star, MapPin, Wifi, Coffee, Car } from 'lucide-react';

const tabs = [
  { id: 'flights',  label: 'Flights',  icon: Plane },
  { id: 'hotels',   label: 'Hotels',   icon: Hotel },
  { id: 'packages', label: 'Packages', icon: Package },
];

const flights = [
  { id: 1, from: 'New York', to: 'Paris',    airline: 'Air France',   duration: '7h 20m', stops: 'Direct', price: 420, departure: '08:30', arrival: '21:50', logo: '🇫🇷' },
  { id: 2, from: 'New York', to: 'Paris',    airline: 'Delta',        duration: '8h 05m', stops: '1 stop', price: 310, departure: '11:15', arrival: '01:20', logo: '✈️' },
  { id: 3, from: 'New York', to: 'Paris',    airline: 'British Airways', duration: '9h 30m', stops: '1 stop', price: 285, departure: '14:00', arrival: '05:30', logo: '🇬🇧' },
  { id: 4, from: 'New York', to: 'Paris',    airline: 'Lufthansa',    duration: '10h 15m', stops: '1 stop', price: 265, departure: '17:45', arrival: '10:00', logo: '🇩🇪' },
];

const hotels = [
  { id: 1, name: 'Le Grand Hotel Paris',  location: 'Paris, France',    rating: 4.9, reviews: 2341, price: 320, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', amenities: ['Wifi', 'Pool', 'Spa'] },
  { id: 2, name: 'Santorini Suites',      location: 'Santorini, Greece', rating: 4.8, reviews: 1876, price: 450, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', amenities: ['Wifi', 'Pool', 'View'] },
  { id: 3, name: 'Tokyo Skyline Hotel',   location: 'Tokyo, Japan',      rating: 4.7, reviews: 3102, price: 180, img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', amenities: ['Wifi', 'Gym', 'Bar'] },
  { id: 4, name: 'Bali Jungle Resort',    location: 'Ubud, Bali',        rating: 4.9, reviews: 987,  price: 220, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', amenities: ['Pool', 'Spa', 'Yoga'] },
];

const packages = [
  { id: 1, name: 'Greek Island Hopper',  duration: '10 days', destinations: ['Athens', 'Santorini', 'Mykonos'], price: 2800, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', includes: ['Flights', 'Hotels', 'Tours'], rating: 4.9 },
  { id: 2, name: 'Japan Explorer',       duration: '14 days', destinations: ['Tokyo', 'Kyoto', 'Osaka'],        price: 3200, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', includes: ['Flights', 'Hotels', 'Rail Pass'], rating: 4.8 },
  { id: 3, name: 'Bali Escape',          duration: '7 days',  destinations: ['Seminyak', 'Ubud', 'Nusa Dua'],  price: 1600, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', includes: ['Flights', 'Villa', 'Transfers'], rating: 4.7 },
];

const amenityIcons: Record<string, any> = { Wifi, Pool: Coffee, Spa: Star, View: MapPin, Gym: Users, Bar: Coffee, Yoga: Star, Transfers: Car };

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState('flights');
  const [from, setFrom] = useState('New York');
  const [to, setTo] = useState('Paris');

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      {/* Header */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-4">
            Book Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Trip</span>
          </motion.h1>
          <p className="text-gray-400 text-lg">Flights, hotels, and packages — all in one place</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] w-fit mx-auto">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-24 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Flights */}
          {activeTab === 'flights' && (
            <motion.div key="flights" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Search form */}
              <div className="glass rounded-2xl p-6 mb-8 border border-white/[0.06]">
                <div className="grid md:grid-cols-[1fr_auto_1fr_1fr_1fr] gap-4 items-end">
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">From</label>
                    <input value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
                  </div>
                  <button className="mb-0.5 p-3 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 transition-colors">
                    <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">To</label>
                    <input value={to} onChange={e => setTo(e.target.value)} className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</label>
                    <input type="date" className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-gray-300" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
                    <Search className="w-4 h-4" /> Search
                  </motion.button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                {flights.map((f, i) => (
                  <motion.div key={f.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-blue-500/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{f.logo}</div>
                        <div>
                          <div className="font-semibold text-sm text-gray-300">{f.airline}</div>
                          <div className="text-xs text-gray-500">{f.stops}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="font-bold text-lg">{f.departure}</div>
                          <div className="text-xs text-gray-400">{f.from}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1">{f.duration}</div>
                          <div className="w-24 h-px bg-gradient-to-r from-blue-500/50 to-cyan-500/50 relative">
                            <Plane className="w-3 h-3 text-blue-400 absolute -top-1.5 right-0" />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{f.arrival}</div>
                          <div className="text-xs text-gray-400">{f.to}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-blue-400">${f.price}</div>
                        <div className="text-xs text-gray-500 mb-2">per person</div>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold"
                        >
                          Select
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hotels */}
          {activeTab === 'hotels' && (
            <motion.div key="hotels" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="glass rounded-2xl p-6 mb-8 border border-white/[0.06]">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-400 mb-2 block">Destination</label>
                    <input placeholder="City or hotel name" className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-2 block">Check-in</label>
                    <input type="date" className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none text-gray-300" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 mt-6">
                    <Search className="w-4 h-4" /> Search Hotels
                  </motion.button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {hotels.map((h, i) => (
                  <motion.div key={h.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-blue-500/20 transition-all group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={h.img} alt={h.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-sm">{h.rating}</span>
                        <span className="text-gray-300 text-xs">({h.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors">{h.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                        <MapPin className="w-3.5 h-3.5" /> {h.location}
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {h.amenities.map(a => (
                          <span key={a} className="px-2 py-1 rounded-lg bg-white/[0.06] text-xs text-gray-300 border border-white/[0.06]">{a}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-black text-blue-400">${h.price}</span>
                          <span className="text-gray-500 text-sm"> /night</span>
                        </div>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold"
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Packages */}
          {activeTab === 'packages' && (
            <motion.div key="packages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              {packages.map((pkg, i) => (
                <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-blue-500/20 transition-all group"
                >
                  <div className="md:flex">
                    <div className="relative md:w-72 h-48 md:h-auto overflow-hidden flex-shrink-0">
                      <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-xl mb-1 group-hover:text-blue-300 transition-colors">{pkg.name}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-3.5 h-3.5" /> {pkg.duration}
                            <span className="text-gray-600">·</span>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-white font-medium">{pkg.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-blue-400">${pkg.price.toLocaleString()}</div>
                          <div className="text-gray-500 text-xs">per person</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.destinations.map(d => (
                          <span key={d} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                            <MapPin className="w-3 h-3" /> {d}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {pkg.includes.map(inc => (
                            <span key={inc} className="px-2 py-1 rounded-lg bg-white/[0.06] text-xs text-gray-300">✓ {inc}</span>
                          ))}
                        </div>
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2"
                        >
                          View Package <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
