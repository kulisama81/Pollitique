import Image from 'next/image';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Politician } from '@/types';
import { Badge } from '@/components/shared/UI/Badge';

interface PoliticianHeaderProps {
  politician: Politician;
}

export function PoliticianHeader({ politician }: PoliticianHeaderProps) {
  const getTrendIcon = () => {
    switch (politician.popularityTrend) {
      case 'up':
        return <TrendingUp size={24} className="text-trend-up" />;
      case 'down':
        return <TrendingDown size={24} className="text-trend-down" />;
      default:
        return <Minus size={24} className="text-trend-stable" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32" />
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-16">
          <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white bg-white flex-shrink-0">
            <Image
              src={politician.imageUrl}
              alt={politician.fullName}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>

          <div className="flex-1 mt-16 md:mt-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {politician.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge text={politician.party} variant="party" party={politician.party} />
                  <span className="text-gray-600">{politician.position}</span>
                </div>
                {politician.biography && (
                  <p className="text-gray-700 max-w-3xl">{politician.biography}</p>
                )}
              </div>

              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Popularité</div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {politician.currentPopularity}
                      </span>
                      {getTrendIcon()}
                    </div>
                  </div>
                </div>

                {politician.twitterHandle && (
                  <a
                    href={`https://twitter.com/${politician.twitterHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>@{politician.twitterHandle}</span>
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
