import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCreatorStats } from '$lib/server/stats';

export const GET: RequestHandler = async () => {
	const stats = await getCreatorStats();

	return json(stats, {
		headers: {
			'Cache-Control': stats.fresh
				? 'public, max-age=300, s-maxage=1800, stale-while-revalidate=3600'
				: 'public, max-age=60, s-maxage=120'
		}
	});
};
