import { Politician, PopularityTrend, TimeRange } from '@/types';

export async function getPolitician(id: string): Promise<Politician> {
  const res = await fetch(`/api/politicians/${id}`);
  if (!res.ok) {
    throw new Error('Politician not found');
  }
  return res.json();
}

export async function getPopularityTrend(
  politicianId: string,
  timeRange: TimeRange
): Promise<PopularityTrend> {
  const res = await fetch(`/api/popularity/${politicianId}?timeRange=${timeRange}`);
  if (!res.ok) {
    throw new Error('Failed to fetch popularity data');
  }
  return res.json();
}
