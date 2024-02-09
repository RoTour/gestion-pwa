import { UseRecalculatePrices } from '$lib/modules/market/usecases/UseRecalculatePrices.usecase';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		await UseRecalculatePrices().execute();
		return json({ message: 'Prices recalculated' }, { status: 200 });
	} catch (error) {
		return json({ message: 'Error recalculating prices' }, { status: 500 });
	}
};