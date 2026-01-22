'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Twitter } from 'lucide-react';
import { PoliticianListItem } from '@/types';
import { Badge } from '@/components/shared/UI/Badge';

interface PoliticiansTableProps {
  politicians: PoliticianListItem[];
}

export function PoliticiansTable({ politicians }: PoliticiansTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  if (!politicians || politicians.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        Aucun candidat disponible
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                Rang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Candidat
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Abonnés
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Évolution
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {politicians.map((politician, index) => {
              const isExpanded = expandedId === politician.id;
              const mentionsLast5 = politician.mentionsLast5Days ?? 0;
              const mentionsPrevious5 = politician.mentionsPrevious5Days ?? 0;
              const change = calculateChange(mentionsLast5, mentionsPrevious5);
              const isPositive = change > 0;
              const isNegative = change < 0;

              return (
                <tr
                  key={politician.id}
                  className={`hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-blue-50' : ''}`}
                >
                  <td colSpan={5} className="p-0">
                    <div>
                      {/* Collapsed Row */}
                      <div className="flex items-center">
                        <div className="px-4 py-3 w-16">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-1 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 flex-shrink-0">
                              <Image
                                src={politician.imageUrl}
                                alt={politician.fullName}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/politicians/${politician.id}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors block truncate"
                              >
                                {politician.fullName}
                              </Link>
                              {!isExpanded && (
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge text={politician.party} variant="party" party={politician.party} className="text-xs" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-3 text-right">
                          <div className="font-bold text-gray-900">
                            {mentionsLast5.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            vs {mentionsPrevious5.toLocaleString()}
                          </div>
                        </div>

                        <div className="px-4 py-3 text-right">
                          <div className={`inline-flex items-center gap-1 font-semibold ${
                            isPositive ? 'text-trend-up' : isNegative ? 'text-trend-down' : 'text-gray-500'
                          }`}>
                            {isPositive && <TrendingUp size={16} />}
                            {isNegative && <TrendingDown size={16} />}
                            <span>{change > 0 ? '+' : ''}{change}%</span>
                          </div>
                        </div>

                        <div className="px-4 py-3 w-12">
                          <button
                            onClick={() => toggleExpand(politician.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            aria-label={isExpanded ? 'Réduire' : 'Développer'}
                          >
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-gray-600" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 bg-blue-50/50 border-t border-blue-100">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                Informations
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Position:</span>{' '}
                                  <span className="font-medium text-gray-900">{politician.position}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Parti:</span>{' '}
                                  <Badge text={politician.party} variant="party" party={politician.party} />
                                </div>
                                {politician.twitterHandle && (
                                  <div className="flex items-center gap-1">
                                    <Twitter size={14} className="text-blue-400" />
                                    <a
                                      href={`https://twitter.com/${politician.twitterHandle}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                      @{politician.twitterHandle}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                Popularité
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Score:</span>{' '}
                                  <span className="font-bold text-xl text-gray-900">{politician.currentPopularity}</span>
                                  <span className="text-gray-500">/100</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Tendance:</span>{' '}
                                  <span className={`font-medium ${
                                    politician.popularityTrend === 'up' ? 'text-trend-up' :
                                    politician.popularityTrend === 'down' ? 'text-trend-down' :
                                    'text-gray-600'
                                  }`}>
                                    {politician.popularityTrend === 'up' ? '↑ En hausse' :
                                     politician.popularityTrend === 'down' ? '↓ En baisse' :
                                     '→ Stable'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                Actions
                              </h4>
                              <Link
                                href={`/politicians/${politician.id}`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                              >
                                Voir le profil complet
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
