import { prisma } from '$lib/clients/prisma';
import type { Resources } from '@prisma/client';

export type Ranking = {
	username: string,
	wealth: number,
}

export const LeaderboardRepository = () => ({
	getRanking: async (): Promise<Ranking[]> => {
		// Fetch resource prices and map them for easy lookup
		const resourcePrices = await prisma.resourcePrice.findMany();
		const priceMap = resourcePrices.reduce((acc, cur) => {
			acc[cur.resource.toLowerCase()] = cur.price;
			return acc;
		}, {} as Record<string, number>);
		
		console.debug({ priceMap });
		// Fetch players with their resources
		const players = await prisma.player.findMany({
			where: {
				devAccount: false,
			},
			include: {
				Resources: true,
				Workforces: true,
			},
		});
	
		// Calculate wealth for each player
		const playerWealths = players.map(player => {
			const gold = player.Resources?.gold || 0;
			const resources: (keyof Resources)[] = ['wood', 'marble', 'sulfur', 'crystal', 'wine'];
			const resourceWealth = resources.reduce((acc, cur) => {
				const price = priceMap[cur];
				const amount: bigint = (player.Resources?.[cur] as bigint) / 1000n || 0n;
				console.debug({ name: player.name, price, amount, resource: cur, wealth: price * Number(amount)});
				return acc + price * Number(amount);
			}, 0);
			const total = Number(gold) + resourceWealth;
			return {
				username: player.name,
				wealth: total,
			}
		});
	
		// Sort by wealth in descending order
		playerWealths.sort((a, b) => b.wealth - a.wealth);
	
		return playerWealths;
	}
});