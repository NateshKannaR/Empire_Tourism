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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background orbs */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px]" />
        </motion.div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8 text-sm text-violet-300"
          >
            <Zap className="w-3.5 h-3.5" />
            The all-in-one travel platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black leading-[0.9] mb-6"
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
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Discover destinations, book trips, plan itineraries, track budgets, and connect with millions of travelers — all in one place.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3 max-w-xl mx-auto mb-10 p-2 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl"
          >
            <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
            />
            <Link href="/discover">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 flex items-center gap-2"
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
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-white">{value}</span>
                <span className="text-gray-500 text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black mb-4">Everything you need to <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">travel better</span></h2>
            <p className="text-gray-400 text-xl">8 powerful features, one seamless experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-white/10 hover:bg-white/[0.05] transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{f.label}</h3>
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
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-black mb-2">Trending <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Destinations</span></h2>
              <p className="text-gray-400">What travelers are loving right now</p>
            </div>
            <Link href="/discover" className="hidden md:flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={dest.img} alt={dest.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium border border-white/10">{dest.tag}</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="font-bold text-xl">{dest.name}</div>
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
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black mb-3">Loved by <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">travelers</span></h2>
            <p className="text-gray-400">Real stories from real adventurers</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-white/10 transition-all"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">{t.avatar}</div>
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
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-16 border border-white/[0.06]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-pink-600/10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-violet-400" />
                <span className="text-violet-300 text-sm font-medium">Free to join · No credit card required</span>
              </div>
              <h2 className="text-5xl font-black mb-4">Start your journey <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">today</span></h2>
              <p className="text-gray-400 text-xl mb-10">Join 2 million travelers already using Travr to plan, book, and share their adventures.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/discover">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold text-lg shadow-2xl shadow-violet-500/30 flex items-center gap-2"
                  >
                    Explore Destinations <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/community">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white font-bold text-lg flex items-center gap-2"
                  >
                    Join Community <Users className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Travr</span>
            </div>
            <p className="text-gray-600 text-sm">© 2025 Travr. Built for explorers, by explorers.</p>
            <div className="flex items-center gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-white/10 transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
