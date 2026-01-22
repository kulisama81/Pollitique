import { NextRequest, NextResponse } from 'next/server';
import { mockPoliticians } from '@/lib/data/mock-data';
import { PaginatedResponse, PoliticianListItem, PoliticalParty } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '12');
  const sortBy = searchParams.get('sortBy') || 'popularity';
  const party = searchParams.get('party') as PoliticalParty | null;

  let politicians = [...mockPoliticians];

  if (party) {
    politicians = politicians.filter((p) => p.party === party);
  }

  switch (sortBy) {
    case 'name':
      politicians.sort((a, b) => a.fullName.localeCompare(b.fullName));
      break;
    case 'party':
      politicians.sort((a, b) => a.party.localeCompare(b.party));
      break;
    case 'popularity':
    default:
      politicians.sort((a, b) => b.currentPopularity - a.currentPopularity);
      break;
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPoliticians = politicians.slice(startIndex, endIndex);

  const response: PaginatedResponse<PoliticianListItem> = {
    data: paginatedPoliticians,
    page,
    pageSize,
    total: politicians.length,
    totalPages: Math.ceil(politicians.length / pageSize),
  };

  return NextResponse.json(response);
}
