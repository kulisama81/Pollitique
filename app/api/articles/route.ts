import { NextRequest, NextResponse } from 'next/server';
import { mockArticles } from '@/lib/data/mock-data';
import { PaginatedResponse, Article } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const featured = searchParams.get('featured') === 'true';

  let articles = [...mockArticles];

  if (featured) {
    articles = articles.filter((a) => a.isFeatured);
  }

  articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  const response: PaginatedResponse<Article> = {
    data: paginatedArticles,
    page,
    pageSize,
    total: articles.length,
    totalPages: Math.ceil(articles.length / pageSize),
  };

  return NextResponse.json(response);
}
