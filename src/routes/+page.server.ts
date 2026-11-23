import type { PageServerLoad } from './$types';
import { getCreatorStats } from '$lib/server/stats';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Wait at most 1.5s on cold cache so SSR TTFB stays fast; warm cache resolves in 0ms
	const stats = await getCreatorStats({ maxWaitMs: 1500 });

	setHeaders({
		'Cache-Control': stats.fresh
			? 'public, max-age=60, s-maxage=900, stale-while-revalidate=1800'
			: 'public, max-age=30, s-maxage=60'
	});

	return {
		stats
	};
};
