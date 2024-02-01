import { prisma } from '$lib/clients/prisma';

export const DashboardRepository = () => ({
	getPlayerFromEmail: async (email: string) => {
		return prisma.player.findUnique({ 
			where: { email: email },
			include: { Resources: true }
		 });
	},
})