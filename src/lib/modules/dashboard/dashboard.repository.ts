import { prisma } from '$lib/clients/prisma';

export const DashboardRepository = () => ({
	getPlayerFromEmail: async (email: string) => {
		return prisma.player.findUnique({
			where: { email: email },
			include: { Resources: true, Citizens: true }
		});
	},
	saveWorkforce: async (
		email: string,
		workforce: { wood: number; marble: number; sulfur: number; crystal: number; wine: number }
	) => {
		return prisma.$transaction(async () => {
			const player = await prisma.player.findUnique({ where: { email } });
			if (!player) return;
			await prisma.citizen.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'WOOD' } },
				create: {
					player: { connect: { email } },
					amount: workforce.wood,
					resource: 'WOOD'
				},
				update: { amount: workforce.wood }
			});
			await prisma.citizen.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'MARBLE' } },
				create: {
					player: { connect: { email } },
					amount: workforce.marble,
					resource: 'MARBLE'
				},
				update: { amount: workforce.marble }
			});
			await prisma.citizen.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'SULFUR' } },
				create: {
					player: { connect: { email } },
					amount: workforce.sulfur,
					resource: 'SULFUR'
				},
				update: { amount: workforce.sulfur }
			});
			await prisma.citizen.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'CRYSTAL' } },
				create: {
					player: { connect: { email } },
					amount: workforce.crystal,
					resource: 'CRYSTAL'
				},
				update: { amount: workforce.crystal }
			});
			await prisma.citizen.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'WINE' } },
				create: {
					player: { connect: { email } },
					amount: workforce.wine,
					resource: 'WINE'
				},
				update: { amount: workforce.wine }
			});
		});
	}
});
