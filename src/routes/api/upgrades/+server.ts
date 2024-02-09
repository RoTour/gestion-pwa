import { UseUpgrade } from '$lib/modules/upgrades/usecases/UseUpgrade.usecase';
import type { EnumUpgradeType } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const isUpgradeType = (upgradeType: string): boolean => {
	return (
		upgradeType === 'MORE_PPL' ||
		upgradeType === 'EQL_PRICES' ||
		upgradeType === 'PSV_INC' ||
		upgradeType === 'PROD_BOOST'
	);
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const user = locals.user;
	if (!user) return json({ message: 'Unauthorized' }, { status: 401 });
	const body = await request.json();
	const upgradeType: string = body.type;
	if (!upgradeType) return json({ message: 'Missing upgradeType' }, { status: 400 });
	if (!isUpgradeType(upgradeType)) return json({ message: 'Invalid upgradeType' }, { status: 400 });

	try {
		const newPlayerData = await UseUpgrade().execute(user.email ?? '', upgradeType as EnumUpgradeType);
		return json({ message: 'Upgrade successfull', newPlayerData: newPlayerData });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return json({ message: error.message }, { status: 403 });
		return json({ message: 'This upgrade has been canceled for security reasons' }, { status: 403 });
	}
};
