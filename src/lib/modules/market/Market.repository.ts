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
	getTotalAmounts: async () => {
		return prisma.$transaction(async () => {
			const sums = await Promise.all([
				prisma.resources.aggregate({
					_sum: {
						wood: true
					}
				}),
				prisma.resources.aggregate({
					_sum: {
						marble: true
					}
				}),
				prisma.resources.aggregate({
					_sum: {
						wine: true
					}
				}),
				prisma.resources.aggregate({
					_sum: {
						sulfur: true
					}
				}),
				prisma.resources.aggregate({
					_sum: {
						crystal: true
					}
				}),
				prisma.resources.aggregate({
					_sum: {
						gold: true
					}
				})
			]);

			const result: TotalResourceAmount[] = [
				{ resource: 'WOOD', amount: sums[0]._sum.wood || BigInt(0) },
				{ resource: 'MARBLE', amount: sums[1]._sum.marble || BigInt(0) },
				{ resource: 'WINE', amount: sums[2]._sum.wine || BigInt(0) },
				{ resource: 'SULFUR', amount: sums[3]._sum.sulfur || BigInt(0) },
				{ resource: 'CRYSTAL', amount: sums[4]._sum.crystal || BigInt(0) },
			];

			return result;
		});
	}
});
