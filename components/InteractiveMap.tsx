'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, Star } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'beach' | 'mountain' | 'city' | 'heritage' | 'adventure';
  rating: number;
  description: string;
  image: string;
  temperature: number;
  bestSeason: string;
}

interface InteractiveMapProps {
  destinations?: Destination[];
  initialZoom?: number;
  initialCenter?: { lat: number; lng: number };
  interactive?: boolean;
  className?: string;
}

const defaultDestinations: Destination[] = [
  {
    id: 'munnar',
    name: 'Munnar',
    lat: 10.0889,
    lng: 77.0595,
    type: 'mountain',
    rating: 4.9,
    description: 'Tea gardens & misty hills',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    temperature: 18,
    bestSeason: 'Sep - Mar'
  },
  {
    id: 'goa',
    name: 'Goa',
    lat: 15.2993,
    lng: 74.1240,
    type: 'beach',
    rating: 4.8,
    description: 'Golden beaches & nightlife',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    temperature: 29,
    bestSeason: 'Nov - Feb'
  },
  {
    id: 'ooty',
    name: 'Ooty',
    lat: 11.4102,
    lng: 76.6950,
    type: 'mountain',
    rating: 4.7,
    description: 'Nilgiri hills & botanical gardens',
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
    temperature: 16,
    bestSeason: 'Oct - Jun'
  },
  {
    id: 'alleppey',
    name: 'Alleppey',
    lat: 9.4981,
    lng: 76.3388,
    type: 'beach',
    rating: 4.8,
    description: 'Backwaters & houseboats',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    temperature: 27,
    bestSeason: 'Aug - Mar'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    type: 'city',
    rating: 4.5,
    description: 'Marina beach & temples',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80',
    temperature: 32,
    bestSeason: 'Nov - Feb'
  },
  {
    id: 'mysore',
    name: 'Mysore',
    lat: 12.2958,
    lng: 76.6394,
    type: 'heritage',
    rating: 4.7,
    description: 'Palaces & silk sarees',
    image: 'https://images.unsplash.com/photo-1593693399746-69c4d72d6f6f?w=800&q=80',
    temperature: 26,
    bestSeason: 'Oct - Mar'
  },
  {
    id: 'coorg',
    name: 'Coorg',
    lat: 12.3375,
    lng: 75.8069,
    type: 'mountain',
    rating: 4.8,
    description: 'Coffee plantations & waterfalls',
    image: 'https://images.unsplash.com/photo-1593693399528-4c6c5c5b5b5f?w=800&q=80',
    temperature: 20,
    bestSeason: 'Oct - Mar'
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal',
    lat: 10.2381,
    lng: 77.4892,
    type: 'mountain',
    rating: 4.6,
    description: 'Princess of Hill Stations',
    image: 'https://images.unsplash.com/photo-1593693399528-4c6c5c5b5b5f?w=800&q=80',
    temperature: 15,
    bestSeason: 'Apr - Jun, Sep - Oct'
  }
];

const typeColors = {
  beach: 'bg-blue-500',
  mountain: 'bg-green-500',
  city: 'bg-purple-500',
  heritage: 'bg-amber-500',
  adventure: 'bg-red-500'
};

const typeIcons = {
  beach: '🏖️',
  mountain: '⛰️',
  city: '🏙️',
  heritage: '🏛️',
  adventure: '🧗'
};

