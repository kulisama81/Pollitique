import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Article } from '@/types';
import { Card } from '@/components/shared/UI/Card';
import { Badge } from '@/components/shared/UI/Badge';

interface SidebarProps {
  featuredArticles: Article[];
}

export function Sidebar({ featuredArticles }: SidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">À la une</h2>
        <div className="space-y-4">
          {featuredArticles.map((article) => (
            <Card key={article.id} variant="outlined" className="hover:shadow-md transition-shadow">
              <a href={article.articleUrl} target="_blank" rel="noopener noreferrer">
                <div className="relative h-32 w-full">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    <span className="font-medium">{article.source}</span>
                    <span>•</span>
                    <span>{format(article.publishedAt, 'd MMM', { locale: fr })}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                    {article.title}
                  </h3>
                  {article.tags.length > 0 && (
                    <div className="mt-2">
                      <Badge text={article.tags[0]} variant="default" className="text-xs" />
                    </div>
                  )}
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
