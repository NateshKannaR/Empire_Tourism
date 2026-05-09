'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Plane, Map, Users, Star, Navigation as NavIcon, Wallet, Rss } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/discover',   label: 'Discover',   icon: Globe },
  { href: '/booking',    label: 'Booking',    icon: Plane },
  { href: '/itinerary',  label: 'Itinerary',  icon: Map },
  { href: '/feed',       label: 'Feed',       icon: Rss },
  { href: '/reviews',    label: 'Reviews',    icon: Star },
  { href: '/maps',       label: 'Maps',       icon: NavIcon },
  { href: '/budget',     label: 'Budget',     icon: Wallet },
  { href: '/community',  label: 'Community',  icon: Users },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
          >
            <Globe className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Travr
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 rounded-2xl bg-white/[0.04] border border-white/[0.06] p-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                pathname === href ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {pathname === href && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-gray-400" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/[0.06] bg-gray-950/95 px-6 py-4 grid grid-cols-2 gap-2"
          >
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
