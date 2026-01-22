'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Politician } from '@/types';
import { PoliticiansTable } from './PoliticiansTable';
import { Skeleton } from '@/components/shared/UI/Skeleton';

export function LivePoliticiansTable() {
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [liveDataCount, setLiveDataCount] = useState(0);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/politicians/live');
      const data = await response.json();

      setPoliticians(data.politicians);
      setLastUpdated(data.updated);
      setLiveDataCount(data.liveDataCount);

      if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      console.error('Error fetching politicians:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatUpdateTime = (isoString: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          {liveDataCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600">
                {liveDataCount} candidats avec données en direct
              </span>
            </div>
          )}
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Mis à jour à {formatUpdateTime(lastUpdated)}
            </span>
          )}
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Actualiser
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          {error}
        </div>
      )}

      <PoliticiansTable politicians={politicians} />
    </div>
  );
}
