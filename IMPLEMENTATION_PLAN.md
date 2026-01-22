# Multi-Platform Trending System with 6-Hour Caching

## Overview

Transform Pollitique from a simple follower tracker to a comprehensive multi-platform trending system that:
- **Reduces API calls** from every page load to 4 times per day (6-hour intervals)
- **Multi-platform trending score** based on Twitter, YouTube, and TikTok metrics
- **Historical tracking** to calculate real growth rates
- **Fast page loads** by serving cached data immediately

## Current Issues

1. **Too many API calls**: Every page refresh triggers 21 Twitter API calls (10-20 seconds)
2. **No persistence**: Data lost on server restart, no historical tracking
3. **Limited metrics**: Only tracking Twitter follower counts
4. **Short cache**: 30-minute ISR cache too frequent

## Requirements Summary

### User Requirements
- Cache data, refresh only 4 times per day (every 6 hours)
- Track trending based on:
  - Twitter mentions count (last 3 days)
  - Twitter retweets (last 3 days)
  - Twitter follower growth rate
  - YouTube video views (last 3 days)
  - TikTok video views (last 3 days)
  - Combined weighted engagement score
- Show cached data immediately (fast load)
- Display last refresh time
- Keep manual refresh button

### API Constraints Discovered

**Twitter API v2 Free Tier (2026)**:
- ❌ Free tier is write-only (cannot read mentions, retweets, or follower data)
- ⚠️ Basic tier required: $100/month for read access
- **Decision**: Start without Twitter mentions/retweets, use adjusted trending score

**YouTube Data API v3**:
- ✅ Free tier: 10,000 units/day
- ✅ Sufficient for 4 refreshes/day (21 politicians × ~100 units = ~2,100 units per refresh)
- ✅ No payment required

**TikTok API**:
- ❌ Not publicly accessible in 2026
- **Decision**: Use manual data entry system for now

## Implementation Strategy

### Phase 1: Database & 6-Hour Caching (CRITICAL - Start Here)

**Goal**: Add persistent storage, extend cache from 30 min to 6 hours

**Database Choice**: SQLite for development → Vercel Postgres (free tier) for production

**Schema**:
```sql
-- Politicians table (baseline data)
CREATE TABLE politicians (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  twitter_handle TEXT,
  youtube_channel_id TEXT,
  tiktok_handle TEXT,
  -- ... other fields
);

-- Historical snapshots (4 times daily)
CREATE TABLE politician_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  politician_id TEXT NOT NULL,
  snapshot_date DATETIME NOT NULL,
  twitter_followers INTEGER,
  youtube_views_3d INTEGER,
  tiktok_views_3d INTEGER,
  trending_score REAL,
  FOREIGN KEY (politician_id) REFERENCES politicians(id)
);

-- Fast read cache
CREATE TABLE politician_cache (
  politician_id TEXT PRIMARY KEY,
  current_twitter_followers INTEGER,
  current_youtube_views_3d INTEGER,
  current_tiktok_views_3d INTEGER,
  follower_growth_rate REAL,
  trending_score REAL,
  trending_rank INTEGER,
  last_refresh DATETIME
);
```

**Files to Create**:
- `/lib/db/sqlite.ts` - Database connection manager
- `/lib/db/schema.sql` - Schema definition
- `/lib/db/queries/politicians.ts` - Query functions
- `/lib/db/queries/snapshots.ts` - Snapshot queries

**Files to Modify**:
- `/app/api/politicians/live/route.ts`:
  - Change `export const revalidate = 1800` → `21600` (6 hours)
  - Read from `politician_cache` table instead of calling APIs
  - Only refresh if cache older than 6 hours
- `/package.json`: Add `better-sqlite3`
- `/types/database.ts`: Add database types

**Verification**:
- Page loads in <500ms (cached data)
- Data persists after server restart
- Last refresh timestamp displayed
- Manual refresh still works

### Phase 2: Scheduled Refresh with Cron

**Goal**: Automatically refresh data 4 times per day

**Files to Create**:
- `/app/api/cron/refresh-politicians/route.ts` - Cron endpoint
- `/lib/refresh/politician-refresh.ts` - Core refresh logic
- `vercel.json` - Cron configuration

