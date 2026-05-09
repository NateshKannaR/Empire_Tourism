'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Users, Calendar, CheckCircle2, X, Phone, ArrowRight, Filter } from 'lucide-react';

const packages = [
  {
    id: 'munnar',
    name: 'Munnar Hill Escape',
    location: 'Munnar, Kerala',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    duration: '4 Days / 3 Nights',
    rating: 4.9,
    reviews: 312,
    tag: 'Best Seller',
    tagColor: 'from-amber-500 to-orange-500',
    category: 'Hill Station',
    description: 'Experience the lush green tea gardens, misty mountains, and cool climate of Munnar — Kerala\'s most beloved hill station.',
    highlights: ['Tea Garden Walk', 'Eravikulam National Park', 'Mattupetty Dam', 'Echo Point', 'Top Station View'],
    includes: ['AC Transport', '3-Star Hotel', 'Breakfast & Dinner', 'Local Guide', 'All Entry Tickets'],
    pricing: [
      { people: 2, price: 12999 },
      { people: 4, price: 10999 },
      { people: 6, price: 9499 },
      { people: 8, price: 8999 },
      { people: 10, price: 8499 },
    ],
  },
  {
    id: 'goa',
    name: 'Goa Beach Bliss',
    location: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    duration: '5 Days / 4 Nights',
    rating: 4.8,
    reviews: 489,
    tag: 'Popular',
    tagColor: 'from-blue-500 to-cyan-500',
    category: 'Beach',
    description: 'Sun, sand, and sea — Goa\'s vibrant beaches, Portuguese heritage, and nightlife make it India\'s ultimate beach destination.',
    highlights: ['Baga & Calangute Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Spice Plantation', 'Sunset Cruise'],
    includes: ['AC Transport', '4-Star Resort', 'Breakfast', 'Sightseeing Tours', 'Cruise Tickets'],
    pricing: [
      { people: 2, price: 17999 },
      { people: 4, price: 14999 },
      { people: 6, price: 12999 },
      { people: 8, price: 11999 },
      { people: 10, price: 10999 },
    ],
  },
  {
    id: 'ooty',
    name: 'Ooty Nilgiri Retreat',
    location: 'Ooty, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
    duration: '3 Days / 2 Nights',
    rating: 4.7,
    reviews: 201,
    tag: 'New',
    tagColor: 'from-green-500 to-emerald-500',
    category: 'Hill Station',
    description: 'The Queen of Hill Stations — Ooty\'s botanical gardens, toy train, and rolling Nilgiri hills offer a perfect escape from city life.',
    highlights: ['Botanical Garden', 'Nilgiri Toy Train', 'Doddabetta Peak', 'Ooty Lake', 'Rose Garden'],
    includes: ['AC Transport', '3-Star Hotel', 'Breakfast & Dinner', 'Toy Train Tickets', 'Local Guide'],
    pricing: [
      { people: 2, price: 9499 },
      { people: 4, price: 7999 },
      { people: 6, price: 6999 },
      { people: 8, price: 6499 },
      { people: 10, price: 5999 },
    ],
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    location: 'Alleppey, Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    duration: '4 Days / 3 Nights',
    rating: 4.9,
    reviews: 378,
    tag: 'Luxury',
    tagColor: 'from-purple-500 to-pink-500',
    category: 'Backwaters',
    description: 'Glide through Kerala\'s serene backwaters on a traditional houseboat, surrounded by coconut palms and village life.',
    highlights: ['Houseboat Stay', 'Alleppey Backwaters', 'Kumarakom Bird Sanctuary', 'Village Walk', 'Ayurvedic Spa'],
    includes: ['Houseboat (AC)', 'All Meals on Boat', 'AC Transport', 'Ayurvedic Session', 'Village Tour'],
    pricing: [
      { people: 2, price: 19999 },
      { people: 4, price: 16999 },
      { people: 6, price: 14999 },
      { people: 8, price: 13499 },
      { people: 10, price: 12499 },
    ],
  },
  {
    id: 'coorg',
    name: 'Coorg Coffee Trail',
    location: 'Coorg, Karnataka',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    duration: '3 Days / 2 Nights',
    rating: 4.8,
    reviews: 156,
    tag: 'Trending',
    tagColor: 'from-amber-600 to-yellow-500',
    category: 'Hill Station',
    description: 'Scotland of India — Coorg\'s misty coffee plantations, waterfalls, and wildlife make it a perfect weekend getaway.',
    highlights: ['Coffee Plantation Tour', 'Abbey Falls', 'Raja\'s Seat', 'Nagarhole Safari', 'Tibetan Monastery'],
    includes: ['AC Transport', 'Plantation Stay', 'Breakfast & Dinner', 'Coffee Tour', 'Safari Tickets'],
    pricing: [
      { people: 2, price: 10999 },
      { people: 4, price: 8999 },
      { people: 6, price: 7999 },
      { people: 8, price: 7499 },
      { people: 10, price: 6999 },
    ],
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan Royal Tour',
    location: 'Jaipur - Jodhpur - Udaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    reviews: 267,
    tag: 'Premium',
    tagColor: 'from-rose-500 to-pink-500',
    category: 'Heritage',
    description: 'A royal journey through the Land of Kings — majestic forts, vibrant bazaars, and golden deserts await you.',
    highlights: ['Amber Fort', 'Mehrangarh Fort', 'City Palace Udaipur', 'Camel Safari', 'Desert Camp'],
    includes: ['AC Transport', '4-Star Hotels', 'Breakfast & Dinner', 'All Entry Tickets', 'Camel Safari'],
    pricing: [
      { people: 2, price: 34999 },
      { people: 4, price: 28999 },
      { people: 6, price: 24999 },
      { people: 8, price: 22999 },
      { people: 10, price: 20999 },
    ],
  },
  {
    id: 'andaman',
    name: 'Andaman Island Escape',
    location: 'Port Blair, Andaman',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    duration: '6 Days / 5 Nights',
    rating: 4.8,
    reviews: 198,
    tag: 'Adventure',
    tagColor: 'from-teal-500 to-cyan-500',
    category: 'Beach',
    description: 'Crystal clear waters, pristine beaches, and vibrant coral reefs — the Andamans are India\'s tropical paradise.',
    highlights: ['Radhanagar Beach', 'Scuba Diving', 'Cellular Jail', 'Ross Island', 'Glass Bottom Boat'],
    includes: ['Flight Tickets', '3-Star Hotel', 'Breakfast', 'Ferry Transfers', 'Scuba Session'],
    pricing: [
      { people: 2, price: 39999 },
      { people: 4, price: 34999 },
      { people: 6, price: 29999 },
      { people: 8, price: 27999 },
      { people: 10, price: 25999 },
    ],
  },
  {
    id: 'varanasi',
    name: 'Varanasi Spiritual Journey',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361058-c24e01238a46?w=800&q=80',
    duration: '3 Days / 2 Nights',
    rating: 4.7,
    reviews: 143,
    tag: 'Spiritual',
    tagColor: 'from-orange-500 to-red-500',
    category: 'Spiritual',
    description: 'One of the world\'s oldest living cities — experience the Ganga Aarti, ancient ghats, and spiritual energy of Varanasi.',
    highlights: ['Ganga Aarti', 'Boat Ride at Sunrise', 'Kashi Vishwanath Temple', 'Sarnath', 'Old City Walk'],
    includes: ['AC Transport', '3-Star Hotel', 'Breakfast', 'Boat Ride', 'Local Guide'],
    pricing: [
      { people: 2, price: 11999 },
      { people: 4, price: 9499 },
      { people: 6, price: 8499 },
      { people: 8, price: 7999 },
      { people: 10, price: 7499 },
    ],
  },
];

