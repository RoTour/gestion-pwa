import type { EnumUpgradeType } from '@prisma/client';
import type { UpgradeDetails } from '../dto/UpgradeDetails.dto';
import { UpgradesBoosts, UpgradesCosts } from '../upgrades.data';
import { prisma } from '$lib/clients/prisma';
import type { UpgradeLevel } from '../entities/UpgradeLevel.entity';

const buildingNames: Record<EnumUpgradeType, string> = {
	MORE_PPL: 'Hotel de ville',
	EQL_PRICES: 'Balance des marchés',
	PSV_INC: 'Compte en Suisses',
	PROD_BOOST: 'Baraque de Magrebins',
}

export const UseGetUpgradeDetails = () => ({
	execute: async (playerEmail: string, upgradeType: EnumUpgradeType): Promise<UpgradeDetails> => {
		const currentUpdateLevel = await prisma.upgrade.findFirst({
			where: {
				player: {
					email: playerEmail
				},
				type: upgradeType
			}
		}).then((upgrade) => upgrade?.level ?? 0);
		const costs: UpgradeLevel | undefined = UpgradesCosts?.[upgradeType]?.[currentUpdateLevel + 1];
		let currentBoost = UpgradesBoosts?.[upgradeType]?.[currentUpdateLevel]?.label;
		let nextBoost = UpgradesBoosts?.[upgradeType]?.[currentUpdateLevel + 1]?.label;

		if (!currentBoost) {
			currentBoost = "Ce bâtiment n'est pas encore construit";
		}
		if (!nextBoost) {
			nextBoost = "Ce bâtiment est déjà au niveau maximum";
		}

		return {
			buildingLevel: currentUpdateLevel,
			buildingName: buildingNames[upgradeType],
			nextLevelCosts: costs?.costs,
			currentBoost,
			nextBoost,
		}
	}
});