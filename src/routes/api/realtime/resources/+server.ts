import { DashboardRepository } from '$lib/modules/dashboard/dashboard.repository';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) return json({ message: 'Unauthorized' }, { status: 401 });
	await DashboardRepository().updateResources(user.email);
	console.debug('updateResources', user.email);

	return json({
		message: 'OK'
	})
};
