import type { EnumUpgradeType } from '@prisma/client';
import type { UpgradeDetails } from '../dto/UpgradeDetails.dto';
import { UpgradesBoosts, UpgradesCosts } from '../upgrades.data';
import { prisma } from '$lib/clients/prisma';
import type { UpgradeLevel } from '../entities/UpgradeLevel.entity';

const labels: Record<EnumUpgradeType, { name: string; description: string }> = {
	MORE_PPL: {
		name: 'Hôtel de ville',
		description: 'Vous permet d\'assigner plus de citoyens à la production de ressources'
	},
	EQL_PRICES: {
		name: 'Balance des marchés',
		description: 'Réduit le prix d\'achat des ressources de 1'
	},
	PSV_INC: {
		name: 'Compte en Suisses',
		description: 'Vous permet de gagner des intérêts sur votre or'
	},
	PROD_BOOST: {
		name: 'Baraque de Magrebins',
		description: 'Une armée de petits noirs à votre service pour plus de richesses'
	}
};

export const UseGetUpgradeDetails = () => ({
	execute: async (playerEmail: string, upgradeType: EnumUpgradeType): Promise<UpgradeDetails> => {
		const currentUpdateLevel = await prisma.upgrade
			.findFirst({
				where: {
					player: {
						email: playerEmail
					},
					type: upgradeType
				}
			})
			.then((upgrade) => upgrade?.level ?? 0);
		const costs: UpgradeLevel | undefined = UpgradesCosts?.[upgradeType]?.[currentUpdateLevel + 1];
		let currentBoost = UpgradesBoosts?.[upgradeType]?.[currentUpdateLevel]?.label;
		let nextBoost = UpgradesBoosts?.[upgradeType]?.[currentUpdateLevel + 1]?.label;

		if (!currentBoost) {
			currentBoost = "Ce bâtiment n'est pas encore construit";
		}
		if (!nextBoost) {
			nextBoost = 'Ce bâtiment est déjà au niveau maximum';
		}

		return {
			buildingLevel: currentUpdateLevel,
			labels: labels[upgradeType],
			nextLevelCosts: costs?.costs,
			type: upgradeType,
			currentBoost,
			nextBoost
		};
	}
});
