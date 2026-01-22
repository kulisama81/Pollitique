export type VideoPlatform = 'youtube' | 'dailymotion' | 'other';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  platform: VideoPlatform;
  duration: string; // Format: "MM:SS" or "HH:MM:SS"
  publishedAt: Date;
  relatedPoliticians: string[]; // Politician IDs
}