export default function InteractiveMap({
  destinations = defaultDestinations,
  initialZoom = 6,
  initialCenter = { lat: 12.9716, lng: 77.5946 }, // Bangalore
  interactive = true,
  className = ''
}: InteractiveMapProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState(initialCenter);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 10));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 3));
  };

  const handleReset = () => {
    setZoom(initialZoom);
    setCenter(initialCenter);
    setSelectedDestination(null);
  };

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setCenter({ lat: destination.lat, lng: destination.lng });
    setZoom(8);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !interactive) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setCenter(prev => ({
      lat: prev.lat - deltaY * 0.01,
      lng: prev.lng + deltaX * 0.01
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate marker positions based on zoom and center
  const calculateMarkerPosition = (dest: Destination) => {
    const scale = Math.pow(2, zoom - initialZoom);
    const x = (dest.lng - center.lng) * 100 * scale + 50;
    const y = (center.lat - dest.lat) * 100 * scale + 50;
    
    return {
      x: `${Math.max(0, Math.min(100, x))}%`,
      y: `${Math.max(0, Math.min(100, y))}%`,
      scale: Math.min(1, scale * 0.5)
    };
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden ${className}`}>
      {/* Map container */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Map background with grid */}
        <div className="absolute inset-0">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: `${40 / zoom}px ${40 / zoom}px`
            }}
          />
          
          {/* Water areas */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/5 to-cyan-900/10" />
          
          {/* Land areas */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/30 via-gray-900/20 to-gray-800/30" />
          
          {/* Mountain ranges */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-gradient-to-b from-gray-700/20 to-transparent rounded-full blur-lg" />
          <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/4 bg-gradient-to-t from-gray-700/20 to-transparent rounded-full blur-lg" />
        </div>

        {/* Destination markers */}
        {destinations.map((destination) => {
          const position = calculateMarkerPosition(destination);
          const isSelected = selectedDestination?.id === destination.id;
          
          return (
            <motion.button
              key={destination.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none group"
              style={{
                left: position.x,
                top: position.y,
                scale: position.scale
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDestinationClick(destination)}
            >
              {/* Pulsing ring */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-amber-400/50"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              {/* Marker */}
              <div className={`relative rounded-full p-2 ${
                typeColors[destination.type]
              } ${isSelected ? 'ring-4 ring-amber-400/30' : ''}`}>
                <div className="text-white text-lg">
                  {typeIcons[destination.type]}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 whitespace-nowrap border border-gray-700">
                    <div className="font-semibold text-white">{destination.name}</div>
                    <div className="text-xs text-gray-300">{destination.description}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-amber-400">{destination.rating}</span>
                      <span className="text-xs text-gray-400 ml-2">{destination.temperature}°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Current center indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full bg-amber-400/30 border border-amber-400/50" />
          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping" />
        </motion.div>

        {/* Zoom level indicator */}
        <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2">
          <div className="text-xs text-gray-400">Zoom: {zoom}x</div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {interactive && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomIn}
              className="glass rounded-xl p-3 hover:glass-strong transition-all"
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomOut}
              className="glass rounded-xl p-3 hover:glass-strong transition-all"
            >
              <ZoomOut className="w-5 h-5 text-white" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className="glass rounded-xl p-3 hover:glass-strong transition-all"
            >
              <Compass className="w-5 h-5 text-white" />
            </motion.button>
          </>
        )}
      </div>

      {/* Selected destination details */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4"
          >
            <div className="glass-strong rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{selectedDestination.name}</h3>
                    <button
                      onClick={() => setSelectedDestination(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg">{typeIcons[selectedDestination.type]}</span>
                    <span className="text-gray-400">{selectedDestination.description}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-amber-400 font-semibold">{selectedDestination.rating}</span>
                    </div>
                    <div className="text-gray-300">
                      🌡️ {selectedDestination.temperature}°C
                    </div>
                    <div className="text-gray-300">
                      📅 Best: {selectedDestination.bestSeason}
                    </div>
                  </div>
                  <div className="mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold"
                    >
                      Plan Trip to {selectedDestination.name}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 left-4 glass rounded-2xl p-4 backdrop-blur-xl">
        <div className="text-sm font-semibold mb-2">Destination Types</div>
        <div className="space-y-2">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-xs text-gray-300 capitalize">{type}</span>
              <span className="text-xs">{typeIcons[type as keyof typeof typeIcons]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}