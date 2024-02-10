import { prisma } from '$lib/clients/prisma';

// return type of DashboardRepository().getPlayerFromEmail
export type PlayerData = Awaited<ReturnType<ReturnType<typeof DashboardRepository>['getPlayerFromEmail']>>;

export const DashboardRepository = () => ({
	getPlayerFromEmail: async (email: string) => {
		let user = await prisma.player.findUnique({
			where: { email: email },
			include: { Resources: true, Workforces: true, Upgrades: true}
		});
		if (!user) {
			await prisma.player.create({
				data: {
					email: email,
					name: email.split('@')[0],
					Resources: { create: { wood: 0, marble: 0, sulfur: 0, crystal: 0, wine: 0 } },
				}
			});
			user = await prisma.player.findUnique({
				where: { email: email },
				include: { Resources: true, Workforces: true, Upgrades: true }
			});
		}
		return user;
	},
	saveWorkforce: async (
		email: string,
		workforce: { wood: number; marble: number; sulfur: number; crystal: number; wine: number }
	) => {
		return prisma.$transaction(async () => {
			const player = await prisma.player.findUnique({ where: { email } });
			if (!player) return;
			await prisma.workforce.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'WOOD' } },
				create: {
					player: { connect: { email } },
					amount: workforce.wood,
					resource: 'WOOD'
				},
				update: { amount: workforce.wood }
			});
			await prisma.workforce.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'MARBLE' } },
				create: {
					player: { connect: { email } },
					amount: workforce.marble,
					resource: 'MARBLE'
				},
				update: { amount: workforce.marble }
			});
			await prisma.workforce.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'SULFUR' } },
				create: {
					player: { connect: { email } },
					amount: workforce.sulfur,
					resource: 'SULFUR'
				},
				update: { amount: workforce.sulfur }
			});
			await prisma.workforce.upsert({
				where: { playerId_resource: { playerId: player.id, resource: 'CRYSTAL' } },
				create: {
					player: { connect: { email } },
					amount: workforce.crystal,
					resource: 'CRYSTAL'
				},
				update: { amount: workforce.crystal }
			});
			await prisma.workforce.upsert({
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
