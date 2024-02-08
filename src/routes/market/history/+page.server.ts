import { MarketRepository } from '$lib/modules/market/Market.repository';
import type { TransactionRecord } from '$lib/modules/market/dto/TransactionRecord.dto';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { UseGroupTransactions } from '$lib/modules/market/usecases/UseGroupTransactions.usecase';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) throw redirect(301, '/auth/login');

	const allRecords: TransactionRecord[] = await MarketRepository().getTransactionHistory(user.email ?? '');
	const records = UseGroupTransactions().execut(allRecords);

	return {
		records
	};
};
