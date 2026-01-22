import { TwitterMetrics } from '@/types';

interface TwitterUserData {
  id: string;
  name: string;
  username: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
  };
}

interface TwitterSearchResponse {
  data?: Array<{
    id: string;
    text: string;
  }>;
  meta: {
    result_count: number;
  };
}

export async function getTwitterMetrics(username: string): Promise<TwitterMetrics> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    throw new Error('Twitter Bearer Token not configured');
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const { data }: { data: TwitterUserData } = await response.json();

    return {
      followers: data.public_metrics.followers_count,
      followersChange24h: 0,
      followersChange7d: 0,
      tweetsCount: data.public_metrics.tweet_count,
      engagementRate: 0,
      mentionsCount: 0,
      sentimentScore: 0,
    };
  } catch (error) {
    console.error('Failed to fetch Twitter data:', error);
    throw error;
  }
}

export async function getTwitterMentions(username: string, days: number = 5): Promise<number> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    throw new Error('Twitter Bearer Token not configured');
  }

  try {
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Format date for Twitter API (ISO 8601)
    const startTime = startDate.toISOString();

    // Search for mentions of the username
    const query = encodeURIComponent(`@${username}`);
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${query}&start_time=${startTime}&max_results=100`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Twitter API error for @${username}:`, response.status, errorText);
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data: TwitterSearchResponse = await response.json();

    return data.meta.result_count;
  } catch (error) {
    console.error(`Failed to fetch Twitter mentions for @${username}:`, error);
    throw error;
  }
}

export async function getUserFollowers(username: string): Promise<{ followers: number; following: number } | null> {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    throw new Error('Twitter Bearer Token not configured');
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Twitter API error for @${username}:`, response.status, errorText);
      return null;
    }

    const result = await response.json();

    if (!result.data || !result.data.public_metrics) {
      console.error(`Invalid Twitter API response for @${username}:`, result);
      return null;
    }

    const { data }: { data: TwitterUserData } = result;

    return {
      followers: data.public_metrics.followers_count,
      following: data.public_metrics.following_count,
    };
  } catch (error) {
    console.error(`Failed to fetch followers for @${username}:`, error);
    return null;
  }
}

export async function getPoliticianTwitterData(username: string) {
  try {
    const followersData = await getUserFollowers(username);

    if (!followersData) {
      return null;
    }

    // Store follower count as "mentions" for now to keep the same structure
    // In reality, we're ranking by followers
    return {
      mentionsLast5Days: followersData.followers,
      mentionsPrevious5Days: followersData.followers, // Same value, we'll calculate change differently
    };
  } catch (error) {
    console.error(`Error fetching Twitter data for @${username}:`, error);
    return null;
  }
}
