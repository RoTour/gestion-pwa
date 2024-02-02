import { DashboardRepository } from '$lib/modules/dashboard/dashboard.repository';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({locals, fetch}) => {
	const user = locals.user;
	if (!user) {
		throw redirect(303, '/auth/login');
	}

	const updateResources = await fetch('/api/realtime/resources', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	console.debug('updateResources', await updateResources.json());

	const player = await DashboardRepository().getPlayerFromEmail(user?.email || '');
	if (!player) {
		throw redirect(303, '/auth/login');
	}
	return {
		player,
		citizenAvailable:
			player.maxCitizens - player.Workforces.reduce((acc, workforce) => acc + workforce.amount, 0)
	};
};

export const actions: Actions = {
	saveworkforce: async (event) => {
		const form = await event.request.formData();
		const wood = form.get('wood') as string;
		const marble = form.get('marble') as string;
		const sulfur = form.get('sulfur') as string;
		const crystal = form.get('crystal') as string;
		const wine = form.get('wine') as string;
		if (!wood || !marble || !sulfur || !crystal || !wine)
			return fail(400, { message: 'Missing parameters' });

		if (isNaN(+wood) || isNaN(+marble) || isNaN(+sulfur) || isNaN(+crystal) || isNaN(+wine))
			return fail(400, { message: 'Invalid parameters' });

		console.debug('saveworkforce', {wood, marble, sulfur, crystal, wine});

		const playerEmail = event.locals.user?.email;
		if (!playerEmail) return fail(400, { message: 'Invalid user' });

		try {
			await DashboardRepository().saveWorkforce(playerEmail, {
				wood: +wood,
				marble: +marble,
				sulfur: +sulfur,
				crystal: +crystal,
				wine: +wine
			});
		} catch (error) {
			console.error('saveworkforce', error);
			return fail(500, { message: 'Error saving workforce' });
		}
		let player;
		try {
			player = await DashboardRepository().getPlayerFromEmail(playerEmail);
		} catch (error) {
			console.error('saveworkforce', error);
			return fail(500, { message: 'Error retrieving player' });
		}
		console.debug('Workforce saved');
		return {
			status: 200,
			message: 'Workforce saved',
			player: player
		};
	}
};
