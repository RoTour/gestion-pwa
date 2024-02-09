import { prisma } from '$lib/clients/prisma';
import type { EnumUpgradeType } from '@prisma/client';
import { UpgradesCosts } from '../upgrades.data';
import { getResourceFromEnum } from '$lib/helpers/resources.helper';

export const UseUpgrade = () => ({
	execute: async (email: string, upgradeType: EnumUpgradeType) => {
		return prisma.$transaction(async (prisma) => {
			const user = await prisma.player.findUnique({
				where: { email },
				include: { Resources: true, Upgrades: true }
			});
			const resources = user?.Resources;
			if (!resources) throw new Error('Resources not found');

			const currentUpdateLevel =
				user?.Upgrades.find((upgrade) => upgrade.type === upgradeType)?.level ?? 0;
			const upgradeCosts = UpgradesCosts[upgradeType][currentUpdateLevel + 1];
			if (!upgradeCosts) throw new Error('Max level reached');

			const enoughResources = upgradeCosts.costs.every((cost) => {
				const amountOfResources = getResourceFromEnum(cost.resource, resources);
				return amountOfResources >= cost.amount;
			});
			if (!enoughResources) throw new Error('Not enough resources');

			await prisma.upgrade.upsert({
				where: {
					id: user.Upgrades.find((upgrade) => upgrade.type === upgradeType)?.id ?? "",
					playerId: user.id,
					type: upgradeType
				},
				update: {
					level: currentUpdateLevel + 1
				},
				create: {
					player: { connect: { email } },
					type: upgradeType,
					level: 1
				}
			});
			await Promise.all(
				upgradeCosts.costs.map((cost) => {
					return prisma.resources.update({
						where: {
							playerId: user.id
						},
						data: {
							[cost.resource.toLowerCase()]: {
								decrement: cost.amount
							}
						}
					});
				})
			);
			const newResources = await prisma.resources.findUnique({
				where: { playerId: user.id }
			});
			return {
				resources: newResources
			}
		});
	}
});
