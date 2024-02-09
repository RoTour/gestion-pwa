import type { EnumResource } from '@prisma/client';


export interface UpgradeLevel {
	costs: { resource: EnumResource | 'GOLD'; amount: number }[];
}
export type UpgradeResource = EnumResource | 'GOLD';
