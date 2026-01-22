import { mockVideos } from '@/lib/data/mock-data';
import { ArticlesGrid } from '@/components/content/ArticlesGrid';

interface PoliticianVideosProps {
  politicianId: string;
}

export function PoliticianVideos({ politicianId }: PoliticianVideosProps) {
  const relatedVideos = mockVideos
    .filter((video) => video.relatedPoliticians.includes(politicianId))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 6);

  if (relatedVideos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vidéos associées</h2>
        <p className="text-gray-600">Aucune vidéo trouvée pour ce politique.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Vidéos associées</h2>
      <ArticlesGrid items={relatedVideos} />
    </div>
  );
}
