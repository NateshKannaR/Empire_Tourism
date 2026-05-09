'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Wallet, TrendingUp, TrendingDown, DollarSign, Plane, Hotel, Utensils, Camera, Car, ShoppingBag, AlertCircle } from 'lucide-react';

type Category = 'flights' | 'hotels' | 'food' | 'activities' | 'transport' | 'shopping' | 'other';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  currency: string;
}

const categoryConfig: Record<Category, { icon: any; color: string; bg: string; label: string }> = {
  flights:    { icon: Plane,       color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20',    label: 'Flights' },
  hotels:     { icon: Hotel,       color: 'text-violet-400',  bg: 'bg-violet-500/10 border-violet-500/20', label: 'Hotels' },
  food:       { icon: Utensils,    color: 'text-orange-400',  bg: 'bg-orange-500/10 border-orange-500/20', label: 'Food' },
  activities: { icon: Camera,      color: 'text-pink-400',    bg: 'bg-pink-500/10 border-pink-500/20',    label: 'Activities' },
  transport:  { icon: Car,         color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Transport' },
  shopping:   { icon: ShoppingBag, color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20',  label: 'Shopping' },
  other:      { icon: DollarSign,  color: 'text-gray-400',    bg: 'bg-gray-500/10 border-gray-500/20',    label: 'Other' },
};

const initialExpenses: Expense[] = [
  { id: '1', title: 'Flight to Paris',       amount: 420,  category: 'flights',    date: '2025-06-01', currency: 'USD' },
  { id: '2', title: 'Le Grand Hotel (3n)',    amount: 960,  category: 'hotels',     date: '2025-06-01', currency: 'USD' },
  { id: '3', title: 'Eiffel Tower tickets',  amount: 45,   category: 'activities', date: '2025-06-02', currency: 'USD' },
  { id: '4', title: 'Dinner at Café Flore',  amount: 85,   category: 'food',       date: '2025-06-02', currency: 'USD' },
  { id: '5', title: 'Metro day pass',        amount: 15,   category: 'transport',  date: '2025-06-03', currency: 'USD' },
  { id: '6', title: 'Louvre Museum',         amount: 22,   category: 'activities', date: '2025-06-03', currency: 'USD' },
  { id: '7', title: 'Souvenirs',             amount: 65,   category: 'shopping',   date: '2025-06-04', currency: 'USD' },
  { id: '8', title: 'Lunch x3',             amount: 120,  category: 'food',       date: '2025-06-04', currency: 'USD' },
];

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [totalBudget, setTotalBudget] = useState(2500);
  const [showAdd, setShowAdd] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'food' as Category, date: new Date().toISOString().slice(0, 10) });

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPct = Math.min((totalSpent / totalBudget) * 100, 100);

  const byCategory = Object.entries(categoryConfig).map(([cat, cfg]) => {
    const total = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
    return { cat: cat as Category, total, pct: totalSpent > 0 ? (total / totalSpent) * 100 : 0, ...cfg };
  }).filter(c => c.total > 0).sort((a, b) => b.total - a.total);

  const addExpense = () => {
    if (!newExpense.title || !newExpense.amount) return;
    setExpenses(prev => [...prev, {
      id: Date.now().toString(),
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      currency: 'USD'
    }]);
    setNewExpense({ title: '', amount: '', category: 'food', date: new Date().toISOString().slice(0, 10) });
    setShowAdd(false);
  };

  return (
    <main className="min-h-screen pt-16 bg-[#030712]">
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-600/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-2">
              Budget <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Tracker</span>
            </motion.h1>
            <p className="text-gray-400">Paris Adventure 2025</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg shadow-green-500/25"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </motion.button>
        </div>
      </div>

      <div className="px-6 pb-24 max-w-7xl mx-auto">
        {/* Add expense modal */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
              onClick={e => e.target === e.currentTarget && setShowAdd(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-strong rounded-2xl p-6 border border-white/10 w-full max-w-md"
              >
                <h3 className="font-bold text-lg mb-5">Add Expense</h3>
                <div className="space-y-4">
                  <input
                    placeholder="What did you spend on?"
                    value={newExpense.title}
                    onChange={e => setNewExpense(p => ({ ...p, title: e.target.value }))}
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors placeholder-gray-600"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Amount (USD)"
                      value={newExpense.amount}
                      onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-colors placeholder-gray-600"
                    />
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={e => setNewExpense(p => ({ ...p, date: e.target.value }))}
                      className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:outline-none text-gray-300"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(categoryConfig).map(([cat, cfg]) => (
                      <button
                        key={cat}
                        onClick={() => setNewExpense(p => ({ ...p, category: cat as Category }))}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-xs transition-all ${
                          newExpense.category === cat ? cfg.bg + ' ' + cfg.color : 'border-white/[0.06] text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        <cfg.icon className="w-4 h-4" />
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={addExpense}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm"
                    >
                      Add Expense
                    </motion.button>
                    <button onClick={() => setShowAdd(false)} className="px-5 py-3 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Left */}
          <div className="space-y-6">
            {/* Budget overview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Budget</div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black">${totalBudget.toLocaleString()}</span>
                    <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Edit</button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Remaining</div>
                  <div className={`text-3xl font-black ${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    ${Math.abs(remaining).toLocaleString()}
                    {remaining < 0 && <span className="text-sm ml-1">over</span>}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Spent: ${totalSpent.toLocaleString()}</span>
                  <span>{Math.round(spentPct)}% used</span>
                </div>
                <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${spentPct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full relative ${spentPct > 90 ? 'bg-gradient-to-r from-red-500 to-rose-500' : spentPct > 70 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </div>

              {remaining < 0 && (
                <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  You are ${Math.abs(remaining)} over budget!
                </div>
              )}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, icon: TrendingUp, color: 'text-blue-400' },
                { label: 'Avg/Day', value: `$${Math.round(totalSpent / 4)}`, icon: DollarSign, color: 'text-violet-400' },
                { label: 'Transactions', value: expenses.length.toString(), icon: Wallet, color: 'text-emerald-400' },
              ].map(s => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 border border-white/[0.06] text-center">
                  <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                  <div className="text-xl font-black">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Expense list */}
            <div>
              <h3 className="font-bold mb-4">All Expenses</h3>
              <div className="space-y-2">
                {expenses.map((exp, i) => {
                  const cfg = categoryConfig[exp.category];
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${cfg.bg} group`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                        <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{exp.title}</div>
                        <div className="text-xs text-gray-500">{exp.date} · {cfg.label}</div>
                      </div>
                      <div className="font-bold text-sm">${exp.amount}</div>
                      <button
                        onClick={() => setExpenses(prev => prev.filter(e => e.id !== exp.id))}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Category breakdown */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 border border-white/[0.06]">
              <h3 className="font-bold mb-5">Spending by Category</h3>
              <div className="space-y-4">
                {byCategory.map((cat, i) => (
                  <motion.div key={cat.cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <cat.icon className={`w-4 h-4 ${cat.color}`} />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">${cat.total}</span>
                        <span className="text-xs text-gray-500">{Math.round(cat.pct)}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.pct}%` }}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.8 }}
                        className={`h-full rounded-full ${cat.bg.replace('bg-', 'bg-').replace('/10', '/60').replace('border-', '')}`}
                        style={{ background: `var(--tw-gradient-stops)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Daily breakdown */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-6 border border-white/[0.06]">
              <h3 className="font-bold mb-5">Daily Spending</h3>
              {['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04'].map((date, i) => {
                const dayTotal = expenses.filter(e => e.date === date).reduce((s, e) => s + e.amount, 0);
                const maxDay = 1500;
                return (
                  <div key={date} className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Day {i + 1} · {date}</span>
                      <span className="font-semibold text-white">${dayTotal}</span>
                    </div>
                    <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(dayTotal / maxDay) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
