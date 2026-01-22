import Link from 'next/link';
import { mockPoliticians } from '@/lib/data/mock-data';
import { PoliticianCard } from '@/components/data/PoliticianCard';

export default function NotFound() {
  const popularPoliticians = [...mockPoliticians]
    .sort((a, b) => b.currentPopularity - a.currentPopularity)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Politique non trouvé
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Le politique que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Politiques populaires
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPoliticians.map((politician) => (
            <PoliticianCard key={politician.id} politician={politician} />
          ))}
        </div>
      </div>
    </div>
  );
}