const categories = ['All', 'Hill Station', 'Beach', 'Backwaters', 'Heritage', 'Spiritual', 'Adventure'];

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPkg, setSelectedPkg] = useState<typeof packages[0] | null>(null);
  const [selectedPeople, setSelectedPeople] = useState(2);

  const filtered = selectedCategory === 'All'
    ? packages
    : packages.filter(p => p.category === selectedCategory);

  const getPrice = (pkg: typeof packages[0], people: number) => {
    const tier = pkg.pricing.find(p => p.people === people) ?? pkg.pricing[pkg.pricing.length - 1];
    return tier.price;
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-gray-950" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
              <span className="text-sm text-amber-300">Curated by Manoj Kumar</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Packages</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Handcrafted tour packages for every budget and group size. Price per person — the more you travel together, the more you save!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20'
                  : 'bg-gray-800/60 text-gray-400 hover:text-gray-200 border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              id={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="bg-gray-900/60 border border-gray-800 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all group cursor-pointer"
              onClick={() => { setSelectedPkg(pkg); setSelectedPeople(2); }}
            >
              <div className="relative h-48 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pkg.tagColor}`}>
                  {pkg.tag}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-white text-xs font-semibold">{pkg.rating}</span>
                  <span className="text-gray-300 text-xs">({pkg.reviews})</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                  <MapPin className="w-3 h-3" /> {pkg.location}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">{pkg.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                  <Calendar className="w-3 h-3" /> {pkg.duration}
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="text-xs text-gray-500 mb-2">Price per person</div>
                  <div className="grid grid-cols-3 gap-1">
                    {pkg.pricing.slice(0, 3).map((tier) => (
                      <div key={tier.people} className="text-center bg-gray-800/60 rounded-lg p-2">
                        <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                          <Users className="w-3 h-3" />{tier.people}
                        </div>
                        <div className="text-xs font-bold text-amber-400">₹{(tier.price/1000).toFixed(1)}k</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-xl"
            onClick={() => setSelectedPkg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img src={selectedPkg.image} alt={selectedPkg.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <button
                  onClick={() => setSelectedPkg(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${selectedPkg.tagColor} mb-2`}>
                    {selectedPkg.tag}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedPkg.name}</h2>
                  <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                    <MapPin className="w-4 h-4" /> {selectedPkg.location}
                    <span>•</span>
                    <Calendar className="w-4 h-4" /> {selectedPkg.duration}
                    <span>•</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {selectedPkg.rating} ({selectedPkg.reviews})
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-400 leading-relaxed mb-8">{selectedPkg.description}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-amber-400">Highlights</h3>
                    <div className="space-y-2">
                      {selectedPkg.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-amber-400">Includes</h3>
                    <div className="space-y-2">
                      {selectedPkg.includes.map((inc) => (
                        <div key={inc} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {inc}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing by group size */}
                <div className="bg-gray-800/40 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-lg mb-4">Price by Group Size</h3>
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    {selectedPkg.pricing.map((tier) => (
                      <button
                        key={tier.people}
                        onClick={() => setSelectedPeople(tier.people)}
                        className={`rounded-xl p-3 text-center transition-all ${
                          selectedPeople === tier.people
                            ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1 text-xs mb-1">
                          <Users className="w-3 h-3" /> {tier.people}
                        </div>
                        <div className="font-bold text-sm">₹{tier.price.toLocaleString()}</div>
                        <div className="text-xs opacity-70">/person</div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <div>
                      <div className="text-gray-400 text-sm">Total for {selectedPeople} people</div>
                      <div className="text-3xl font-bold text-amber-400">
                        ₹{(getPrice(selectedPkg, selectedPeople) * selectedPeople).toLocaleString()}
                      </div>
                      <div className="text-gray-500 text-xs">₹{getPrice(selectedPkg, selectedPeople).toLocaleString()} per person</div>
                    </div>
                    <div className="text-right">
                      {selectedPeople >= 6 && (
                        <div className="text-green-400 text-sm font-semibold">🎉 Group Discount Applied!</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href="tel:+919999999999"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-5 h-5" /> Book Now
                  </a>
                  <a
                    href={`https://wa.me/919999999999?text=Hi Manoj sir, I'm interested in the ${selectedPkg.name} package for ${selectedPeople} people.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-green-600/20 border border-green-500/30 rounded-2xl text-green-400 font-bold text-lg hover:bg-green-600/30 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
