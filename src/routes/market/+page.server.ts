import { UseRecalculatePrices } from '$lib/modules/market/usecases/UseRecalculatePrices.usecase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const prices = await UseRecalculatePrices().execute();
	console.log({prices});
	return {
		prices
	};
};
