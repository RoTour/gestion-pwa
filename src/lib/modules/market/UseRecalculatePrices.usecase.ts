import { MarketRepository } from './Market.repository';
import type { TotalResourceAmount } from './entities/TotalResourceAmount';

export const UseRecalculatePrices = () => ({
	execute: async () => {
		const repository = MarketRepository();
		let currentPrices = await repository.getPrices();
		if (!currentPrices.length) {
			await repository.generatePrices([
				{ resource: 'WOOD', baseValue: 1000 },
				{ resource: 'MARBLE', baseValue: 1000 },
				{ resource: 'SULFUR', baseValue: 1000 },
				{ resource: 'CRYSTAL', baseValue: 1000 },
				{ resource: 'WINE', baseValue: 1000 }
			]);
			currentPrices = await repository.getPrices();
		}
		console.debug({ currentPrices });
		const totalAmounts: TotalResourceAmount[] = await repository.getTotalAmounts();
		// Calculate the total of all resources to find the average amount per resource.
		const totalOfAllResources = totalAmounts.reduce((acc, curr) => acc + Number(curr.amount), 0);
		const averageAmountPerResource = totalOfAllResources / totalAmounts.length;

		const newPrices = currentPrices.map((currentPrice) => {
			const totalAmount = totalAmounts.find((amount) => amount.resource === currentPrice.resource);
			if (!totalAmount) {
				return { ...currentPrice, price: currentPrice.price };
			}

			// Calculate the price adjustment ratio based on the resource's deviation from the average amount.
			const deviationRatio = Number(totalAmount.amount) / averageAmountPerResource;

			// Adjust the price inversely to the deviation ratio.
			// The more abundant a resource (higher deviation ratio), the lower its price, and vice versa.
			let newPrice = Math.round(1000 / deviationRatio);

			// Ensure the new price is within reasonable bounds to prevent extreme fluctuations.
			newPrice = Math.max(1, Math.min(newPrice, 5000)); // Assuming 1 and 20 as min and max price limits.

			return { resource: currentPrice.resource, price: newPrice };
		});

		// Update the prices in the repository
		await repository.updatePrices(newPrices);
		return newPrices;
	}
});
