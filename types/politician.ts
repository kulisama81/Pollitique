export type PoliticalParty =
  | 'LR'    // Les Républicains
  | 'LREM'  // Renaissance/La République En Marche
  | 'PS'    // Parti Socialiste
  | 'RN'    // Rassemblement National
  | 'LFI'   // La France Insoumise
  | 'EELV'  // Europe Écologie Les Verts
  | 'MoDem' // Mouvement Démocrate
  | 'PCF'   // Parti Communiste Français
  | 'Other';

export type PopularityTrend = 'up' | 'down' | 'stable';

export interface Politician {
  id: string;
  fullName: string;
  party: PoliticalParty;
  position: string;
  imageUrl: string;
  twitterHandle?: string;
  biography?: string;
  currentPopularity: number; // 0-100
  popularityTrend: PopularityTrend;
  mentionsLast5Days: number;
  mentionsPrevious5Days: number;
}

export interface PoliticianListItem {
  id: string;
  fullName: string;
  party: PoliticalParty;
  position: string;
  imageUrl: string;
  twitterHandle?: string;
  currentPopularity: number;
  popularityTrend: PopularityTrend;
  mentionsLast5Days: number;
  mentionsPrevious5Days: number;
}