**Cron Configuration**:
```json
{
  "crons": [{
    "path": "/api/cron/refresh-politicians",
    "schedule": "0 */6 * * *"
  }]
}
```

Schedule runs at: 00:00, 06:00, 12:00, 18:00 UTC daily

**Environment Variables**:
- Add `CRON_SECRET` to authenticate cron requests

**Refresh Logic**:
1. Fetch Twitter follower counts (current functionality)
2. Fetch YouTube video views (Phase 3)
3. Calculate growth rates from previous snapshot
4. Calculate trending scores
5. Update database and cache
6. Log success/failure metrics

### Phase 3: Historical Tracking & Growth Rates

**Goal**: Calculate real growth rates from historical data

**Growth Calculation**:
```typescript
function calculateGrowth(current: number, previous: number): {
  growthRate: number;  // percentage
  trend: 'up' | 'down' | 'stable';
} {
  if (previous === 0) return { growthRate: 0, trend: 'stable' };

  const rate = ((current - previous) / previous) * 100;
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (rate > 1) trend = 'up';
  else if (rate < -1) trend = 'down';

  return { growthRate: rate, trend };
}
```

**Files to Modify**:
- `/lib/db/queries/snapshots.ts` - Add query for 3-day-old snapshot
- `/lib/refresh/politician-refresh.ts` - Add growth calculation

**Display**:
- Show follower growth percentage in table
- Update trend indicators (↑↓→) based on real data

### Phase 4: YouTube API Integration

**Goal**: Track YouTube video views for trending score

**Setup**:
1. Enable YouTube Data API v3 in Google Cloud Console
2. Get API key
3. Add `YOUTUBE_API_KEY` to environment

**Files to Create**:
- `/lib/api/youtube.ts` - YouTube API client

**API Functions**:
```typescript
// Get recent video views (last 3 days)
async function getRecentVideoViews(
  channelId: string,
  days: number = 3
): Promise<number>

// Quota tracking
async function trackQuotaUsage(cost: number): Promise<void>
```

**Files to Modify**:
- `/lib/data/mock-data.ts` - Add `youtubeChannelId` to each politician
- `/lib/refresh/politician-refresh.ts` - Call YouTube API during refresh

**Cost Management**:
- Search for videos: 100 units
- Get video stats: 1 unit
- Total per politician: ~102 units
- 21 politicians × 4 refreshes = ~8,500 units/day (under 10,000 limit)

### Phase 5: TikTok Manual Entry System

**Goal**: Allow manual entry of TikTok data (API not available)

**Files to Create**:
- `/app/api/admin/tiktok-entry/route.ts` - Admin-only endpoint
- `/components/admin/TikTokDataEntry.tsx` - Simple form UI

**Manual Entry Schema**:
```typescript
interface TikTokManualEntry {
  politicianId: string;
  tiktokHandle: string;
  views3d: number;  // Manual count from recent videos
  entryDate: Date;
}
```

**Validation**:
- Data must be < 24 hours old
- Only admins can submit
- Stored in database with audit trail

### Phase 6: Trending Score Calculation

**Goal**: Calculate unified score from all metrics

**Trending Score Formula** (Adjusted for no Twitter mentions):
```typescript
interface TrendingMetrics {
  followerGrowthRate: number;  // -100 to +100 (percentage)
  youtubeViews3d: number;
  tiktokViews3d: number;
}

// Weights (sum to 1.0)
const WEIGHTS = {
  followerGrowth: 0.40,  // 40%
  youtubeViews: 0.40,    // 40%
  tiktokViews: 0.20      // 20%
};

function calculateTrendingScore(
  metrics: TrendingMetrics,
  maxValues: TrendingMetrics
): number {
  // Normalize each metric to 0-100 scale
  const normGrowth = normalizeGrowth(metrics.followerGrowthRate);
  const normYouTube = (metrics.youtubeViews3d / maxValues.youtubeViews3d) * 100;
  const normTikTok = (metrics.tiktokViews3d / maxValues.tiktokViews3d) * 100;

  // Calculate weighted score
  const score =
    (normGrowth * WEIGHTS.followerGrowth) +
    (normYouTube * WEIGHTS.youtubeViews) +
    (normTikTok * WEIGHTS.tiktokViews);

  return Math.round(score * 10) / 10;  // Round to 1 decimal
}

function normalizeGrowth(rate: number): number {
  // Map -5% to +5% growth to 0-100 scale
  // -5% = 0, 0% = 50, +5% = 100
  return Math.min(100, Math.max(0, (rate * 10) + 50));
}
```

