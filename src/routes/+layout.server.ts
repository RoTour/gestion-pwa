import { DashboardRepository } from '$lib/modules/dashboard/dashboard.repository';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({locals}) => {
	const loggedUser = locals.user;
	if (!loggedUser) return {};
	const user = await DashboardRepository().getPlayerFromEmail(loggedUser?.email ?? '');
	return {
		user
	}
};