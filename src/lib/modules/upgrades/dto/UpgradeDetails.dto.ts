import type { UpgradeResource } from '../entities/UpgradeLevel.entity';

export interface UpgradeDetails {
	buildingLevel: number;
	buildingName: string;
	nextLevelCosts: { resource: UpgradeResource; amount: number }[] | undefined;
	currentBoost: string;
	nextBoost: string;
}
