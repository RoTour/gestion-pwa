import { playerCitizensMax, playerResources, upgradeProductionLevel } from '$lib/stores/playerInfos.store';
import type { Resources } from '@prisma/client';
import type { UpgradeType } from './entities/UpgradeType';
import { UpgradesBoosts } from './upgrades.data';


type AfterUpgradeInput = {
	resources: Resources;
	newLevel: number;
};
// type AfterAction<T extends UpgradeType> = (input: UpgradeActionMappings[T]) => void;
type AfterAction = (input: AfterUpgradeInput) => void;

export const afterUpgradeActions: { [K in UpgradeType]: AfterAction } = {
	MORE_PPL: ({ resources, newLevel }) => {
		console.log('MORE_PPL');
		playerResources.set(resources);
		playerCitizensMax.set(UpgradesBoosts.MORE_PPL[newLevel].value);
	},
	EQL_PRICES: ({ resources, newLevel }) => {
		
		console.log('EQL_PRICES');
	},
	PSV_INC: ({ resources, newLevel }) => {
		console.log('PSV_INC');
	},
	PROD_BOOST: ({ resources, newLevel }) => {
		console.log('PROD_BOOST');
		playerResources.set(resources);
		upgradeProductionLevel.set(UpgradesBoosts.PROD_BOOST[newLevel].value);
	}
};
