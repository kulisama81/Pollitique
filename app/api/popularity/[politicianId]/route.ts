import { NextRequest, NextResponse } from 'next/server';
import { generatePopularityData } from '@/lib/data/mock-data';
import { TimeRange, PopularityTrend } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { politicianId: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const timeRange = (searchParams.get('timeRange') || '7d') as TimeRange;

  const dataPoints = generatePopularityData(params.politicianId, timeRange);

  const response: PopularityTrend = {
    politicianId: params.politicianId,
    timeRange,
    dataPoints,
  };

  return NextResponse.json(response);
}
