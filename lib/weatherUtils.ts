import { WeatherType } from './types';

export async function fetchWeatherData(city: string, apiKey: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) throw new Error('Weather fetch failed');
  
  return response.json();
}

export function mapWeatherCondition(apiCondition: string, temp: number): WeatherType {
  const condition = apiCondition.toLowerCase();
  
  if (condition.includes('rain') || condition.includes('drizzle')) {
    return 'rainy';
  }
  
  if (condition.includes('snow') || temp < 10) {
    return 'cold';
  }
  
  if (temp > 30) {
    return 'hot';
  }
  
  if (condition.includes('clear') || condition.includes('cloud')) {
    return 'sunny';
  }
  
  return 'sunny';
}
