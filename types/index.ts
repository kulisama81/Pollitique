export type { PoliticalParty, PopularityTrend as PopularityTrendType, Politician, PoliticianListItem } from './politician';
export type { Article } from './article';
export type { Video, VideoPlatform } from './video';
export type { TwitterMetrics, PopularityMetric, PopularityDataPoint, TimeRange, PopularityTrend } from './popularity';

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
