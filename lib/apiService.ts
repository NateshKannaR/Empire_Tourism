// Weather API Service (using OpenWeatherMap)
export async function getWeatherData(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    
    if (data.cod !== 200) throw new Error('City not found');
    
    const temp = data.main.temp;
    const condition = data.weather[0].main.toLowerCase();
    
    // Map weather conditions to our app's weather types
    let weatherType: 'sunny' | 'rainy' | 'cold' | 'hot';
    if (temp < 10) weatherType = 'cold';
    else if (temp > 30) weatherType = 'hot';
    else if (condition.includes('rain') || condition.includes('drizzle')) weatherType = 'rainy';
    else weatherType = 'sunny';
    
    return {
      temperature: Math.round(temp),
      condition: data.weather[0].description,
      weatherType,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
}

// News API Service
export async function getCityNews(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${city}+travel&sortBy=publishedAt&pageSize=5&language=en&apiKey=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status !== 'ok') throw new Error('News fetch failed');
    
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      image: article.urlToImage
    }));
  } catch (error) {
    console.error('News API error:', error);
    return [];
  }
}
