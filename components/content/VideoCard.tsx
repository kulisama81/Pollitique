'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Play, ExternalLink } from 'lucide-react';
import { Video } from '@/types';
import { Card } from '@/components/shared/UI/Card';
import { Badge } from '@/components/shared/UI/Badge';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card variant="elevated" className="group cursor-pointer h-full flex flex-col">
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={24} className="text-blue-600 ml-1" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2">
            <Badge text={video.duration} variant="default" className="bg-black/70 text-white" />
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span className="capitalize">{video.platform}</span>
            <span>•</span>
            <span>{format(video.publishedAt, 'd MMM yyyy', { locale: fr })}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {video.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {video.description}
          </p>

          <div className="flex items-center justify-end">
            <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </a>
    </Card>
  );
}
