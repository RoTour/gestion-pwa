import { UseRecalculatePrices } from '$lib/modules/market/usecases/UseRecalculatePrices.usecase';
import { UseUserHasEqualPricesUpgrade } from '$lib/modules/upgrades/usecases/UseUserHasEqualPricesUpgrade.usecase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals}) => {
	const prices = await UseRecalculatePrices().execute();
	const hasEqualPricesUpgrade = await UseUserHasEqualPricesUpgrade().execute(locals.user?.email ?? '');
	console.log({prices});
	return {
		prices,
		hasEqualPricesUpgrade,
	};
};
