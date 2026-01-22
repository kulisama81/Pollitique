'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, TrendingDown, Minus, Twitter } from 'lucide-react';
import { PoliticianListItem } from '@/types';
import { Card } from '@/components/shared/UI/Card';
import { Badge } from '@/components/shared/UI/Badge';

interface PoliticianCardProps {
  politician: PoliticianListItem;
  rank?: number;
}

export function PoliticianCard({ politician, rank }: PoliticianCardProps) {
  const getTrendIcon = () => {
    switch (politician.popularityTrend) {
      case 'up':
        return <TrendingUp size={20} className="text-trend-up" />;
      case 'down':
        return <TrendingDown size={20} className="text-trend-down" />;
      default:
        return <Minus size={20} className="text-trend-stable" />;
    }
  };

  const estimatedFollowers = Math.floor(politician.currentPopularity * 10000);
  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <Link href={`/politicians/${politician.id}`}>
      <Card variant="elevated" className="group cursor-pointer h-full hover:shadow-xl transition-all relative">
        {rank && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10">
            {rank}
          </div>
        )}

        <div className="p-4 flex flex-col items-center text-center space-y-3">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-200 group-hover:ring-blue-500 transition-all">
            <Image
              src={politician.imageUrl}
              alt={politician.fullName}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          <div className="flex-1 w-full">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {politician.fullName}
            </h3>

            <div className="mt-2 flex justify-center">
              <Badge text={politician.party} variant="party" party={politician.party} />
            </div>

            <p className="text-xs text-gray-500 mt-2 line-clamp-1">{politician.position}</p>
          </div>

          <div className="w-full pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Twitter size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-gray-700">
                {formatFollowers(estimatedFollowers)} abonnés
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg py-2">
              <span className="text-xs text-gray-500">Score:</span>
              <span className="text-2xl font-bold text-gray-900">{politician.currentPopularity}</span>
              {getTrendIcon()}
            </div>

            {politician.twitterHandle && (
              <p className="text-xs text-blue-500 hover:text-blue-600">
                @{politician.twitterHandle}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
