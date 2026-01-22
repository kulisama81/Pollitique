# Pollitique

A Next.js 14 application that provides real-time insights into French politics through Twitter follower tracking, polls, and media content analysis.

## Features

- **Real-Time Twitter Data**: Live follower counts for 21 French presidential candidates using Twitter API v2
- **Interactive Rankings Table**: Sortable table with expandable rows showing detailed candidate information
- **Popularity Trends**: Historical popularity tracking with interactive charts
- **Media Content**: Articles and videos related to French politics
- **Candidate Profiles**: Detailed pages for each politician with biography, trends, and related content
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **French Localization**: All content in French with proper date formatting

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns with French locale
- **API Integration**: Twitter API v2

## Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn
- Twitter API Bearer Token (Free tier compatible)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kulisama81/Pollitique.git
cd Pollitique
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Twitter Bearer Token to `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3020
TWITTER_BEARER_TOKEN=your_bearer_token_here
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3020`

### Production Build
```bash
npm run build
npm run start
```

## Project Structure

```
pollitique/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── politicians/          # Politicians endpoints
│   │   │   ├── live/             # Live Twitter data endpoint
│   │   │   └── [id]/             # Individual politician data
│   │   ├── articles/             # Articles endpoint
│   │   └── videos/               # Videos endpoint
│   ├── politicians/[id]/         # Dynamic politician pages
│   └── page.tsx                  # Homepage
├── components/
│   ├── content/                  # Article and video components
│   ├── data/                     # Data visualization components
│   ├── politician/               # Politician-specific components
│   └── shared/                   # Reusable UI components
├── lib/
│   ├── api/                      # API integration logic
│   │   ├── twitter.ts            # Twitter API functions
│   │   └── politicians.ts        # Politician data fetching
│   └── data/                     # Mock data
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
```

## Twitter API Integration

The application uses Twitter API v2 to fetch real-time follower counts for French politicians. The integration is designed to work with the free tier:

- **Endpoint Used**: `/users/by/username` (user lookup)
- **Rate Limiting**: 500ms delay between requests
- **Caching**: 30-minute revalidation
- **Error Handling**: Graceful fallback to mock data when API fails

### Current Politicians Tracked

21 French presidential candidates including:
- Emmanuel Macron
- Marine Le Pen
- Jean-Luc Mélenchon
- Jordan Bardella
- Édouard Philippe
- And 16 others

## Development Notes

- Port configured to `3020` to avoid conflicts with other projects
- Server Components by default for better performance
- Client Components only where interactivity is needed
- All dates formatted in French locale
- Political party colors configured in Tailwind theme

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `TWITTER_BEARER_TOKEN` | Twitter API Bearer Token | Yes |

## Contributing

1. Create a feature branch from `main`
2. Follow the conventions in `CLAUDE.md`
3. Commit with clear, descriptive messages
4. Push and create a pull request

## License

This project is private and proprietary.

## Contact

For questions or issues, please open an issue on GitHub.
