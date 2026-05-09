'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Wind, Droplets, Thermometer, Newspaper,
  Hotel, Star, ExternalLink, Loader2, Globe2, ArrowRight
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  city: string;
  country: string;
  weatherType: string;
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  image: string;
}

interface UnsplashPhoto {
  id: string;
  url: string;
  thumb: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
}

const genericDestinationPhotos: UnsplashPhoto[] = [
  {
    id: 'generic-1',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
    alt: 'Mountain destination landscape',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  },
  {
    id: 'generic-2',
    url: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80',
    alt: 'Travel route landscape',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  },
  {
    id: 'generic-3',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
    alt: 'Lake and mountains travel scene',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  },
];

const curatedDestinationPhotos: Record<string, UnsplashPhoto[]> = {
  munnar: [
    {
      id: 'munnar-tea-plantation',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Munnar_Tea_Plantation.jpg/1280px-Munnar_Tea_Plantation.jpg',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Munnar_Tea_Plantation.jpg/960px-Munnar_Tea_Plantation.jpg',
      alt: 'Munnar tea plantations near Kundala Dam',
      photographer: 'Raj',
      photographerUrl: 'https://commons.wikimedia.org/wiki/File:Munnar_Tea_Plantation.jpg',
    },
    {
      id: 'munnar-tea-estate',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tea_plantation_munnar.jpg/1280px-Tea_plantation_munnar.jpg',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tea_plantation_munnar.jpg/960px-Tea_plantation_munnar.jpg',
      alt: 'Tea plantation in Munnar, Kerala',
      photographer: 'Shino jacob koottanad',
      photographerUrl: 'https://commons.wikimedia.org/wiki/File:Tea_plantation_munnar.jpg',
    },
    {
      id: 'munnar-tea-trees',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Munnar_Tea_Plantation_and_Trees.jpg/1280px-Munnar_Tea_Plantation_and_Trees.jpg',
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Munnar_Tea_Plantation_and_Trees.jpg/960px-Munnar_Tea_Plantation_and_Trees.jpg',
      alt: 'Munnar tea plantation and trees',
      photographer: 'Kondephy',
      photographerUrl: 'https://commons.wikimedia.org/wiki/File:Munnar_Tea_Plantation_and_Trees.jpg',
    },
  ],
};

