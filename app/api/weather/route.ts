import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  
  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    
    if (data.cod !== 200) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }
    
    const temp = data.main.temp;
    const condition = data.weather[0].main.toLowerCase();
    
    let weatherType: 'sunny' | 'rainy' | 'cold' | 'hot';
    if (temp < 10) weatherType = 'cold';
    else if (temp > 30) weatherType = 'hot';
    else if (condition.includes('rain') || condition.includes('drizzle')) weatherType = 'rainy';
    else weatherType = 'sunny';
    
    return NextResponse.json({
      temperature: Math.round(temp),
      condition: data.weather[0].description,
      weatherType,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      city: data.name,
      country: data.sys.country
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}
