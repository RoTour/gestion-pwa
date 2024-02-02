import { ResourcesServices } from '$lib/modules/realtime/resources.service';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	if (!user) return json({ message: 'Unauthorized' }, { status: 401 });
	try {
		await ResourcesServices().updateResources(user.email ?? '');
	} catch (error) {
		console.error('updateResources', error);
		return json({ message: 'Error updating resources' }, { status: 500 });
	}
	return json({
		message: 'OK'
	})
};
