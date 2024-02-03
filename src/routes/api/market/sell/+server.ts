import { MarketRepository } from '$lib/modules/market/Market.repository';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const user = locals.user;
	if (!user) return json({ message: 'Unauthorized' }, { status: 401 });
	const body = await request.json();
	const { quantity, resource } = body;

	if (!quantity || !resource)
		return json({ message: 'Invalid request' }, { status: 400 });

	if (quantity < 1)
		return json({ message: 'Invalid request' }, { status: 400 });

	try {
		await MarketRepository().sellResources(user.email ?? '', resource, quantity);
		return json({ message: 'Resources sold' });
	} catch (e) {
		console.error(e);
		return json({ message: 'Error selling resources' }, { status: 500 });
	}
};
