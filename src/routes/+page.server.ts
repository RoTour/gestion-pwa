import { DashboardRepository } from '$lib/modules/dashboard/dashboard.repository';
import { UpgradesBoosts } from '$lib/modules/upgrades/upgrades.data';
import type { Upgrade } from '@prisma/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const user = locals.user;
	if (!user) {
		throw redirect(303, '/auth/login');
	}

	await fetch('/api/realtime/resources', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const player = await DashboardRepository().getPlayerFromEmail(user?.email || '');
	if (!player) {
		throw redirect(303, '/auth/login');
	}
	const townHallLevel =
		player.Upgrades.find((upgrade: Upgrade) => upgrade.type === 'MORE_PPL')?.level || 0;
	const maxCitizens: number = UpgradesBoosts.MORE_PPL[townHallLevel]?.value ?? player.maxCitizens;

	const citizenAvailable: number =
		maxCitizens - player.Workforces.reduce((acc, workforce) => acc + workforce.amount, 0);
	console.debug({ townHallLevel, maxCitizens, citizenAvailable });

	return {
		player,
		maxCitizens,
		citizenAvailable
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
		return {
			status: 200,
			message: 'Workforce saved',
			player: player
		};
	}
};
