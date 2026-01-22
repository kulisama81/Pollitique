import { PoliticianListItem } from '@/types';
import { PoliticianCard } from './PoliticianCard';

interface PoliticiansListProps {
  politicians: PoliticianListItem[];
}

export function PoliticiansList({ politicians }: PoliticiansListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {politicians.map((politician, index) => (
        <PoliticianCard
          key={politician.id}
          politician={politician}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