**Files to Create**:
- `/lib/calculations/trending-score.ts` - Score algorithm
- `/lib/calculations/normalization.ts` - Data normalization

**Files to Modify**:
- `/lib/refresh/politician-refresh.ts` - Calculate scores during refresh
- `/components/data/PoliticiansTable.tsx` - Display trending score instead of followers

**UI Changes**:
- Replace "Abonnés" column header with "Score Tendance"
- Show score (0-100) as primary metric
- Add tooltip breakdown showing:
  - Follower growth: X%
  - YouTube views: X
  - TikTok views: X
  - Individual component scores
- Keep follower count in expanded row

## Critical Files Summary

| File | Phase | Purpose |
|------|-------|---------|
| `/lib/db/sqlite.ts` | 1 | Database connection, core infrastructure |
| `/app/api/politicians/live/route.ts` | 1 | API endpoint, 6-hour caching, DB reads |
| `/lib/refresh/politician-refresh.ts` | 2 | Core refresh logic, orchestrates all updates |
| `/lib/calculations/trending-score.ts` | 6 | Trending score algorithm |
| `/lib/api/youtube.ts` | 4 | YouTube API integration |
| `/app/api/cron/refresh-politicians/route.ts` | 2 | Cron job endpoint |
| `vercel.json` | 2 | Cron schedule configuration |

## Data Flow (After Implementation)

```
User visits homepage
    ↓
LivePoliticiansTable loads
    ↓
Fetch /api/politicians/live
    ↓
Check politician_cache table
    ↓
Is cache fresh? (< 6 hours)
    ├─ Yes → Return cached data immediately (<500ms)
    └─ No → Return stale data + log refresh needed
    ↓
Cron job runs every 6 hours
    ↓
Call refreshPoliticianData()
    ├─ Fetch Twitter follower counts (all 21)
    ├─ Fetch YouTube video views (all 21)
    ├─ Use manual TikTok data (if available)
    ├─ Calculate growth rates (compare to 3 days ago)
    ├─ Calculate trending scores
    ├─ Rank politicians by score
    └─ Update database: snapshots + cache tables
    ↓
Next user visit sees fresh data
```

## Error Handling

**API Failure Strategy**:
1. **Primary**: Call external API (Twitter/YouTube)
2. **Fallback 1**: Use most recent snapshot (<24 hours old)
3. **Fallback 2**: Use older snapshot with warning
4. **Fallback 3**: Exclude from trending calculations

**User-Facing Indicators**:
- 🟢 Green: All data current (<12 hours)
- 🟡 Yellow: Some data stale (12-24 hours)
- 🔴 Red: Data outdated (>24 hours)
- ⚪ Gray: Missing data source (no YouTube/TikTok)

## Environment Variables

```bash
# .env.local

# Existing
TWITTER_BEARER_TOKEN=your_token_here
NEXT_PUBLIC_APP_URL=http://localhost:3020

# New
YOUTUBE_API_KEY=your_youtube_key_here
CRON_SECRET=random_secure_string_for_cron_auth
DATABASE_URL=postgresql://... # For production (Vercel Postgres)

# Optional (if using third-party TikTok service)
TIKTOK_API_KEY=your_tiktok_key_here
```

## Deployment Notes

### Development
- SQLite database in `/tmp` (recreated on changes)
- Manual refresh for testing
- All environment variables in `.env.local`

### Production (Vercel)
- Migrate to Vercel Postgres (free tier: 256 MB storage)
- Enable cron jobs in `vercel.json`
- Add all environment variables in Vercel dashboard
- Monitor cron executions in Vercel logs

### Migration Path
1. Export SQLite data with script
2. Create Vercel Postgres database
3. Import data to Postgres
4. Update `DATABASE_URL` in environment
5. Verify cron jobs run successfully

## Budget

### Required Costs
- **Vercel Postgres**: $0 (free tier sufficient)
- **YouTube API**: $0 (free tier: 10,000 units/day)
- **Hosting**: $0 (Vercel free tier)

