import { Politician, Article, Video, PopularityDataPoint } from '@/types';

// Top 20 French Presidential Candidates
export const mockPoliticians: Politician[] = [
  {
    id: 'macron',
    fullName: 'Emmanuel Macron',
    party: 'LREM',
    position: 'Président de la République',
    imageUrl: 'https://picsum.photos/seed/macron/400/400',
    twitterHandle: 'EmmanuelMacron',
    biography: 'Président de la République française depuis 2017.',
    currentPopularity: 89,
    popularityTrend: 'stable',
    mentionsLast5Days: 8944,
    mentionsPrevious5Days: 8718,
  },
  {
    id: 'lepen',
    fullName: 'Marine Le Pen',
    party: 'RN',
    position: 'Candidate RN',
    imageUrl: 'https://picsum.photos/seed/lepen/400/400',
    twitterHandle: 'MLP_officiel',
    biography: 'Présidente du Rassemblement National, candidate à la présidentielle.',
    currentPopularity: 85,
    popularityTrend: 'up',
    mentionsLast5Days: 8942,
    mentionsPrevious5Days: 6259,
  },
  {
    id: 'bardella',
    fullName: 'Jordan Bardella',
    party: 'RN',
    position: 'Président du RN',
    imageUrl: 'https://picsum.photos/seed/bardella/400/400',
    twitterHandle: 'J_Bardella',
    biography: 'Président du Rassemblement National.',
    currentPopularity: 82,
    popularityTrend: 'up',
    mentionsLast5Days: 8352,
    mentionsPrevious5Days: 5846,
  },
  {
    id: 'melenchon',
    fullName: 'Jean-Luc Mélenchon',
    party: 'LFI',
    position: 'Fondateur LFI',
    imageUrl: 'https://picsum.photos/seed/melenchon/400/400',
    twitterHandle: 'JLMelenchon',
    biography: 'Fondateur de La France Insoumise.',
    currentPopularity: 78,
    popularityTrend: 'stable',
    mentionsLast5Days: 7986,
    mentionsPrevious5Days: 8185,
  },
  {
    id: 'philippe',
    fullName: 'Édouard Philippe',
    party: 'Other',
    position: 'Maire du Havre',
    imageUrl: 'https://picsum.photos/seed/philippe/400/400',
    twitterHandle: 'EPhilippe_LH',
    biography: 'Ancien Premier ministre, maire du Havre.',
    currentPopularity: 76,
    popularityTrend: 'up',
    mentionsLast5Days: 7900,
    mentionsPrevious5Days: 5530,
  },
  {
    id: 'bertrand',
    fullName: 'Xavier Bertrand',
    party: 'LR',
    position: 'Président Hauts-de-France',
    imageUrl: 'https://picsum.photos/seed/bertrand/400/400',
    twitterHandle: 'xavierbertrand',
    biography: 'Président de la région Hauts-de-France.',
    currentPopularity: 73,
    popularityTrend: 'stable',
    mentionsLast5Days: 7327,
    mentionsPrevious5Days: 6854,
  },
  {
    id: 'pecresse',
    fullName: 'Valérie Pécresse',
    party: 'LR',
    position: 'Présidente Île-de-France',
    imageUrl: 'https://picsum.photos/seed/pecresse/400/400',
    twitterHandle: 'vpecresse',
    biography: 'Présidente de la région Île-de-France.',
    currentPopularity: 71,
    popularityTrend: 'down',
    mentionsLast5Days: 7506,
    mentionsPrevious5Days: 9757,
  },
  {
    id: 'wauquiez',
    fullName: 'Laurent Wauquiez',
    party: 'LR',
    position: 'Président Auvergne-Rhône-Alpes',
    imageUrl: 'https://picsum.photos/seed/wauquiez/400/400',
    twitterHandle: 'laurentwauquiez',
    biography: 'Président de la région Auvergne-Rhône-Alpes.',
    currentPopularity: 70,
    popularityTrend: 'up',
    mentionsLast5Days: 7045,
    mentionsPrevious5Days: 4931,
  },
  {
    id: 'glucksmann',
    fullName: 'Raphaël Glucksmann',
    party: 'PS',
    position: 'Député européen',
    imageUrl: 'https://picsum.photos/seed/glucksmann/400/400',
    twitterHandle: 'rglucks1',
    biography: 'Député européen, Place Publique.',
    currentPopularity: 68,
    popularityTrend: 'up',
    mentionsLast5Days: 7084,
    mentionsPrevious5Days: 4958,
  },
  {
    id: 'retailleau',
    fullName: 'Bruno Retailleau',
    party: 'LR',
    position: 'Président groupe LR Sénat',
    imageUrl: 'https://picsum.photos/seed/retailleau/400/400',
    twitterHandle: 'BrunoRetailleau',
    biography: 'Président du groupe LR au Sénat.',
    currentPopularity: 67,
    popularityTrend: 'stable',
    mentionsLast5Days: 6719,
    mentionsPrevious5Days: 6516,
  },
  {
    id: 'attal',
    fullName: 'Gabriel Attal',
    party: 'LREM',
    position: 'Premier ministre',
    imageUrl: 'https://picsum.photos/seed/attal/400/400',
    twitterHandle: 'GabrielAttal',
    biography: 'Premier ministre, figure montante de Renaissance.',
    currentPopularity: 72,
    popularityTrend: 'up',
    mentionsLast5Days: 7634,
    mentionsPrevious5Days: 5343,
  },
  {
    id: 'zemmour',
    fullName: 'Éric Zemmour',
    party: 'Other',
    position: 'Président Reconquête',
    imageUrl: 'https://picsum.photos/seed/zemmour/400/400',
    twitterHandle: 'ZemmourEric',
    biography: 'Président du parti Reconquête.',
    currentPopularity: 65,
    popularityTrend: 'down',
    mentionsLast5Days: 6518,
    mentionsPrevious5Days: 8473,
  },
  {
    id: 'faure',
    fullName: 'Olivier Faure',
    party: 'PS',
    position: 'Premier secrétaire PS',
    imageUrl: 'https://picsum.photos/seed/faure/400/400',
    twitterHandle: 'faureolivier',
    biography: 'Premier secrétaire du Parti socialiste.',
    currentPopularity: 64,
    popularityTrend: 'stable',
    mentionsLast5Days: 6754,
    mentionsPrevious5Days: 6550,
  },
  {
    id: 'jadot',
    fullName: 'Yannick Jadot',
    party: 'EELV',
    position: 'Député européen EELV',
    imageUrl: 'https://picsum.photos/seed/jadot/400/400',
    twitterHandle: 'yjadot',
    biography: 'Député européen écologiste.',
    currentPopularity: 63,
    popularityTrend: 'stable',
    mentionsLast5Days: 6488,
    mentionsPrevious5Days: 6291,
  },
  {
    id: 'tondelier',
    fullName: 'Marine Tondelier',
    party: 'EELV',
    position: 'Secrétaire nationale EELV',
    imageUrl: 'https://picsum.photos/seed/tondelier/400/400',
    twitterHandle: 'marinetondelier',
    biography: 'Secrétaire nationale d\'Europe Écologie Les Verts.',
    currentPopularity: 62,
    popularityTrend: 'up',
    mentionsLast5Days: 6458,
    mentionsPrevious5Days: 5012,
  },
  {
    id: 'roussel',
    fullName: 'Fabien Roussel',
    party: 'PCF',
    position: 'Secrétaire national PCF',
    imageUrl: 'https://picsum.photos/seed/roussel/400/400',
    twitterHandle: 'Fabien_Roussel',
    biography: 'Secrétaire national du Parti communiste français.',
    currentPopularity: 60,
    popularityTrend: 'stable',
    mentionsLast5Days: 6023,
    mentionsPrevious5Days: 6255,
  },
  {
    id: 'ruffin',
    fullName: 'François Ruffin',
    party: 'LFI',
    position: 'Député LFI',
    imageUrl: 'https://picsum.photos/seed/ruffin/400/400',
    twitterHandle: 'Francois_Ruffin',
    biography: 'Député La France Insoumise de la Somme.',
    currentPopularity: 66,
    popularityTrend: 'up',
    mentionsLast5Days: 6891,
    mentionsPrevious5Days: 4823,
  },
  {
    id: 'dupont-aignan',
    fullName: 'Nicolas Dupont-Aignan',
    party: 'Other',
    position: 'Président Debout la France',
    imageUrl: 'https://picsum.photos/seed/dupont/400/400',
    twitterHandle: 'dupontaignan',
    biography: 'Président de Debout la France.',
    currentPopularity: 58,
    popularityTrend: 'down',
    mentionsLast5Days: 5959,
    mentionsPrevious5Days: 7746,
  },
  {
    id: 'panot',
    fullName: 'Mathilde Panot',
    party: 'LFI',
    position: 'Présidente groupe LFI',
    imageUrl: 'https://picsum.photos/seed/panot/400/400',
    twitterHandle: 'MathildePanot',
    biography: 'Présidente du groupe LFI à l\'Assemblée nationale.',
    currentPopularity: 61,
    popularityTrend: 'stable',
    mentionsLast5Days: 6324,
    mentionsPrevious5Days: 6489,
  },
  {
    id: 'baroin',
    fullName: 'François Baroin',
    party: 'LR',
    position: 'Maire de Troyes',
    imageUrl: 'https://picsum.photos/seed/baroin/400/400',
    twitterHandle: 'francoisbaroin',
    biography: 'Maire de Troyes, figure des Républicains.',
    currentPopularity: 69,
    popularityTrend: 'stable',
    mentionsLast5Days: 6932,
    mentionsPrevious5Days: 7043,
  },
  {
    id: 'lisnard',
    fullName: 'David Lisnard',
    party: 'LR',
    position: 'Maire de Cannes',
    imageUrl: 'https://picsum.photos/seed/lisnard/400/400',
    twitterHandle: 'davidlisnard',
    biography: 'Maire de Cannes, vice-président de l\'AMF.',
    currentPopularity: 67,
    popularityTrend: 'up',
    mentionsLast5Days: 6789,
    mentionsPrevious5Days: 5123,
  },
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: 'art1',
    title: 'Macron annonce une nouvelle réforme des retraites',
    excerpt: 'Le président de la République a présenté les grandes lignes de la réforme lors d\'une conférence de presse à l\'Élysée.',
    imageUrl: 'https://picsum.photos/seed/art1/800/600',
    source: 'Le Monde',
    publishedAt: new Date('2026-01-20'),
    articleUrl: 'https://lemonde.fr/article-exemple',
    relatedPoliticians: ['macron', 'attal'],
    tags: ['réforme', 'retraites', 'économie'],
    isFeatured: true,
  },
  {
    id: 'art2',
    title: 'Marine Le Pen face à la justice : le procès s\'ouvre',
    excerpt: 'La présidente du RN comparaît devant le tribunal pour des faits présumés de détournement de fonds publics.',
    imageUrl: 'https://picsum.photos/seed/art2/800/600',
    source: 'Le Figaro',
    publishedAt: new Date('2026-01-19'),
    articleUrl: 'https://lefigaro.fr/article-exemple',
    relatedPoliticians: ['lepen', 'bardella'],
    tags: ['justice', 'RN', 'procès'],
    isFeatured: true,
  },
];

