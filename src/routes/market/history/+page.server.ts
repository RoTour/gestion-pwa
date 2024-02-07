import { MarketRepository } from '$lib/modules/market/Market.repository';
import type { PageServerLoad } from './$types';

export type TransactionHistory = {
	username: string;
	resource: 'WOOD' | 'MARBLE' | 'SULFUR' | 'CRYSTAL' | 'WINE' | 'GOLD';
	amount: number;
	price: number;
	type: 'BUY' | 'SELL';
	date: Date;
};

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) return {};

	const history: TransactionHistory[] = await MarketRepository().getTransactionHistory(user.email ?? '');

	return {
		history
	};
};
