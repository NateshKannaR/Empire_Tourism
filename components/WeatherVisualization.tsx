'use client';

import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Snowflake, Thermometer, Wind, Droplets } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
}

interface WeatherVisualizationProps {
  weatherData: WeatherData;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export default function WeatherVisualization({ 
  weatherData, 
  size = 'md',
  interactive = true 
}: WeatherVisualizationProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96'
  };

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain')) return CloudRain;
    if (lowerCondition.includes('snow')) return Snowflake;
    if (lowerCondition.includes('cloud')) return Cloud;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(weatherData.condition);

  const temperatureColor = weatherData.temperature > 30 
    ? 'text-orange-400' 
    : weatherData.temperature < 10 
      ? 'text-blue-400' 
      : 'text-amber-400';

  const humidityColor = weatherData.humidity > 80 
    ? 'text-blue-400' 
    : weatherData.humidity < 30 
      ? 'text-orange-400' 
      : 'text-emerald-400';

  const windColor = weatherData.windSpeed > 20 
    ? 'text-purple-400' 
    : 'text-cyan-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative ${sizeClasses[size]} rounded-3xl overflow-hidden`}
    >
      {/* Background gradient based on temperature */}
      <motion.div
        animate={{
          background: weatherData.temperature > 30 
            ? 'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.2), rgba(3,7,18,0.8) 70%)'
            : weatherData.temperature < 10
              ? 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.2), rgba(3,7,18,0.8) 70%)'
              : 'radial-gradient(circle at 30% 30%, rgba(245,158,11,0.2), rgba(3,7,18,0.8) 70%)'
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      />

      {/* Animated particles for wind */}
      {weatherData.windSpeed > 5 && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Rain effect for rainy conditions */}
      {weatherData.condition.toLowerCase().includes('rain') && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
              style={{
                left: `${(i * 3) % 100}%`,
                height: '20px',
              }}
              animate={{
                y: ['-20px', '100%'],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Snow effect for snowy conditions */}
      {weatherData.condition.toLowerCase().includes('snow') && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/40"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ['-10px', '100%'],
                x: [0, Math.random() * 20 - 10],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Temperature display */}
        <motion.div
          key={weatherData.temperature}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className={`text-6xl font-bold ${temperatureColor} mb-2`}>
            {Math.round(weatherData.temperature)}°
          </div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            {weatherData.condition}
          </div>
        </motion.div>

        {/* Weather icon */}
        <motion.div
          animate={{
            rotate: weatherData.windSpeed > 10 ? [0, 360] : 0,
            scale: weatherData.temperature > 30 ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: weatherData.windSpeed > 10 
              ? { duration: 20, repeat: Infinity, ease: 'linear' }
              : { duration: 0 },
            scale: weatherData.temperature > 30 
              ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0 }
          }}
          className="flex justify-center"
        >
          <WeatherIcon className={`w-16 h-16 ${
            weatherData.condition.toLowerCase().includes('rain') 
              ? 'text-blue-400' 
              : weatherData.condition.toLowerCase().includes('snow')
                ? 'text-cyan-300'
                : weatherData.condition.toLowerCase().includes('cloud')
                  ? 'text-gray-300'
                  : 'text-amber-400'
          }`} />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-1">
              <Thermometer className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-400">Feels like</div>
            <div className={`text-sm font-semibold ${temperatureColor}`}>
              {Math.round(weatherData.feelsLike)}°
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="flex justify-center mb-1">
              <Droplets className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-400">Humidity</div>
            <div className={`text-sm font-semibold ${humidityColor}`}>
              {weatherData.humidity}%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="flex justify-center mb-1">
              <Wind className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-400">Wind</div>
            <div className={`text-sm font-semibold ${windColor}`}>
              {weatherData.windSpeed} km/h
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive hover effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 rounded-3xl border border-white/5"
          whileHover={{ borderColor: 'rgba(255,255,255,0.1)' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}