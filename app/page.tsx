'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Globe, Plane, Map, Users, Star, Navigation, Wallet, Rss, ArrowRight, Search, TrendingUp, Shield, Zap, Github, Twitter, Instagram } from 'lucide-react';

const features = [
  { icon: Globe,      label: 'Discover',   desc: 'Browse 10,000+ destinations',     href: '/discover',  color: 'from-violet-500 to-purple-600' },
  { icon: Plane,      label: 'Booking',    desc: 'Flights, hotels & packages',       href: '/booking',   color: 'from-blue-500 to-cyan-500' },
  { icon: Map,        label: 'Itinerary',  desc: 'Day-by-day trip planning',         href: '/itinerary', color: 'from-emerald-500 to-teal-500' },
  { icon: Rss,        label: 'Feed',       desc: 'Travel stories from the world',    href: '/feed',      color: 'from-orange-500 to-amber-500' },
  { icon: Star,       label: 'Reviews',    desc: 'Honest ratings & reviews',         href: '/reviews',   color: 'from-yellow-500 to-orange-500' },
  { icon: Navigation, label: 'Maps',       desc: 'Interactive maps & navigation',    href: '/maps',      color: 'from-pink-500 to-rose-500' },
  { icon: Wallet,     label: 'Budget',     desc: 'Track every travel expense',       href: '/budget',    color: 'from-green-500 to-emerald-600' },
  { icon: Users,      label: 'Community',  desc: 'Connect with fellow travelers',    href: '/community', color: 'from-fuchsia-500 to-pink-500' },
];

const trending = [
  { name: 'Bali',       country: 'Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', tag: '⭐ Top Rated' },
  { name: 'Patagonia',  country: 'Argentina', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', tag: '🏔️ Adventure' },
  { name: 'Santorini',  country: 'Greece',    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', tag: '🌅 Romantic' },
  { name: 'Kyoto',      country: 'Japan',     img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', tag: '🏯 Culture' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Solo Traveler', avatar: 'SM', text: 'Planned my entire Southeast Asia trip in under an hour. The itinerary builder is insanely good!', rating: 5 },
  { name: 'James K.', role: 'Digital Nomad', avatar: 'JK', text: 'Budget tracker saved me from overspending in Tokyo. Real-time alerts are a game changer.', rating: 5 },
  { name: 'Priya R.', role: 'Family Traveler', avatar: 'PR', text: 'Found the perfect Bali package for our family. Booking was seamless and the price was unbeatable.', rating: 5 },
];

const marqueeDestinations = [
  'Paris', 'Tokyo', 'Bali', 'New York', 'Santorini', 'Kyoto', 'Maldives', 'Patagonia',
  'Amalfi Coast', 'Banff', 'Machu Picchu', 'Dolomites', 'Amazon', 'Dubai', 'Iceland', 'Lisbon',
];

const stats = [
  { value: '2M+',  label: 'Travelers',    icon: Users },
  { value: '180+', label: 'Countries',    icon: Globe },
  { value: '50K+', label: 'Reviews',      icon: Star },
  { value: '4.9',  label: 'App Rating',   icon: TrendingUp },
];

export default function HomePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(smoothX, [-500, 500], [-30, 30]);
  const bgY = useTransform(smoothY, [-500, 500], [-20, 20]);

  return (
    <main
      className="min-h-screen bg-[#030712] text-gray-100"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
        {/* Animated background orbs */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-violet-600/10 blur-[60px] sm:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-pink-600/10 blur-[60px] sm:blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-full bg-blue-600/8 blur-[50px] sm:blur-[100px]" />
        </motion.div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />

        <div className="relative z-10 container-mobile text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6 sm:mb-8 text-xs sm:text-sm text-violet-300"
          >
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            The all-in-one travel platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="hero-title mb-4 sm:mb-6"
          >
            <span className="block text-white">Travel</span>
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Smarter.
            </span>
            <span className="block text-white">Together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hero-subtitle max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            Discover destinations, book trips, plan itineraries, track budgets, and connect with millions of travelers — all in one place.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto mb-8 sm:mb-10 p-2 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 flex-1 w-full">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
            <Link href="/discover" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto btn-mobile bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-8 text-center"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <Icon className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-white text-sm sm:text-base">{value}</span>
                <span className="text-gray-500 text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* Features Grid */}
      <section className="section-mobile">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="mobile-text-3xl font-black mb-4">Everything you need to <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">travel better</span></h2>
            <p className="text-gray-400 mobile-text-lg">8 powerful features, one seamless experience.</p>
          </motion.div>

          <div className="grid-mobile-1 mobile-gap">
            {features.map((f, i) => (
              <motion.div
                key={f.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link href={f.href} className="block h-full">
                  <div className="card-mobile h-full group">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-white transition-colors">{f.label}</h3>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="section-mobile bg-white/[0.02]">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12"
          >
            <div>
              <h2 className="mobile-text-2xl font-black mb-2">Trending <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Destinations</span></h2>
              <p className="text-gray-400 text-sm sm:text-base">What travelers are loving right now</p>
            </div>
            <Link href="/discover" className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid-mobile-2 mobile-gap">
            {trending.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Link href="/discover">
                  <div className="relative mobile-rounded overflow-hidden">
                    <img src={dest.img} alt={dest.name} className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium border border-white/10">{dest.tag}</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="font-bold text-lg sm:text-xl">{dest.name}</div>
                      <div className="text-gray-300 text-sm">{dest.country}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="py-10 overflow-hidden border-y border-white/[0.04] bg-white/[0.01]">
        <div className="flex">
          <div className="destination-marquee flex gap-8 items-center">
            {[...marqueeDestinations, ...marqueeDestinations].map((d, i) => (
              <span key={i} className="flex items-center gap-3 text-gray-500 text-sm font-medium whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-mobile">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="mobile-text-2xl font-black mb-3">Loved by <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">travelers</span></h2>
            <p className="text-gray-400 text-sm sm:text-base">Real stories from real adventurers</p>
          </motion.div>
          <div className="grid-mobile-2 mobile-gap">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-mobile"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-mobile">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mobile-rounded overflow-hidden mobile-p border border-white/[0.06]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-pink-600/10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]" />
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                <span className="text-violet-300 text-xs sm:text-sm font-medium">Free to join · No credit card required</span>
              </div>
              <h2 className="mobile-text-3xl font-black mb-4">Start your journey <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">today</span></h2>
              <p className="text-gray-400 mobile-text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">Join 2 million travelers already using Travr to plan, book, and share their adventures.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                <Link href="/discover" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full btn-mobile bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-2xl shadow-violet-500/30 text-base sm:text-lg font-bold"
                  >
                    Explore Destinations <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </Link>
                <Link href="/community" className="flex-1 sm:flex-none">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full btn-mobile border border-white/10 bg-white/[0.04] text-white font-bold text-base sm:text-lg"
                  >
                    Join Community <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 sm:py-12">
        <div className="container-mobile">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent text-sm sm:text-base">Travr</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm text-center">© 2025 Travr. Built for explorers, by explorers.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <button key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/10 transition-all">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