// Mock Videos
export const mockVideos: Video[] = [
  {
    id: 'vid1',
    title: 'Emmanuel Macron : Discours sur la réforme des retraites',
    description: 'Le président explique les raisons et les objectifs de la réforme.',
    thumbnailUrl: 'https://picsum.photos/seed/vid1/800/600',
    videoUrl: 'https://youtube.com/watch?v=example1',
    platform: 'youtube',
    duration: '15:32',
    publishedAt: new Date('2026-01-20'),
    relatedPoliticians: ['macron'],
  },
];

// Helper function to generate popularity trend data
export function generatePopularityData(
  politicianId: string,
  timeRange: '24h' | '7d' | '30d' | '90d'
): PopularityDataPoint[] {
  const now = new Date();
  const dataPoints: PopularityDataPoint[] = [];

  let intervals: number;
  let intervalMs: number;

  switch (timeRange) {
    case '24h':
      intervals = 24;
      intervalMs = 60 * 60 * 1000;
      break;
    case '7d':
      intervals = 14;
      intervalMs = 12 * 60 * 60 * 1000;
      break;
    case '30d':
      intervals = 30;
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    case '90d':
      intervals = 45;
      intervalMs = 2 * 24 * 60 * 60 * 1000;
      break;
  }

  const politician = mockPoliticians.find(p => p.id === politicianId);
  const basePopularity = politician?.currentPopularity || 50;
  const baseTrend = politician?.popularityTrend || 'stable';

  for (let i = intervals; i >= 0; i--) {
    const date = new Date(now.getTime() - i * intervalMs);

    const randomVariation = (Math.random() - 0.5) * 10;
    let trendAdjustment = 0;

    if (baseTrend === 'up') {
      trendAdjustment = (intervals - i) * 0.3;
    } else if (baseTrend === 'down') {
      trendAdjustment = -(intervals - i) * 0.3;
    }

    const score = Math.max(0, Math.min(100, basePopularity + randomVariation + trendAdjustment));
    const twitterFollowers = Math.floor(score * 10000 + Math.random() * 5000);
    const engagementRate = Math.max(0, Math.min(100, score * 0.8 + Math.random() * 20));

    dataPoints.push({
      date,
      score: Math.round(score * 10) / 10,
      twitterFollowers,
      engagementRate: Math.round(engagementRate * 10) / 10,
    });
  }

  return dataPoints;
}
