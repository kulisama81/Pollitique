export interface TwitterMetrics {
  followers: number;
  followersChange24h: number;
  followersChange7d: number;
  tweetsCount: number;
  engagementRate: number; // 0-100
  mentionsCount: number;
  sentimentScore: number; // -100 to 100
}

export interface PopularityMetric {
  politicianId: string;
  date: Date;
  score: number; // 0-100
  twitterMetrics: TwitterMetrics;
}

export interface PopularityDataPoint {
  date: Date;
  score: number;
  twitterFollowers: number;
  engagementRate: number;
}

export type TimeRange = '24h' | '7d' | '30d' | '90d';

export interface PopularityTrend {
  politicianId: string;
  timeRange: TimeRange;
  dataPoints: PopularityDataPoint[];
}
