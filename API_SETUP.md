# API Integration Setup Guide

## Weather API Setup (OpenWeatherMap)

1. **Sign up for free API key:**
   - Go to https://openweathermap.org/api
   - Create a free account
   - Get your API key from the dashboard

2. **Add to .env.local:**
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key_here
   ```

## News API (Already Configured)

Your News API key is already added:
```
NEXT_PUBLIC_NEWS_API_KEY=c4f57becd49f43709df8d94f26c3a703
```

## How It Works

### Auto Weather Detection
- When you enter a city name in the planner
- The app automatically fetches real-time weather
- Weather type is auto-selected based on temperature and conditions
- Shows current temperature, humidity, and conditions

### City News Recommendations
- Fetches latest travel-related news for your destination
- Shows top 4 articles with images
- Displays source and publication date
- Click to read full articles

## Features Added

✅ Real-time weather data from OpenWeatherMap
✅ Auto-detect weather type (sunny/rainy/cold/hot)
✅ Display current temperature and conditions
✅ Fetch travel news for destination city
✅ Show news articles with images
✅ Clickable news cards to read more

## Usage

1. Enter a city name in the "Destination" field
2. Click outside the input or press Tab
3. Weather data loads automatically
4. News articles appear below the trip preview
5. Weather type is auto-selected (you can still change it manually)

## API Limits

- **OpenWeatherMap Free:** 1,000 calls/day
- **News API Free:** 100 requests/day

Both are sufficient for development and moderate usage!

## Backend (Supabase)

This project uses Supabase as the primary backend for trips and packing lists.

### Required environment variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional (recommended) server key

```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The service role key is used by `/api/trips` and `/api/packing-lists` to perform
server-side inserts and updates.
