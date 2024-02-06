import { UseGetRanking } from '$lib/modules/leaderboard/UseGetRanking.usecase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const ranking = await UseGetRanking().execute();
	console.debug({ ranking });
	return {
		ranking
	}
};