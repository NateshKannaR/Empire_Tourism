'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, MapPin, Globe, MessageCircle, UserPlus, Check, TrendingUp, Award, Camera, Star } from 'lucide-react';

const travelers = [
  { id: 1, name: 'Sofia Reyes',    handle: '@sofia_travels',    bio: 'Solo traveler · 47 countries · Photographer', location: 'Barcelona, Spain',  followers: 12400, following: 890,  trips: 47, posts: 234, verified: true,  following_me: false, avatar: 'SR', badge: 'Explorer', countries: ['🇬🇷', '🇯🇵', '🇮🇩', '🇵🇪', '🇮🇹'] },
  { id: 2, name: 'Kenji Tanaka',   handle: '@kenji_explores',   bio: 'Adventure seeker · Food lover · Tokyo based',  location: 'Tokyo, Japan',       followers: 8900,  following: 1200, trips: 32, posts: 187, verified: false, following_me: true,  avatar: 'KT', badge: 'Foodie',   countries: ['🇫🇷', '🇮🇹', '🇹🇭', '🇻🇳', '🇰🇷'] },
  { id: 3, name: 'Amara Osei',     handle: '@amara_wanders',    bio: 'Nature & wildlife · Sustainable travel',       location: 'Accra, Ghana',       followers: 21200, following: 543,  trips: 61, posts: 412, verified: true,  following_me: false, avatar: 'AO', badge: 'Eco',      countries: ['🇰🇪', '🇹🇿', '🇿🇦', '🇲🇦', '🇪🇹'] },
  { id: 4, name: 'Lucas Müller',   handle: '@lucas_ontheroad',  bio: 'Backpacker · Budget travel tips · Writer',     location: 'Berlin, Germany',    followers: 5600,  following: 2100, trips: 28, posts: 156, verified: false, following_me: false, avatar: 'LM', badge: 'Budget',   countries: ['🇦🇷', '🇨🇱', '🇧🇷', '🇨🇴', '🇵🇪'] },
  { id: 5, name: 'Priya Sharma',   handle: '@priya_passport',   bio: 'Luxury travel · Hotel reviews · Foodie',      location: 'Mumbai, India',      followers: 34500, following: 320,  trips: 89, posts: 678, verified: true,  following_me: true,  avatar: 'PS', badge: 'Luxury',   countries: ['🇦🇪', '🇫🇷', '🇮🇹', '🇬🇧', '🇺🇸'] },
  { id: 6, name: 'Marco Rossi',    handle: '@marco_adventures', bio: 'Mountain climber · Extreme sports · Italy',   location: 'Milan, Italy',       followers: 9800,  following: 760,  trips: 53, posts: 298, verified: false, following_me: false, avatar: 'MR', badge: 'Extreme',  countries: ['🇳🇵', '🇵🇪', '🇨🇭', '🇦🇹', '🇳🇿'] },
];

const badges: Record<string, { color: string; icon: any }> = {
  Explorer: { color: 'text-violet-400 bg-violet-500/10 border-violet-500/20', icon: Globe },
  Foodie:   { color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', icon: Star },
  Eco:      { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: Globe },
  Budget:   { color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', icon: TrendingUp },
  Luxury:   { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Award },
  Extreme:  { color: 'text-red-400 bg-red-500/10 border-red-500/20', icon: TrendingUp },
};

const groups = [
  { id: 1, name: 'Solo Travelers Network',  members: 12400, img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80', category: 'Community' },
  { id: 2, name: 'Budget Backpackers',      members: 8900,  img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', category: 'Budget' },
  { id: 3, name: 'Luxury Travel Club',      members: 3200,  img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', category: 'Luxury' },
  { id: 4, name: 'Adventure Seekers',       members: 15600, img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&q=80', category: 'Adventure' },
];

export default function CommunityPage() {
  const [followed, setFollowed] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'travelers' | 'groups'>('travelers');

  const filtered = travelers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.handle.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFollow = (id: number) => {
    setFollowed(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-2">
            Travel <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Community</span>
          </motion.h1>
          <p className="text-gray-400 mb-8">Connect with {(2000000).toLocaleString()}+ travelers worldwide</p>

          {/* Search */}
          <div className="flex items-center gap-3 max-w-md">
            <div className="flex-1 flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search travelers..."
                className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Members',    value: '2M+',   icon: Users,       color: 'text-fuchsia-400' },
            { label: 'Countries',  value: '180+',  icon: Globe,       color: 'text-blue-400' },
            { label: 'Posts/day',  value: '50K+',  icon: Camera,      color: 'text-orange-400' },
            { label: 'Groups',     value: '1,200', icon: MessageCircle, color: 'text-emerald-400' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-white/[0.06] text-center"
            >
              <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
              <div className="text-2xl font-black">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['travelers', 'groups'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/25'
                  : 'bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'travelers' && (
            <motion.div key="travelers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((traveler, i) => {
                  const isFollowed = followed.includes(traveler.id);
                  const badge = badges[traveler.badge];
                  return (
                    <motion.div
                      key={traveler.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -4 }}
                      className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-fuchsia-500/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-lg font-bold">
                              {traveler.avatar}
                            </div>
                            {traveler.verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold">{traveler.name}</div>
                            <div className="text-xs text-gray-500">{traveler.handle}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg border text-xs font-medium ${badge.color}`}>
                          {traveler.badge}
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{traveler.bio}</p>

                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                        <MapPin className="w-3 h-3" /> {traveler.location}
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {traveler.countries.map((flag, idx) => (
                          <span key={idx} className="text-lg">{flag}</span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">+{traveler.trips - 5} more</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                        {[
                          { label: 'Followers', value: traveler.followers >= 1000 ? `${(traveler.followers / 1000).toFixed(1)}K` : traveler.followers },
                          { label: 'Trips', value: traveler.trips },
                          { label: 'Posts', value: traveler.posts },
                        ].map(s => (
                          <div key={s.label} className="glass rounded-xl p-2 border border-white/[0.04]">
                            <div className="font-bold text-sm">{s.value}</div>
                            <div className="text-xs text-gray-500">{s.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFollow(traveler.id)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            isFollowed
                              ? 'bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300'
                              : 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/20'
                          }`}
                        >
                          {isFollowed ? <><Check className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-gray-400 hover:text-white transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'groups' && (
            <motion.div key="groups" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {groups.map((group, i) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-fuchsia-500/20 transition-all group cursor-pointer"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img src={group.img} alt={group.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs border border-white/10">{group.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 group-hover:text-fuchsia-300 transition-colors">{group.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                        <Users className="w-3 h-3" /> {group.members.toLocaleString()} members
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/20 text-fuchsia-300 text-sm font-medium hover:from-fuchsia-500/30 hover:to-pink-500/30 transition-all"
                      >
                        Join Group
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
