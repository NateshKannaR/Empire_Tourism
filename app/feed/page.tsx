'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, MoreHorizontal, Image, Send, TrendingUp } from 'lucide-react';

const posts = [
  {
    id: 1,
    user: { name: 'Sofia Reyes', handle: '@sofia_travels', avatar: 'SR', verified: true },
    location: 'Santorini, Greece',
    time: '2h ago',
    content: 'Watching the sunset from Oia is something I will never forget. The way the sky turns into shades of orange and pink over the caldera... absolutely breathtaking. 🌅',
    images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80'],
    likes: 2341, comments: 87, saves: 412,
    tags: ['#Santorini', '#Greece', '#Sunset'],
    liked: false, saved: false,
  },
  {
    id: 2,
    user: { name: 'Kenji Tanaka', handle: '@kenji_explores', avatar: 'KT', verified: false },
    location: 'Kyoto, Japan',
    time: '5h ago',
    content: 'Cherry blossom season in Kyoto is pure magic. Walked through Maruyama Park at dawn — just me and the sakura. No crowds, just peace. 🌸',
    images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80'],
    likes: 1876, comments: 54, saves: 298,
    tags: ['#Kyoto', '#CherryBlossom', '#Japan'],
    liked: true, saved: false,
  },
  {
    id: 3,
    user: { name: 'Amara Osei', handle: '@amara_wanders', avatar: 'AO', verified: true },
    location: 'Bali, Indonesia',
    time: '1d ago',
    content: 'Found this hidden waterfall after a 2-hour hike through the jungle. Worth every step. Bali never stops surprising me 🌿💚',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'],
    likes: 3102, comments: 143, saves: 567,
    tags: ['#Bali', '#Waterfall', '#HiddenGems'],
    liked: false, saved: true,
  },
  {
    id: 4,
    user: { name: 'Lucas Müller', handle: '@lucas_ontheroad', avatar: 'LM', verified: false },
    location: 'Patagonia, Argentina',
    time: '2d ago',
    content: 'Day 8 of trekking Torres del Paine. My legs are dead but my soul is alive. This place is unlike anything on Earth. 🏔️',
    images: ['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80'],
    likes: 987, comments: 62, saves: 234,
    tags: ['#Patagonia', '#Trekking', '#Adventure'],
    liked: false, saved: false,
  },
];

const trending = ['#Santorini', '#Japan2025', '#BaliLife', '#Patagonia', '#SoloTravel', '#BudgetTravel'];

export default function FeedPage() {
  const [feedPosts, setFeedPosts] = useState(posts);
  const [newPost, setNewPost] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleLike = (id: number) => {
    setFeedPosts(prev => prev.map(p => p.id === id
      ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
      : p
    ));
  };

  const toggleSave = (id: number) => {
    setFeedPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Feed */}
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black mb-8">
              Travel <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Feed</span>
            </motion.h1>

            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-5 border border-white/[0.06] mb-6"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  You
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                    placeholder="Share your travel story..."
                    rows={3}
                    className="w-full bg-transparent text-gray-200 placeholder-gray-600 focus:outline-none resize-none text-sm"
                  />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                    <div className="flex gap-3">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs transition-colors">
                        <Image className="w-4 h-4" /> Photo
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs transition-colors">
                        <MapPin className="w-4 h-4" /> Location
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40"
                      disabled={!newPost.trim()}
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              {['all', 'following', 'trending'].map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                    activeFilter === f
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : 'bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {feedPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl border border-white/[0.06] overflow-hidden"
                >
                  {/* Post header */}
                  <div className="flex items-center justify-between p-5 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                        {post.user.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm">{post.user.name}</span>
                          {post.user.verified && <span className="text-blue-400 text-xs">✓</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{post.user.handle}</span>
                          <span>·</span>
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                          <span>·</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-400 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="px-5 pb-3">
                    <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-orange-400 hover:text-orange-300 cursor-pointer">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  {post.images.length === 1 && (
                    <img src={post.images[0]} alt="" className="w-full h-72 object-cover" />
                  )}
                  {post.images.length === 2 && (
                    <div className="grid grid-cols-2 gap-0.5">
                      {post.images.map((img, idx) => (
                        <img key={idx} src={img} alt="" className="w-full h-48 object-cover" />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-5">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
                      >
                        <Heart className={`w-5 h-5 ${post.liked ? 'fill-pink-500' : ''}`} />
                        {post.likes.toLocaleString()}
                      </motion.button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" /> {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => toggleSave(post.id)}
                      className={`transition-colors ${post.saved ? 'text-amber-400' : 'text-gray-500 hover:text-amber-400'}`}
                    >
                      <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-amber-400' : ''}`} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-5 border border-white/[0.06]"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <h3 className="font-bold text-sm">Trending Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trending.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs cursor-pointer hover:bg-orange-500/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-5 border border-white/[0.06]"
            >
              <h3 className="font-bold text-sm mb-4">Suggested Travelers</h3>
              <div className="space-y-3">
                {[
                  { name: 'Emma Wilson', handle: '@emma_world', followers: '12.4K' },
                  { name: 'Raj Patel', handle: '@raj_adventures', followers: '8.9K' },
                  { name: 'Yuki Sato', handle: '@yuki_japan', followers: '21.2K' },
                ].map(u => (
                  <div key={u.handle} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                        {u.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.followers} followers</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs hover:bg-violet-500/20 transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
