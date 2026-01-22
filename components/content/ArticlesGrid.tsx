import { Article, Video } from '@/types';
import { ArticleCard } from './ArticleCard';
import { VideoCard } from './VideoCard';

interface ArticlesGridProps {
  items: (Article | Video)[];
}

function isArticle(item: Article | Video): item is Article {
  return 'articleUrl' in item;
}

export function ArticlesGrid({ items }: ArticlesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        if (isArticle(item)) {
          return <ArticleCard key={item.id} article={item} />;
        } else {
          return <VideoCard key={item.id} video={item} />;
        }
      })}
    </div>
  );
}
