import type { EnumResource } from '@prisma/client';

export type TotalResourceAmount = {
	resource: EnumResource;
	amount: bigint;
};