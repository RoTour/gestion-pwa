import { prisma } from '$lib/clients/prisma';
import type { EnumResource } from '@prisma/client';

export const ResourcesServices = () => ({
	updateResources: async (email: string) => {
		return prisma.$transaction(async () => {
			const user = await prisma.player.findUnique({ where: { email } });
			if (!user) return;
			const resources = await prisma.resources.findUnique({ where: { playerId: user.id } });
			const citizens = await prisma.workforce.findMany({ where: { playerId: user.id } });
			if (!resources) return;
			const now = new Date();
			const diff = now.getTime() - resources.updatedAt.getTime();
			const seconds = Math.floor(diff / 1000);
			if (seconds < 10) return;
			const ressourceTypes: EnumResource[] = ['WOOD', 'MARBLE', 'SULFUR', 'CRYSTAL', 'WINE'];
			const updates = ressourceTypes.map((type) => {
				const resource = citizens.find((c) => c.resource === type);
				const rate = resource?.amount || 0;
				const newAmount = (resource?.amount || 0) + Math.floor((seconds * rate) / 3600);
				return prisma.resources.update({
					where: { playerId: user.id },
					data: { updatedAt: now, [type.toLocaleLowerCase()]: newAmount},
				})
			});
			await Promise.all(updates);
		});
	}
});
