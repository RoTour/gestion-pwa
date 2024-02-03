import { MarketRepository } from './Market.repository';

export const UseGetPrices = () => ({
	execute: async () => {
		const repository = MarketRepository();
		const prices = repository.getPrices();

		return prices;
	}
})