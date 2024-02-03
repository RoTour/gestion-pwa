import { prisma } from '$lib/clients/prisma';
import type { EnumResource, Resources } from '@prisma/client';

type ResourceName = Pick<Resources, 'crystal' | 'marble' | 'gold' | 'sulfur' | 'wine' | 'wood'>;

const calculateNewAmount = (oldAmount: bigint, rate: number, seconds: number): number => {
	const newAmount = oldAmount + BigInt(Math.floor(((seconds * rate) / 3600) * 1000)); // store in db as integer, prevent float
	const result = Math.floor(Number(newAmount));
	console.debug('calculateNewAmount', { newAmount, result });
	return result
};

export const ResourcesServices = () => ({
	updateResources: async (email: string) => {
		return prisma.$transaction(async () => {
			const user = await prisma.player.findUnique({ where: { email } });
			if (!user) return;
			const playerResources = await prisma.resources.findUnique({ where: { playerId: user.id } });
			const playerWorkforces = await prisma.workforce.findMany({ where: { playerId: user.id } });
			if (!playerResources) return;
			const now = new Date();
			const diff = now.getTime() - playerResources.updatedAt.getTime();
			const seconds = Math.floor(diff / 1000);
			if (seconds < 10) {
				console.debug('updateResources returning', { seconds });
				return;
			}
			const ressourceTypes: EnumResource[] = ['WOOD', 'MARBLE', 'SULFUR', 'CRYSTAL', 'WINE'];
			console.debug('updateResources', { seconds });
			const updates = ressourceTypes.map((type) => {
				const resourceType: keyof ResourceName = type.toLocaleLowerCase() as keyof ResourceName;
				const rate = playerWorkforces.find((workforce) => workforce.resource === type)?.amount;
				const newAmount = calculateNewAmount(playerResources[resourceType], rate || 0, seconds);
				console.debug('updateResources', { type, newAmount, oldAmount: playerResources[resourceType], rate });
				if (newAmount === Number(playerResources[resourceType])) return;
				
				return prisma.resources.update({
					where: { playerId: user.id },
					data: { updatedAt: now, [type.toLocaleLowerCase()]: newAmount }
				});
			});
			await Promise.all(updates);
		});
	}
});
