import { mockArticles } from '@/lib/data/mock-data';
import { ArticlesGrid } from '@/components/content/ArticlesGrid';

interface PoliticianArticlesProps {
  politicianId: string;
}

export function PoliticianArticles({ politicianId }: PoliticianArticlesProps) {
  const relatedArticles = mockArticles
    .filter((article) => article.relatedPoliticians.includes(politicianId))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 6);

  if (relatedArticles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Articles associés</h2>
        <p className="text-gray-600">Aucun article trouvé pour ce politique.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles associés</h2>
      <ArticlesGrid items={relatedArticles} />
    </div>
  );
}
