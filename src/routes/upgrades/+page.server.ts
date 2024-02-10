import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { UpgradeDetails } from '$lib/modules/upgrades/dto/UpgradeDetails.dto';
import { UseGetUpgradeDetails } from '$lib/modules/upgrades/usecases/UseGetUpgradeDetails.usecase';
import { EnumUpgradeType } from '@prisma/client';

export const load: PageServerLoad = async ({ locals, depends }) => {
	depends('user:upgrades')
	const user = locals.user;
	if (!user) throw redirect(301, '/auth/login');

	const citizenUpgradeDetails: UpgradeDetails = await UseGetUpgradeDetails().execute(
		user.email ?? '',
		EnumUpgradeType.MORE_PPL
	);

	const prodBoostUpgradeDetails: UpgradeDetails = await UseGetUpgradeDetails().execute(
		user.email ?? '',
		EnumUpgradeType.PROD_BOOST
	);

	return {
		citizenUpgradeDetails,
		prodBoostUpgradeDetails,
	};
};