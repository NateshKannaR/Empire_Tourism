'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, Filter, Search, MapPin, Camera, ChevronDown } from 'lucide-react';

const places = [
  { id: 1, name: 'Eiffel Tower',       location: 'Paris, France',      category: 'Landmark',  rating: 4.8, totalReviews: 12453, img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80', ratingBreakdown: [60, 25, 10, 3, 2] },
  { id: 2, name: 'Colosseum',          location: 'Rome, Italy',         category: 'Heritage',  rating: 4.7, totalReviews: 9876,  img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80', ratingBreakdown: [55, 28, 12, 3, 2] },
  { id: 3, name: 'Fushimi Inari',      location: 'Kyoto, Japan',        category: 'Temple',    rating: 4.9, totalReviews: 7234,  img: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80', ratingBreakdown: [70, 20, 7, 2, 1] },
  { id: 4, name: 'Machu Picchu',       location: 'Cusco, Peru',         category: 'Ruins',     rating: 4.9, totalReviews: 15678, img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80', ratingBreakdown: [72, 18, 7, 2, 1] },
];

const reviews = [
  { id: 1, placeId: 1, user: 'Sarah M.', avatar: 'SM', rating: 5, date: 'Dec 2024', title: 'Absolutely magical at night!', content: 'Visited during the light show at 9pm. The tower sparkles every hour and it is truly one of the most beautiful things I have ever seen. The queues are long but worth it — book tickets online in advance!', helpful: 234, photos: 3, verified: true },
  { id: 2, placeId: 1, user: 'James K.', avatar: 'JK', rating: 4, date: 'Nov 2024', title: 'Iconic but crowded', content: 'The view from the top is spectacular. However, be prepared for very long queues even with pre-booked tickets. Go early morning for the best experience with fewer crowds.', helpful: 187, photos: 5, verified: true },
  { id: 3, placeId: 2, user: 'Maria L.', avatar: 'ML', rating: 5, date: 'Jan 2025', title: 'History comes alive here', content: 'Standing inside the Colosseum is a surreal experience. The audio guide is excellent and really brings the history to life. Highly recommend the underground tour!', helpful: 312, photos: 8, verified: false },
  { id: 4, placeId: 3, user: 'Yuki T.', avatar: 'YT', rating: 5, date: 'Mar 2025', title: 'Go at sunrise — no crowds!', content: 'The thousands of torii gates are breathtaking. I went at 5:30am and had the path almost to myself. By 9am it was packed. The hike to the top takes about 2 hours but the views are worth it.', helpful: 445, photos: 12, verified: true },
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [selectedPlace, setSelectedPlace] = useState(places[0]);
  const [sortBy, setSortBy] = useState('helpful');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const placeReviews = reviews.filter(r => r.placeId === selectedPlace.id);

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-2">
            Reviews & <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Ratings</span>
          </motion.h1>
          <p className="text-gray-400">Honest reviews from real travelers</p>
        </div>
      </div>

      <div className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Place selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Popular Places</h3>
            {places.map((place, i) => (
              <motion.button
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedPlace(place)}
                className={`w-full text-left rounded-2xl overflow-hidden border transition-all ${
                  selectedPlace.id === place.id
                    ? 'border-yellow-500/30 bg-yellow-500/5'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <div className="relative h-28 overflow-hidden">
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <div className="font-bold text-sm">{place.name}</div>
                    <div className="text-xs text-gray-300 flex items-center gap-1"><MapPin className="w-3 h-3" />{place.location}</div>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <StarRating rating={place.rating} />
                  <span className="text-xs text-gray-400">{place.totalReviews.toLocaleString()} reviews</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Reviews panel */}
          <div>
            {/* Place overview */}
            <motion.div
              key={selectedPlace.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 border border-white/[0.06] mb-6"
            >
              <div className="flex items-start gap-6">
                <img src={selectedPlace.img} alt={selectedPlace.name} className="w-32 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-black mb-1">{selectedPlace.name}</h2>
                      <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                        <MapPin className="w-4 h-4" /> {selectedPlace.location}
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-white/[0.06] text-xs">{selectedPlace.category}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setShowWriteReview(!showWriteReview)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold"
                    >
                      Write Review
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-black text-amber-400">{selectedPlace.rating}</div>
                    <div>
                      <StarRating rating={selectedPlace.rating} size="lg" />
                      <div className="text-sm text-gray-400 mt-1">{selectedPlace.totalReviews.toLocaleString()} reviews</div>
                    </div>
                    <div className="flex-1 space-y-1">
                      {selectedPlace.ratingBreakdown.map((pct, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-4">{5 - i}</span>
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Write review form */}
            <AnimatePresence>
              {showWriteReview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass rounded-2xl p-6 border border-yellow-500/20 mb-6 overflow-hidden"
                >
                  <h3 className="font-bold mb-4">Your Review</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <button
                        key={i}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setUserRating(i)}
                      >
                        <Star className={`w-8 h-8 transition-colors ${i <= (hoverRating || userRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-700'}`} />
                      </button>
                    ))}
                    {userRating > 0 && <span className="text-sm text-gray-400 ml-2">{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][userRating]}</span>}
                  </div>
                  <input placeholder="Review title" className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-yellow-500/50 transition-colors placeholder-gray-600" />
                  <textarea placeholder="Share your experience..." rows={4} className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-yellow-500/50 transition-colors placeholder-gray-600 resize-none" />
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold">
                      Submit Review
                    </motion.button>
                    <button onClick={() => setShowWriteReview(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white transition-colors">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sort */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">{placeReviews.length} reviews</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white/[0.06] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none"
              >
                <option value="helpful">Most Helpful</option>
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>

            {/* Review cards */}
            <div className="space-y-4">
              {(placeReviews.length > 0 ? placeReviews : reviews).map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 border border-white/[0.06]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                        {review.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{review.user}</span>
                          {review.verified && <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">Verified</span>}
                        </div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <h4 className="font-bold mb-2">{review.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{review.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpful})
                    </button>
                    {review.photos > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" /> {review.photos} photos
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
