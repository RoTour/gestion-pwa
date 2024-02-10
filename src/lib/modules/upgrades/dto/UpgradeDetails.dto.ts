import type { UpgradeResource } from '../entities/UpgradeLevel.entity';
import type { UpgradeType } from '../entities/UpgradeType';

export interface UpgradeDetails {
	buildingLevel: number;
	labels: { name: string; description: string };
	nextLevelCosts: { resource: UpgradeResource; amount: number }[] | undefined;
	currentBoost: string;
	nextBoost: string;
	type: UpgradeType;
}
