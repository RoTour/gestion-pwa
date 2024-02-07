import type { EnumResource, Resources } from '@prisma/client';

export const getResourceFromEnum = (resourceType: EnumResource, resources?: Resources): bigint => {
	if (!resources) return 0n;
	const key = resourceType.toLowerCase() as 'wood' | 'wine' | 'marble' | 'sulfur' | 'crystal';
	return resources[key];
};

// Replace with K, M, B, T, etc.
export const formatGold = (number: number) => {
	return format(BigInt(number), 100n);
};

export const formatResources = (number: bigint) => {
	return format(number, 1000n);
};

const format = (amount: bigint, divideBy: bigint) => {
	const resources = Math.floor(Number(amount / divideBy));
	if (resources < 1e3) return resources;
	if (resources >= 1e3 && resources < 1e6) return +(resources / 1e3).toFixed(1) + 'K';
	if (resources >= 1e6 && resources < 1e9) return +(resources / 1e6).toFixed(1) + 'M';
	if (resources >= 1e9 && resources < 1e12) return +(resources / 1e9).toFixed(1) + 'B';
};