const hotelsByDestination: Record<string, { name: string; stars: number; price: number; type: string; image: string }[]> = {
  default: [
    { name: 'Grand Heritage Hotel', stars: 5, price: 4500, type: 'Luxury', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
    { name: 'Comfort Inn & Suites', stars: 3, price: 1800, type: 'Mid-range', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80' },
    { name: 'Budget Stay Express', stars: 2, price: 800, type: 'Budget', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
  ],
  munnar: [
    { name: 'Windermere Estate', stars: 5, price: 8500, type: 'Luxury', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
    { name: 'Tea Valley Resort', stars: 4, price: 4200, type: 'Premium', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80' },
    { name: 'Misty Mountain Lodge', stars: 3, price: 2200, type: 'Mid-range', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
  ],
  goa: [
    { name: 'Taj Exotica Resort', stars: 5, price: 12000, type: 'Luxury', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80' },
    { name: 'Baga Beach Resort', stars: 4, price: 5500, type: 'Premium', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80' },
    { name: 'Sea Shell Hostel', stars: 2, price: 900, type: 'Budget', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
  ],
};

const popularDestinations = [
  { name: 'Munnar', image: curatedDestinationPhotos.munnar[0].thumb },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
  { name: 'Ooty', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=80' },
  { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80' },
  { name: 'Andaman', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
  { name: 'Varanasi', image: 'https://images.unsplash.com/photo-1561361058-c24e01238a46?w=400&q=80' },
];

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [searched, setSearched] = useState('');
  const [error, setError] = useState('');

  const getHotels = (dest: string) => {
    const key = dest.toLowerCase();
    return hotelsByDestination[key] ?? hotelsByDestination.default;
  };

  const getCuratedPhotos = (destination: string) => {
    const key = destination.trim().toLowerCase();
    return curatedDestinationPhotos[key] ?? genericDestinationPhotos.map((photo) => ({
      ...photo,
      alt: destination,
    }));
  };

  const fetchUnsplashPhotos = async (destination: string): Promise<UnsplashPhoto[]> => {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    if (!accessKey || accessKey === 'your_unsplash_access_key') {
      return getCuratedPhotos(destination);
    }
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&per_page=6&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${accessKey}` } }
      );
      const data = await res.json();
      const results = (data.results ?? []).map((p: any) => ({
        id: p.id,
        url: p.urls.regular,
        thumb: p.urls.small,
        alt: p.alt_description ?? destination,
        photographer: p.user.name,
        photographerUrl: p.user.links.html,
      }));
      return results.length > 0 ? results : getCuratedPhotos(destination);
    } catch {
      return getCuratedPhotos(destination);
    }
  };

  const handleSearch = async (dest?: string) => {
    const searchTerm = dest ?? query;
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setNews([]);
    setPhotos([]);
    setSearched(searchTerm);

    try {
      const [weatherRes, newsRes, unsplashPhotos] = await Promise.all([
        fetch(`/api/weather?city=${encodeURIComponent(searchTerm)}`),
        fetch(`/api/news?city=${encodeURIComponent(searchTerm)}`),
        fetchUnsplashPhotos(searchTerm),
      ]);

      const weatherData = await weatherRes.json();
      const newsData = await newsRes.json();

      if (!weatherData.error) setWeather(weatherData);
      if (!newsData.error) setNews(newsData.articles ?? []);
      setPhotos(unsplashPhotos);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const weatherBg: Record<string, string> = {
    sunny: 'from-amber-500/20 to-orange-500/20',
    hot: 'from-red-500/20 to-orange-600/20',
    rainy: 'from-blue-500/20 to-cyan-500/20',
    cold: 'from-blue-400/20 to-indigo-500/20',
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
            <Globe2 className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Destination Explorer</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Explore <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Anywhere</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Search any destination to instantly get photos, live weather, latest news, and stay options.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search a destination... (e.g. Munnar, Paris, Bali)"
                  className="w-full pl-14 pr-6 py-5 bg-gray-900/80 border border-gray-700 rounded-2xl focus:outline-none focus:border-amber-500/50 text-lg text-gray-100 placeholder-gray-500 transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch()}
                disabled={loading}
                className="px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-bold text-lg disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                {loading ? 'Searching...' : 'Search'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Popular Destinations */}
      {!searched && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-300">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map((dest, i) => (
              <motion.button
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, scale: 1.03 }}
                onClick={() => { setQuery(dest.name); handleSearch(dest.name); }}
                className="relative rounded-2xl overflow-hidden h-32 group"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(event) => {
                    event.currentTarget.src = genericDestinationPhotos[0].thumb;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
                <div className="absolute bottom-3 left-0 right-0 text-center font-bold text-white text-sm">{dest.name}</div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-400">{error}</div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {searched && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-6 space-y-12"
          >
            {/* Destination Title */}
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-amber-400" />
              <h2 className="text-4xl font-bold">
                {searched.charAt(0).toUpperCase() + searched.slice(1)}
              </h2>
              {weather && (
                <span className="text-gray-400 text-xl">{weather.country}</span>
              )}
            </div>

            {/* Photos Grid */}
            {photos.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  📸 <span>Photos of {searched}</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo, i) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2 h-80' : 'h-40'}`}
                    >
                      <img
                        src={photo.thumb}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(event) => {
                          event.currentTarget.src = genericDestinationPhotos[0].thumb;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <a
                        href={photo.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 left-3 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        📷 {photo.photographer}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Weather */}
            {weather && (
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  🌤️ <span>Current Weather</span>
                </h3>
                <div className={`bg-gradient-to-br ${weatherBg[weather.weatherType] ?? 'from-gray-800/40 to-gray-900/40'} border border-gray-800 rounded-3xl p-8`}>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-2 flex items-center gap-6">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt={weather.condition}
                        className="w-24 h-24"
                      />
                      <div>
                        <div className="text-6xl font-bold text-white">{weather.temperature}°C</div>
                        <div className="text-gray-300 text-lg capitalize mt-1">{weather.condition}</div>
                        <div className="text-gray-400 text-sm mt-1">{weather.city}, {weather.country}</div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-900/40 rounded-xl p-4">
                        <Droplets className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-xs text-gray-500">Humidity</div>
                          <div className="font-bold text-white">{weather.humidity}%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-900/40 rounded-xl p-4">
                        <Wind className="w-5 h-5 text-cyan-400" />
                        <div>
                          <div className="text-xs text-gray-500">Wind Speed</div>
                          <div className="font-bold text-white">{weather.windSpeed} m/s</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-900/40 rounded-xl p-4">
                        <Thermometer className="w-5 h-5 text-amber-400" />
                        <div>
                          <div className="text-xs text-gray-500">Feels Like</div>
                          <div className="font-bold text-white">{weather.temperature}°C</div>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Condition</div>
                        <div className="font-bold text-white capitalize mt-1">{weather.weatherType}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Hotels / Stays */}
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Hotel className="w-6 h-6 text-amber-400" /> <span>Where to Stay</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {getHotels(searched).map((hotel, i) => (
                  <motion.div
                    key={hotel.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all"
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 font-medium">{hotel.type}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(hotel.stars)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-3">{hotel.name}</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-amber-400">₹{hotel.price.toLocaleString()}</span>
                          <span className="text-gray-500 text-sm">/night</span>
                        </div>
                        <a
                          href={`https://www.booking.com/search.html?ss=${encodeURIComponent(searched)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm hover:bg-amber-500/20 transition-colors"
                        >
                          Book <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* News */}
            {news.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-amber-400" /> <span>Latest News about {searched}</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {news.slice(0, 4).map((article, i) => (
                    <motion.a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all group"
                    >
                      {article.image && (
                        <img src={article.image} alt={article.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span className="text-amber-400 font-medium">{article.source}</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <h4 className="font-bold text-base mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">{article.title}</h4>
                        <p className="text-gray-400 text-sm line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-1 text-amber-400 text-sm mt-3">
                          Read more <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            )}

            {/* Book with Empire Tourism CTA */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-10 text-center"
              >
                <h3 className="text-3xl font-bold mb-3">
                  Want to visit <span className="text-amber-400">{searched.charAt(0).toUpperCase() + searched.slice(1)}</span>?
                </h3>
                <p className="text-gray-400 mb-8">Let Manoj Kumar and Empire Tourism plan the perfect trip for you.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/packages" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                    View Packages <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://wa.me/919999999999?text=Hi Manoj sir, I want to plan a trip to ${searched}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-green-600/20 border border-green-500/30 rounded-2xl text-green-400 font-bold hover:bg-green-600/30 transition-colors"
                  >
                    WhatsApp Manoj Kumar
                  </a>
                </div>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900/40 border border-gray-800 rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
