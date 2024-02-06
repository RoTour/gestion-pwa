import { prisma } from '$lib/clients/prisma';

export type Ranking = {
	username: string,
	wealth: number,
}

export const LeaderboardRepository = () => ({
	getRanking: async (): Promise<Ranking[]> => {
		// Fetch resource prices and map them for easy lookup
		const resourcePrices = await prisma.resourcePrice.findMany();
		const priceMap = resourcePrices.reduce((acc, cur) => {
			acc[cur.resource] = cur.price;
			return acc;
		}, {} as Record<string, number>);
	
		// Fetch players with their resources
		const players = await prisma.player.findMany({
			include: {
				Resources: true,
				Workforces: true,
			},
		});
	
		// Calculate wealth for each player
		const playerWealths = players.map(player => {
			const resourcesWealth = Object.entries(player.Resources || {}).reduce((total, [key, value]) => {
				if (key in priceMap && value instanceof BigInt) {
					// Convert BigInt to number for multiplication (may lose precision with very large numbers)
					return total + priceMap[key] * Number(value);
				}
				return total;
			}, 0);
	
			const workforcesWealth = player.Workforces.reduce((total, workforce) => {
				return total + (priceMap[workforce.resource] * workforce.amount);
			}, 0);
	
			const totalWealth = Number(player.Resources?.gold || 0) + resourcesWealth + workforcesWealth;
			return {
				playerId: player.id,
				email: player.email,
				username: player.name,
				wealth: totalWealth,
			};
		});
	
		// Sort by wealth in descending order
		playerWealths.sort((a, b) => b.wealth - a.wealth);
	
		return playerWealths;
	}
});