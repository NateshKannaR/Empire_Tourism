'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '@/components/ParticleSystem';
import Interactive3DCard from '@/components/Interactive3DCard';
import WeatherVisualization from '@/components/WeatherVisualization';
import AdvancedProgress from '@/components/AdvancedProgress';
import InteractiveMap from '@/components/InteractiveMap';
import ParallaxSection from '@/components/ParallaxSection';
import { Sparkles, Zap, Cloud, Target, TrendingUp } from 'lucide-react';

export default function AdvancedDemoPage() {
  const [progressValue, setProgressValue] = useState(65);
  const [weatherData] = useState({
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    feelsLike: 22,
    icon: '02d'
  });

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Hero Section with Particles */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleSystem 
          particleCount={150}
          colors={['rgba(245, 158, 11, 0.4)', 'rgba(249, 115, 22, 0.3)', 'rgba(59, 130, 246, 0.2)']}
          intensity={1.5}
          interactive={true}
        />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Advanced UI Showcase</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="block bg-gradient-to-r from-amber-300 via-white to-teal-200 bg-clip-text text-transparent">
              Dynamic UI
            </span>
            <span className="block text-4xl md:text-6xl text-gray-400 mt-4">Effects & Components</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Experience the next generation of interactive travel planning with advanced animations, 3D effects, and real-time visualizations.
          </motion.p>
        </div>
      </section>

      {/* Interactive 3D Cards Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Interactive <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">3D Cards</span>
            </h2>
            <p className="text-gray-400 text-xl">Hover and move your mouse to experience 3D effects</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <ParallaxSection
                key={i}
                speed={0.2 + i * 0.1}
                direction="up"
                offset={i * 20}
                fade={true}
                scale={true}
              >
                <Interactive3DCard
                  intensity={20}
                  perspective={1200}
                  glow={true}
                  shadow={true}
                  className="h-full"
                >
                  <div className="glass-strong rounded-2xl p-8 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Feature {i}</h3>
                    <p className="text-gray-400 mb-6">
                      Experience dynamic 3D effects with mouse tracking. The card responds to your cursor movement.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-amber-400">
                      <span>Hover to interact</span>
                      <span>→</span>
                    </div>
                  </div>
                </Interactive3DCard>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Visualization Section */}
      <section className="py-32 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Real-time <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Weather Visualization</span>
            </h2>
            <p className="text-gray-400 text-xl">Animated weather conditions with interactive elements</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <ParallaxSection speed={0.3} direction="left" fade={true} scale={true}>
              <WeatherVisualization
                weatherData={weatherData}
                size="lg"
                interactive={true}
              />
            </ParallaxSection>
            
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Cloud className="w-8 h-8 text-amber-400" />
                  <h3 className="text-2xl font-bold">Live Weather Effects</h3>
                </div>
                <p className="text-gray-400 text-lg">
                  The weather visualization component shows real-time conditions with animated effects:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Rain/snow particle effects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Temperature-based color gradients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Wind speed animations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Interactive hover states</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Visualizations Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Advanced <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Progress Visualizations</span>
            </h2>
            <p className="text-gray-400 text-xl">Multiple progress display variants with animations</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ParallaxSection speed={0.2} direction="up" fade={true} scale={true}>
              <div className="glass-strong rounded-3xl p-8 text-center">
                <h3 className="text-xl font-bold mb-6">Circle Progress</h3>
                <AdvancedProgress
                  value={progressValue}
                  max={100}
                  label="Completion"
                  size="md"
                  variant="circle"
                  showAnimation={true}
                  color="primary"
                  showStats={true}
                />
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.3} direction="up" fade={true} scale={true}>
              <div className="glass-strong rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Bar Progress</h3>
                <AdvancedProgress
                  value={progressValue}
                  max={100}
                  label="Task Progress"
                  size="md"
                  variant="bar"
                  showAnimation={true}
                  color="success"
                  showStats={true}
                />
                <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>Target: 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Current: {progressValue}%</span>
                  </div>
                </div>
              </div>
            </ParallaxSection>

            <ParallaxSection speed={0.4} direction="up" fade={true} scale={true}>
              <div className="glass-strong rounded-3xl p-8 text-center">
                <h3 className="text-xl font-bold mb-6">Radial Progress</h3>
                <AdvancedProgress
                  value={progressValue}
                  max={100}
                  label="Radial Display"
                  size="md"
                  variant="radial"
                  showAnimation={true}
                  color="warning"
                  showStats={true}
                />
              </div>
            </ParallaxSection>
          </div>

          {/* Progress Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Adjust Progress</h3>
                <span className="text-2xl font-bold text-amber-400">{progressValue}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                className="w-full h-3 bg-gray-800/50 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(245, 158, 11) 0%, rgb(245, 158, 11) ${progressValue}%, rgba(31, 41, 55, 0.5) ${progressValue}%, rgba(31, 41, 55, 0.5) 100%)`
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-32 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Interactive <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Destination Map</span>
            </h2>
            <p className="text-gray-400 text-xl">Explore destinations with zoom, pan, and click interactions</p>
          </motion.div>

          <ParallaxSection speed={0.2} direction="up" fade={true} scale={true}>
            <InteractiveMap 
              interactive={true}
              initialZoom={6}
              className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30"
            />
          </ParallaxSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Click on destination markers to view details, use zoom controls, and drag to pan around the map.
              Each destination shows real-time weather and travel information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Implement?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-10">
              These advanced UI components are now integrated into your Empire Tourism application.
              Check out the main pages to see them in action!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/" className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-amber-500/30">
                View Homepage
              </a>
              <a href="/planner" className="px-10 py-5 bg-gray-800 border border-gray-700 rounded-2xl text-white font-bold text-lg">
                Try Planner
              </a>
              <a href="/dashboard" className="px-10 py-5 bg-gray-800 border border-gray-700 rounded-2xl text-white font-bold text-lg">
                View Dashboard
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}