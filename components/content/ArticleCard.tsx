'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';
import { Article } from '@/types';
import { Card } from '@/components/shared/UI/Card';
import { Badge } from '@/components/shared/UI/Badge';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card variant="elevated" className="group cursor-pointer h-full flex flex-col">
      <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {article.isFeatured && (
            <div className="absolute top-2 right-2">
              <Badge text="À la une" variant="default" className="bg-red-500 text-white" />
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <span className="font-medium">{article.source}</span>
            <span>•</span>
            <span>{format(article.publishedAt, 'd MMM yyyy', { locale: fr })}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} text={tag} variant="default" />
              ))}
            </div>
            <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </a>
    </Card>
  );
}
