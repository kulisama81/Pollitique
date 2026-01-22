import { NextRequest, NextResponse } from 'next/server';
import { mockVideos } from '@/lib/data/mock-data';
import { PaginatedResponse, Video } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  const videos = [...mockVideos].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVideos = videos.slice(startIndex, endIndex);

  const response: PaginatedResponse<Video> = {
    data: paginatedVideos,
    page,
    pageSize,
    total: videos.length,
    totalPages: Math.ceil(videos.length / pageSize),
  };

  return NextResponse.json(response);
}
