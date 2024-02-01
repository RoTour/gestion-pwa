import { DashboardRepository } from '$lib/modules/dashboard/dashboard.repository';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	console.debug('layout load', { user: event.locals.user });
	const user = event.locals.user;
	if (!user) return {};

	const player = await DashboardRepository().getPlayerFromEmail(user?.email || '');
	if (!player) return {};
	return {
		player
	};
};
