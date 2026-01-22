export interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  source: string;
  publishedAt: Date;
  articleUrl: string;
  relatedPoliticians: string[]; // Politician IDs
  tags: string[];
  isFeatured: boolean;
}
