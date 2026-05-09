'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Star, Heart, Globe, Mountain, Waves, Building2, TreePine, Compass } from 'lucide-react';

const categories = [
  { id: 'all',       label: 'All',        icon: Globe },
  { id: 'beach',     label: 'Beach',      icon: Waves },
  { id: 'mountain',  label: 'Mountain',   icon: Mountain },
  { id: 'city',      label: 'City',       icon: Building2 },
  { id: 'nature',    label: 'Nature',     icon: TreePine },
  { id: 'adventure', label: 'Adventure',  icon: Compass },
];

const destinations = [
  { id: 1, name: 'Santorini',    country: 'Greece',      category: 'beach',     rating: 4.9, reviews: 2341, price: 1200, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',   tags: ['Romantic', 'Scenic'] },
  { id: 2, name: 'Kyoto',        country: 'Japan',       category: 'city',      rating: 4.8, reviews: 3102, price: 900,  img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',   tags: ['Culture', 'History'] },
  { id: 3, name: 'Bali',         country: 'Indonesia',   category: 'beach',     rating: 4.7, reviews: 4521, price: 700,  img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',   tags: ['Spiritual', 'Tropical'] },
  { id: 4, name: 'Patagonia',    country: 'Argentina',   category: 'adventure', rating: 4.9, reviews: 1203, price: 1800, img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',   tags: ['Hiking', 'Wild'] },
  { id: 5, name: 'Machu Picchu', country: 'Peru',        category: 'mountain',  rating: 4.9, reviews: 5621, price: 1100, img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',   tags: ['Ancient', 'Trek'] },
  { id: 6, name: 'Amalfi Coast', country: 'Italy',       category: 'beach',     rating: 4.8, reviews: 2890, price: 1400, img: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80',   tags: ['Scenic', 'Food'] },
  { id: 7, name: 'Banff',        country: 'Canada',      category: 'nature',    rating: 4.9, reviews: 1876, price: 950,  img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',   tags: ['Lakes', 'Wildlife'] },
  { id: 8, name: 'Tokyo',        country: 'Japan',       category: 'city',      rating: 4.8, reviews: 6234, price: 1000, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',   tags: ['Modern', 'Food'] },
  { id: 9, name: 'Maldives',     country: 'Maldives',    category: 'beach',     rating: 5.0, reviews: 1543, price: 2500, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',   tags: ['Luxury', 'Overwater'] },
  { id: 10, name: 'Dolomites',   country: 'Italy',       category: 'mountain',  rating: 4.9, reviews: 987,  price: 1300, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',   tags: ['Skiing', 'Hiking'] },
  { id: 11, name: 'New York',    country: 'USA',         category: 'city',      rating: 4.7, reviews: 8901, price: 1600, img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',   tags: ['Urban', 'Culture'] },
  { id: 12, name: 'Amazon',      country: 'Brazil',      category: 'nature',    rating: 4.8, reviews: 654,  price: 1500, img: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&q=80',   tags: ['Jungle', 'Wildlife'] },
];

export default function DiscoverPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [liked, setLiked] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');
  const [maxPrice, setMaxPrice] = useState(3000);

  const filtered = destinations
    .filter(d => {
      const matchCat = activeCategory === 'all' || d.category === activeCategory;
      const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ && d.price <= maxPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      return b.price - a.price;
    });

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      {/* Header */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-4"
          >
            Discover <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Destinations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-8"
          >
            Explore 10,000+ destinations across 180 countries
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 p-2 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl max-w-xl mx-auto"
          >
            <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search destinations, countries..."
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
            />
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold flex items-center gap-1">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </motion.div>
        </div>
      </div>

      {/* Categories + Sort */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeCategory === id
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white hover:border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort:</span>
              {([['rating', 'Top Rated'], ['price-asc', 'Price ↑'], ['price-desc', 'Price ↓']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSortBy(val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    sortBy === val ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs text-gray-500">Max price: <span className="text-white font-semibold">${maxPrice.toLocaleString()}</span></span>
              <input
                type="range" min={500} max={3000} step={100}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-violet-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-gray-500 mb-6">{filtered.length} destinations found</div>
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.03] hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={() => setLiked(prev => prev.includes(dest.id) ? prev.filter(id => id !== dest.id) : [...prev, dest.id])}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${liked.includes(dest.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {dest.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-xs text-gray-200 border border-white/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-bold text-base group-hover:text-violet-300 transition-colors">{dest.name}</h3>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                          <MapPin className="w-3 h-3" /> {dest.country}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-violet-400 font-bold text-sm">from ${dest.price}</div>
                        <div className="text-gray-500 text-xs">per person</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-white">{dest.rating}</span>
                      <span className="text-gray-500 text-xs">({dest.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
