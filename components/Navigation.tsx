'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Package, Map, Users, Star, Navigation as NavIcon, Wallet, Rss } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/discover',   label: 'Discover',   icon: Globe },
  { href: '/packages',   label: 'Packages',   icon: Package },
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
    <nav className="nav-mobile safe-area-top">
      <div className="container-mobile h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-10">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.div>
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
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

        {/* Mobile toggle + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/packages" className="hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-mobile bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25"
            >
              <Package className="w-3.5 h-3.5" /> 
              <span className="hidden md:inline">Packages</span>
            </motion.button>
          </Link>
          
          <button 
            className="lg:hidden text-gray-400 p-2 rounded-lg hover:bg-white/5 transition-colors z-10" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              className="absolute top-full left-0 right-0 mx-4 mt-2 glass-mobile rounded-2xl border border-white/10 shadow-2xl z-50 lg:hidden safe-area-bottom"
            >
              <div className="p-4 space-y-2">
                {links.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname === href
                        ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-violet-300 border border-violet-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-3 mt-3 border-t border-white/10">
                  <Link href="/packages" onClick={() => setOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      className="w-full btn-mobile bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25"
                    >
                      <Package className="w-4 h-4" /> View Packages
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
