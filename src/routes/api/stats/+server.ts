import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// In-memory cache to ensure instant response & avoid rate limits
let cachedStats = {
	youtubeSubs: '10.7K',
	tiktokFollowers: '48.7K',
	lastUpdated: 0
};

function formatCount(num: number): string {
	if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1_000) {
		return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
	}
	return num.toLocaleString();
}

export const GET: RequestHandler = async () => {
	const now = Date.now();
	// Cache for 30 minutes (1800000 ms)
	if (now - cachedStats.lastUpdated < 1800000 && cachedStats.lastUpdated !== 0) {
		return json(cachedStats, {
			headers: {
				'Cache-Control': 'public, max-age=1800, s-maxage=1800'
			}
		});
	}

	// 1. Live YouTube subscribers count
	try {
		const ytRes = await fetch('https://www.youtube.com/@KiamiChau', {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				'Accept-Language': 'en-US,en;q=0.9'
			}
		});

		if (ytRes.ok) {
			const html = await ytRes.text();
			const match =
				html.match(/"content":"([0-9.]+[KkMm]?)\s*subscribers"/i) ||
				html.match(/([0-9.]+[KkMm]?)\s*subscribers/i);
			if (match && match[1]) {
				cachedStats.youtubeSubs = match[1].toUpperCase();
			}
		}
	} catch (err) {
		console.warn('Failed to fetch live YouTube stats:', err);
	}

	// 2. Live TikTok followers count (via TokCounter public engine)
	try {
		const ttRes = await fetch('https://tiktok-api.tokcounter.com/user/data/kiami.chau', {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
			}
		});

		if (ttRes.ok) {
			const data = await ttRes.json();
			if (data.success && data.stats?.followers) {
				cachedStats.tiktokFollowers = formatCount(data.stats.followers);
			}
		}
	} catch (err) {
		console.warn('Failed to fetch live TikTok stats:', err);
	}

	cachedStats.lastUpdated = now;

	return json(cachedStats, {
		headers: {
			'Cache-Control': 'public, max-age=1800, s-maxage=1800'
		}
	});
};
