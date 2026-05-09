'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Trash2, Plus, AlertCircle, Package, Info, MapPin, Wallet, Compass } from 'lucide-react';
import { store } from '@/lib/store';
import { PackingItem, TripData } from '@/lib/types';
import AdaptiveBackground from '@/components/AdaptiveBackground';
import AdvancedProgress from '@/components/AdvancedProgress';
import ParticleSystem from '@/components/ParticleSystem';
import { buildSmartPlan } from '@/lib/smartPlanner';

export default function DashboardPage() {
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [currentTrip, setCurrentTrip] = useState<TripData | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [, forceUpdate] = useState({});
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate({}));
    const trips = store.getTrips();
    if (trips.length > 0) {
      const latestTrip = trips[0];
      setCurrentTrip(latestTrip);
      const list = store.getPackingList(latestTrip.id);
      if (list) setPackingList(list.items);
    }
    return () => { unsubscribe(); };
  }, []);

  const togglePacked = (itemId: string) => {
    const trips = store.getTrips();
    if (trips.length > 0) {
      store.updatePackingList(trips[0].id, (list) => ({
        ...list,
        items: list.items.map(item =>
          item.id === itemId ? { ...item, packed: !item.packed } : item
        ),
      }));
      setPackingList(prev => prev.map(item =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ));
    }
  };

  const removeItem = (itemId: string) => {
    const trips = store.getTrips();
    if (trips.length > 0) {
      store.updatePackingList(trips[0].id, (list) => ({
        ...list,
        items: list.items.filter(item => item.id !== itemId),
      }));
      setPackingList(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const addCustomItem = () => {
    if (!newItemName.trim()) return;
    
    const trips = store.getTrips();
    if (trips.length > 0) {
      const newItem: PackingItem = {
        id: `custom-${Date.now()}`,
        name: newItemName,
        category: 'essentials',
        quantity: 1,
        reason: 'Custom addition',
        packed: false,
      };
      
      store.updatePackingList(trips[0].id, (list) => ({
        ...list,
        items: [...list.items, newItem],
      }));
      setPackingList(prev => [...prev, newItem]);
      setNewItemName('');
      setShowAddItem(false);
    }
  };

  const categories = {
    clothing: packingList.filter(item => item.category === 'clothing'),
    essentials: packingList.filter(item => item.category === 'essentials'),
    electronics: packingList.filter(item => item.category === 'electronics'),
    'activity-gear': packingList.filter(item => item.category === 'activity-gear'),
  };

  const totalItems = packingList.length;
  const packedItems = packingList.filter(item => item.packed).length;
  const progress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;
  const smartPlan = currentTrip ? buildSmartPlan(currentTrip) : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedProgress(prev => {
        if (prev < progress) return Math.min(prev + 2, progress);
        if (prev > progress) return Math.max(prev - 2, progress);
        return prev;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [progress]);

  const essentialItems = ['Travel documents', 'Medications', 'Phone charger', 'Wallet'];
  const missingEssentials = essentialItems.filter(essential =>
    !packingList.some(item => item.name === essential && item.packed)
  );

  if (packingList.length === 0) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 relative">
        <AdaptiveBackground weather="sunny" activities={[]} duration={7} />
        <div className="max-w-4xl mx-auto text-center">
          <Package className="w-20 h-20 text-gray-600 mx-auto mb-6 animate-float" />
          <h2 className="text-3xl font-bold text-gray-400 mb-3">No Packing List Yet</h2>
          <p className="text-gray-500 text-lg">Create a trip in the planner to get started</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AdaptiveBackground 
        weather={currentTrip?.weather || 'sunny'} 
        activities={currentTrip?.activities || []} 
        duration={currentTrip?.duration || 7} 
      />

      <div className="pt-40 pb-32 px-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Packing Dashboard
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 w-48 bg-gradient-to-r from-primary-500 to-transparent rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="glass-strong rounded-3xl p-10 glow relative overflow-hidden">
            {/* Particle background */}
            <div className="absolute inset-0">
              <ParticleSystem 
                particleCount={60}
                colors={['rgba(245, 158, 11, 0.2)', 'rgba(249, 115, 22, 0.15)', 'rgba(59, 130, 246, 0.1)']}
                intensity={0.8}
                interactive={true}
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
                <div className="text-center lg:text-left">
                  <motion.div
                    key={packedItems}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold mb-2"
                  >
                    {packedItems} <span className="text-gray-500">/ {totalItems}</span>
                  </motion.div>
                  <div className="text-gray-400">Items packed</div>
                </div>
                
                {/* Advanced Progress Circle */}
                <div className="flex-shrink-0">
                  <AdvancedProgress
                    value={packedItems}
                    max={totalItems}
                    label="Packing Progress"
                    size="lg"
                    variant="circle"
                    showAnimation={true}
                    color={progress === 100 ? 'success' : progress > 75 ? 'primary' : progress > 50 ? 'warning' : 'danger'}
                    showStats={true}
                  />
                </div>
                
                <div className="text-center lg:text-right">
                  <motion.div
                    key={Math.round(animatedProgress)}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-7xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent text-glow"
                  >
                    {Math.round(animatedProgress)}%
                  </motion.div>
                  <div className="text-gray-400 mt-2">Completion</div>
                </div>
              </div>
              
              {/* Progress Bar for mobile */}
              <div className="mt-8 lg:hidden">
                <AdvancedProgress
                  value={packedItems}
                  max={totalItems}
                  label="Progress"
                  size="md"
                  variant="bar"
                  showAnimation={true}
                  color={progress === 100 ? 'success' : progress > 75 ? 'primary' : progress > 50 ? 'warning' : 'danger'}
                  showStats={true}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {currentTrip && smartPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-10"
          >
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-300" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Trip blueprint</div>
                  <h2 className="text-2xl font-bold">{smartPlan.headline}</h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {smartPlan.vibeTags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full glass text-xs uppercase tracking-[0.2em] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {smartPlan.days.slice(0, 3).map((day) => (
                  <div key={day.day} className="flex items-start gap-3 bg-gray-900/50 rounded-2xl p-4 border border-gray-800">
                    <div className="w-9 h-9 rounded-xl bg-primary-500/15 flex items-center justify-center text-xs font-semibold text-primary-200">
                      D{day.day}
                    </div>
                    <div>
                      <div className="font-semibold">{day.title}</div>
                      <div className="text-sm text-gray-400">{day.focus}</div>
                    </div>
                    <div className="ml-auto text-xs uppercase tracking-[0.2em] text-primary-400">{day.intensity}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Budget split</div>
                  <h3 className="text-xl font-semibold">Estimated allocation</h3>
                </div>
              </div>
              <div className="space-y-3">
                {smartPlan.budgetSplit.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm text-gray-300">
                    <span>{item.label}</span>
                    <span className="text-emerald-200 font-semibold">
                      {currentTrip.currency ?? 'USD'} {item.estimate.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                <Compass className="w-4 h-4" />
                <span>Check-in {smartPlan.timing.checkIn} · Departure {smartPlan.timing.bestDeparture}</span>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {missingEssentials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 40 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="glass-strong rounded-2xl p-6 border-l-4 border-yellow-500 flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-yellow-300 text-lg mb-2">Missing Essentials</div>
                <div className="text-yellow-400/80">
                  Don't forget: {missingEssentials.join(', ')}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          {showAddItem ? (
            <div className="flex gap-3">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                placeholder="Enter item name..."
                className="flex-1 px-6 py-4 glass rounded-2xl focus:outline-none focus:glow transition-all text-lg"
                autoFocus
              />
              <button
                onClick={addCustomItem}
                className="px-8 py-4 bg-primary-500 rounded-2xl font-medium hover:glow transition-all"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddItem(false)}
                className="px-8 py-4 glass rounded-2xl font-medium hover:glass-strong transition-all"
              >
                Cancel
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddItem(true)}
              className="flex items-center gap-3 px-6 py-4 glass rounded-2xl hover:glass-strong transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Custom Item
            </motion.button>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {Object.entries(categories).map(([category, items], catIndex) => (
            items.length > 0 && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + catIndex * 0.1 }}
                className="glass-strong rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 capitalize flex items-center gap-3">
                  {category.replace('-', ' ')}
                  <span className="text-sm text-gray-500 px-3 py-1 glass rounded-full">({items.length})</span>
                </h2>
                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`group flex items-start gap-4 p-5 rounded-2xl transition-all cursor-pointer ${
                          item.packed ? 'glass' : 'glass-strong hover:glow'
                        }`}
                      >
                        <button
                          onClick={() => togglePacked(item.id)}
                          className="flex-shrink-0 mt-1"
                        >
                          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                            {item.packed ? (
                              <CheckCircle2 className="w-6 h-6 text-primary-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-600 group-hover:text-gray-400 transition-colors" />
                            )}
                          </motion.div>
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-lg mb-1 ${
                            item.packed ? 'line-through text-gray-500' : ''
                          }`}>
                            {item.name} {item.quantity > 1 && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-sm text-primary-400 ml-2"
                              >
                                ×{item.quantity}
                              </motion.span>
                            )}
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-500">
                            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{item.reason}</span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </main>
  );
}
