import { NextRequest, NextResponse } from 'next/server';
import { mockPoliticians } from '@/lib/data/mock-data';
import { getTwitterMetrics } from '@/lib/api/twitter';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const politician = mockPoliticians.find((p) => p.id === params.id);

  if (!politician) {
    return NextResponse.json({ error: 'Politician not found' }, { status: 404 });
  }

  if (politician.id === 'macron' && politician.twitterHandle) {
    try {
      const twitterMetrics = await getTwitterMetrics(politician.twitterHandle);
      const updatedPolitician = {
        ...politician,
        currentPopularity: Math.min(100, Math.floor(twitterMetrics.followers / 100000)),
      };
      return NextResponse.json(updatedPolitician);
    } catch (error) {
      console.error('Failed to fetch Twitter data, using mock data:', error);
    }
  }

  return NextResponse.json(politician);
}
