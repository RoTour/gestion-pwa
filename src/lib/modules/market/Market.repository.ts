import { prisma } from '$lib/clients/prisma';
import type { EnumResource } from '@prisma/client';
import type { TotalResourceAmount } from './entities/TotalResourceAmount';

type PriceGenerationParams = {
	resource: EnumResource;
	baseValue: number;
};
export const MarketRepository = () => ({
	getPrices: async () => {
		return prisma.resourcePrice.findMany();
	},
	generatePrices: async (resources: PriceGenerationParams[]) => {
		await prisma.$transaction(async () => {
			const inserts = resources.map((resource) => {
				return prisma.resourcePrice.create({
					data: {
						resource: resource.resource,
						price: resource.baseValue
					}
				});
			});
			await Promise.all(inserts);
		});
	},
	updatePrices: async (prices: { resource: EnumResource; price: number }[]) => {
		await prisma.$transaction(async () => {
			const updates = prices.map((price) => {
				return prisma.resourcePrice.update({
					where: { resource: price.resource },
					data: { price: price.price }
				});
			});
			await Promise.all(updates);
		});
	},
	// sum of all resources by type
	getTotalProductionAmount: async () => {
		return prisma.$transaction(async () => {
			const sums = await Promise.all([
				prisma.workforce.aggregate({
					_sum: { amount: true },
					where: { resource: 'WOOD' }
				}),
				prisma.workforce.aggregate({
					_sum: { amount: true },
					where: { resource: 'MARBLE' }
				}),
				prisma.workforce.aggregate({
					_sum: { amount: true },
					where: { resource: 'WINE' }
				}),
				prisma.workforce.aggregate({
					_sum: { amount: true },
					where: { resource: 'SULFUR' }
				}),
				prisma.workforce.aggregate({
					_sum: { amount: true },
					where: { resource: 'CRYSTAL' }
				})
			]);

			const result: TotalResourceAmount[] = [
				{ resource: 'WOOD', amount: BigInt(sums[0]._sum.amount ?? 0) || BigInt(0) },
				{ resource: 'MARBLE', amount: BigInt(sums[1]._sum.amount ?? 0) || BigInt(0) },
				{ resource: 'WINE', amount: BigInt(sums[2]._sum.amount ?? 0) || BigInt(0) },
				{ resource: 'SULFUR', amount: BigInt(sums[3]._sum.amount ?? 0) || BigInt(0) },
				{ resource: 'CRYSTAL', amount: BigInt(sums[4]._sum.amount ?? 0) || BigInt(0) }
			];

			return result;
		});
	},
	sellResources: async (userEmail: string, resourceType: EnumResource, quantity: number) => {
		await prisma.$transaction(async () => {
			const price = await prisma.resourcePrice.findUnique({
				where: { resource: resourceType }
			});
			if (!price) throw new Error('Resource not found');
			const user = await prisma.player.findUnique({
				where: { email: userEmail },
				include: { Resources: true }
			});
			if (!user) throw new Error('User not found');
			const totalPrice = price.price * quantity;
			type Resources = 'wood' | 'marble' | 'sulfur' | 'crystal' | 'wine';
			const currentAmountOfResource =
				user.Resources?.[resourceType.toLowerCase() as Resources] || BigInt(0);

			if (currentAmountOfResource < BigInt(quantity)) throw new Error('Not enough resources');

			const newAmount = currentAmountOfResource - BigInt(quantity) * 1000n;

			await prisma.resources.update({
				where: { playerId: user.id },
				data: {
					[resourceType.toLowerCase()]: newAmount,
					gold: (user.Resources?.gold ?? 0n) + BigInt(totalPrice)
				}
			});
		});
	},
	buyResources: async (userEmail: string, resourceType: EnumResource, quantity: number) => {
		return prisma.$transaction(async () => {
			const price = await prisma.resourcePrice.findUnique({
				where: { resource: resourceType }
			});
			if (!price) throw new Error('Resource not found');
			const user = await prisma.player.findUnique({
				where: { email: userEmail },
				include: { Resources: true }
			});
			if (!user) throw new Error('User not found');
			const totalPrice = (price.price + 100) * quantity;
			if (user.Resources?.gold && user.Resources.gold < BigInt(totalPrice))
				throw new Error('Not enough gold');
			const currentAmountOfResource =
				user.Resources?.[
					resourceType.toLowerCase() as 'wood' | 'marble' | 'sulfur' | 'crystal' | 'wine'
				] || BigInt(0);
			const newAmount = currentAmountOfResource + BigInt(quantity) * 1000n;
			await prisma.resources.update({
				where: { playerId: user.id },
				data: {
					[resourceType.toLowerCase()]: newAmount,
					gold: (user.Resources?.gold ?? 0n) - BigInt(totalPrice)
				}
			});
		});
	}
});
