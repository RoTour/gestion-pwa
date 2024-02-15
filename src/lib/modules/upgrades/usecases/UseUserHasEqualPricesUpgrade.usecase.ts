import { prisma } from '$lib/clients/prisma';

export const UseUserHasEqualPricesUpgrade = () => ({
	execute: async (email: string) => {
		return prisma.$transaction(async (prisma) => {
			const user = await prisma.player.findUnique({
				where: { email },
				include: { Upgrades: true },
				cacheStrategy: { ttl: 120 },
			});
			if (!user) return false;
			const hasEqualPricesUpgrade = user.Upgrades.some((upgrade) => upgrade.type === 'EQL_PRICES' && upgrade.level > 0);

			return hasEqualPricesUpgrade;
		});
	}
})