### Optional Costs
- **Twitter Basic API**: $100/month (if adding mentions/retweets later)
- **Vercel Pro**: $20/month (better cron reliability, not required)

**Total**: $0/month minimum, $100-120/month for full Twitter integration

## Future Enhancements (Post-MVP)

1. **Twitter mentions/retweets**: Upgrade to Basic API tier
2. **Sentiment analysis**: Track positive/negative mentions
3. **News articles**: Integrate news API for article counts
4. **Email alerts**: Notify on ranking changes
5. **Historical charts**: Show trending score over time
6. **Comparison view**: Side-by-side politician comparison
7. **Export data**: CSV export for analysis
8. **Admin dashboard**: Monitor API usage, errors, quota

## Verification Checklist

### Phase 1 (Database & Caching)
- [ ] Database created with all tables
- [ ] Politicians seeded from mock data
- [ ] Page loads in <500ms with cached data
- [ ] ISR cache set to 6 hours (21600 seconds)
- [ ] Last refresh timestamp displays correctly
- [ ] Manual refresh button works
- [ ] Data persists after server restart

### Phase 2 (Cron Jobs)
- [ ] Cron endpoint created and secured
- [ ] `vercel.json` configured correctly
- [ ] Cron runs every 6 hours
- [ ] Refresh logic updates database
- [ ] Logs show successful executions
- [ ] Errors logged and tracked

### Phase 3 (Historical Tracking)
- [ ] Growth rates calculate correctly
- [ ] Trend indicators accurate (↑↓→)
- [ ] Comparison to 3-day-old snapshot works
- [ ] Handles missing historical data gracefully

### Phase 4 (YouTube)
- [ ] YouTube API key configured
- [ ] Channel IDs added to all politicians
- [ ] Video views fetch successfully
- [ ] Quota tracking works (<10,000 units/day)
- [ ] Errors handled gracefully

### Phase 5 (TikTok)
- [ ] Manual entry form accessible
- [ ] Data validates correctly
- [ ] Stored in database with timestamp
- [ ] Shows in trending calculations

### Phase 6 (Trending Score)
- [ ] Score calculation correct (manual verification)
- [ ] Rankings accurate (highest score = rank 1)
- [ ] UI displays score instead of followers
- [ ] Tooltip breakdown shows components
- [ ] Normalizations work correctly

## Timeline Estimate

- **Phase 1** (Database & Caching): 2-3 days
- **Phase 2** (Cron Jobs): 1 day
- **Phase 3** (Historical Tracking): 1 day
- **Phase 4** (YouTube API): 2-3 days
- **Phase 5** (TikTok Entry): 1-2 days
- **Phase 6** (Trending Score): 2-3 days

**Total**: 9-13 days for complete implementation

Can implement in stages:
- **MVP** (Phases 1-3): 4-5 days - Gets caching and growth rates working
- **Full Feature** (All phases): 9-13 days - Includes all metrics and trending score

## Critical Success Factors

1. ✅ Database persists data (use Vercel Postgres in production)
2. ✅ Cron jobs run reliably every 6 hours
3. ✅ API errors don't break UI (fallback to cache)
4. ✅ 6-hour cache works (ISR + database)
5. ✅ User sees data freshness (last refresh timestamp)
6. ✅ Page loads fast (<500ms with cache)
7. ✅ Trending score accurately reflects multi-platform engagement

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Twitter API costs | $100/month | Skip mentions/retweets, use adjusted score |
| API rate limits | Incomplete data | Queue requests, fallback to cache, spread calls |
| Database growth | Storage limits | Retention policy (90 days), archive old data |
| Cron failures | Stale data | Manual refresh, monitoring, alerts |
| TikTok unavailable | Missing metric | Manual entry, optional in score |
| YouTube quota exceeded | Missing views | Monitor usage, skip on quota limit |

---

## Implementation Order (Recommended)

**Week 1**: Phases 1-3 (MVP)
- Database setup and 6-hour caching
- Cron jobs for scheduled refresh
- Historical tracking and growth rates
- **Result**: Fast page loads, reduced API calls, real growth metrics

**Week 2**: Phases 4-6 (Full Feature)
- YouTube API integration
- TikTok manual entry
- Trending score calculation
- **Result**: Complete multi-platform trending system
