import { prisma } from '$lib/clients/prisma'

export const ResourcesServices = () => ({
	updateResources: async (email: string) => {
		return prisma.$transaction(async() => {
			const user = await prisma.player.findUnique({ where: { email } });
			const resources = await prisma.resources.findMany({ where: { playerId: user?.id } });
		})
	},
})