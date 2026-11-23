import { profileData, type CreatorStats } from '$lib/data';

export interface CachedCreatorStats extends CreatorStats {
	lastUpdated: number;
	fresh: boolean;
}

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes when live stats succeed
const RETRY_TTL_MS = 2 * 60 * 1000; // 2 minutes retry cooldown when upstream fails
const FETCH_TIMEOUT_MS = 3500;

const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const cachedStats: CachedCreatorStats = {
	youtubeSubs: profileData.stats.youtubeSubs,
	tiktokFollowers: profileData.stats.tiktokFollowers,
	lastUpdated: 0,
	fresh: false
};

let cacheExpiresAt = 0;
let inFlightRefresh: Promise<CachedCreatorStats> | null = null;

function formatCount(num: number): string {
	if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1_000) {
		return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
	}
	return num.toLocaleString('en-US');
}

async function fetchYouTubeSubs(): Promise<string | null> {
	const res = await fetch('https://www.youtube.com/@KiamiChau', {
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
		headers: {
			'User-Agent': USER_AGENT,
			'Accept-Language': 'en-US,en;q=0.9'
		}
	});

	if (!res.ok) return null;

	const html = await res.text();
	const match =
		html.match(/"content":"([0-9]+(?:\.[0-9]+)?[KkMm]?)\s*subscribers"/i) ||
		html.match(/([0-9]+(?:\.[0-9]+)?[KkMm]?)\s*subscribers/i);

	return match?.[1] ? match[1].toUpperCase() : null;
}

async function fetchTikTokFollowers(): Promise<string | null> {
	const res = await fetch('https://tiktok-api.tokcounter.com/user/data/kiami.chau', {
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
		headers: {
			'User-Agent': USER_AGENT
		}
	});

	if (!res.ok) return null;

	const data = (await res.json()) as {
		success?: boolean;
		stats?: { followers?: number };
	};

	if (data.success && typeof data.stats?.followers === 'number' && data.stats.followers > 0) {
		return formatCount(data.stats.followers);
	}

	return null;
}

async function refreshStats(): Promise<CachedCreatorStats> {
	const [ytResult, ttResult] = await Promise.allSettled([
		fetchYouTubeSubs(),
		fetchTikTokFollowers()
	]);

	let anySucceeded = false;

	if (ytResult.status === 'fulfilled' && ytResult.value) {
		cachedStats.youtubeSubs = ytResult.value;
		anySucceeded = true;
	} else if (ytResult.status === 'rejected') {
		console.warn('Failed to fetch live YouTube stats:', ytResult.reason);
	}

	if (ttResult.status === 'fulfilled' && ttResult.value) {
		cachedStats.tiktokFollowers = ttResult.value;
		anySucceeded = true;
	} else if (ttResult.status === 'rejected') {
		console.warn('Failed to fetch live TikTok stats:', ttResult.reason);
	}

	const now = Date.now();
	if (anySucceeded) {
		cachedStats.lastUpdated = now;
		cachedStats.fresh = true;
		cacheExpiresAt = now + CACHE_TTL_MS;
	} else {
		cacheExpiresAt = now + RETRY_TTL_MS;
	}

	return { ...cachedStats };
}

export async function getCreatorStats(options?: {
	maxWaitMs?: number;
}): Promise<CachedCreatorStats> {
	const now = Date.now();
	if (now < cacheExpiresAt) {
		return { ...cachedStats };
	}

	if (!inFlightRefresh) {
		inFlightRefresh = refreshStats().finally(() => {
			inFlightRefresh = null;
		});
	}

	const maxWaitMs = options?.maxWaitMs;
	if (typeof maxWaitMs === 'number' && maxWaitMs > 0) {
		let timerId: ReturnType<typeof setTimeout> | undefined;
		try {
			return await Promise.race([
				inFlightRefresh,
				new Promise<CachedCreatorStats>((resolve) => {
					timerId = setTimeout(() => resolve({ ...cachedStats }), maxWaitMs);
				})
			]);
		} finally {
			if (timerId !== undefined) clearTimeout(timerId);
		}
	}

	return inFlightRefresh;
}
