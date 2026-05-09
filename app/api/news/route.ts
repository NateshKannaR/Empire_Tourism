import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const query = searchParams.get('q');
  
  const searchTerm = city ? `${city} travel` : query ?? 'travel';

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&sortBy=publishedAt&pageSize=5&language=en&apiKey=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status !== 'ok') {
      return NextResponse.json({ error: 'News fetch failed' }, { status: 500 });
    }
    
    const articles = data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      image: article.urlToImage
    }));
    
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
