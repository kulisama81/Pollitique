import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockPoliticians } from '@/lib/data/mock-data';
import { PoliticianHeader } from '@/components/politician/PoliticianHeader';
import { PoliticianTrends } from '@/components/politician/PoliticianTrends';
import { PoliticianArticles } from '@/components/politician/PoliticianArticles';
import { PoliticianVideos } from '@/components/politician/PoliticianVideos';

interface PoliticianPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PoliticianPageProps): Promise<Metadata> {
  const politician = mockPoliticians.find((p) => p.id === params.id);

  if (!politician) {
    return {
      title: 'Politique non trouvé - Pollitique',
    };
  }

  return {
    title: `${politician.fullName} - Pollitique`,
    description: politician.biography || `Popularité et actualités de ${politician.fullName}`,
    openGraph: {
      images: [politician.imageUrl],
      title: `${politician.fullName} - Pollitique`,
      description: politician.biography || `Popularité et actualités de ${politician.fullName}`,
    },
  };
}

export default function PoliticianPage({ params }: PoliticianPageProps) {
  const politician = mockPoliticians.find((p) => p.id === params.id);

  if (!politician) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PoliticianHeader politician={politician} />

      <div className="mt-8">
        <PoliticianTrends politicianId={politician.id} politicianName={politician.fullName} />
      </div>

      <div className="mt-12">
        <PoliticianArticles politicianId={politician.id} />
      </div>

      <div className="mt-12">
        <PoliticianVideos politicianId={politician.id} />
      </div>
    </div>
  );
}
