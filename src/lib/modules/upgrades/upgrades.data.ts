import type { EnumUpgradeType } from '@prisma/client';
import type { UpgradeLevel } from './entities/UpgradeLevel.entity';
import type { UpgradeBoost } from './dto/UpgradeBoost.dto';

export const UpgradesCosts: Record<EnumUpgradeType, Record<number, UpgradeLevel>> = {
	PSV_INC: {
		1: {
			costs: [
				{ resource: 'GOLD', amount: 100_000 },
				{ resource: 'WOOD', amount: 1_000_000 },
				{ resource: 'MARBLE', amount: 1_000_000 },
				{ resource: 'WINE', amount: 1_000_000 },
				{ resource: 'SULFUR', amount: 1_000_000 },
				{ resource: 'CRYSTAL', amount: 1_000_000 }
			]
		},
		2: {
			costs: [
				{ resource: 'GOLD', amount: 1_000_000 },
				{ resource: 'WOOD', amount: 10_000_000 },
				{ resource: 'MARBLE', amount: 10_000_000 },
				{ resource: 'WINE', amount: 10_000_000 },
				{ resource: 'SULFUR', amount: 10_000_000 },
				{ resource: 'CRYSTAL', amount: 10_000_000 }
			]
		},
		3: {
			costs: [
				{ resource: 'GOLD', amount: 10_000_000 },
				{ resource: 'WOOD', amount: 100_000_000 },
				{ resource: 'MARBLE', amount: 100_000_000 },
				{ resource: 'WINE', amount: 100_000_000 },
				{ resource: 'SULFUR', amount: 100_000_000 },
				{ resource: 'CRYSTAL', amount: 100_000_000 }
			]
		}
	},
	EQL_PRICES: {
		1: {
			costs: [
				{ resource: 'GOLD', amount: 100_000_000 },
				{ resource: 'WOOD', amount: 1_000_000_000 },
				{ resource: 'MARBLE', amount: 1_000_000_000 },
				{ resource: 'WINE', amount: 1_000_000_000 },
				{ resource: 'SULFUR', amount: 10_000_000_000 },
				{ resource: 'CRYSTAL', amount: 10_000_000_000 }
			]
		}
	},
	MORE_PPL: {
		1: {
			costs: [
				{ resource: 'GOLD', amount: 246_800 },
				{ resource: 'WOOD', amount: 1_234_000 }
			]
		},
		2: {
			costs: [
				{ resource: 'GOLD', amount: 1_234_500 },
				{ resource: 'WOOD', amount: 6_173_000 }
			]
		},
		3: {
			costs: [
				{ resource: 'GOLD', amount: 6_172_800 },
				{ resource: 'WOOD', amount: 30_864_000 },
				{ resource: 'MARBLE', amount: 15_432_000 }
			]
		},
		4: {
			costs: [
				{ resource: 'GOLD', amount: 12_345_600 },
				{ resource: 'WOOD', amount: 61_728_000 },
				{ resource: 'MARBLE', amount: 30_864_000 }
			]
		},
		5: {
			costs: [
				{ resource: 'GOLD', amount: 24_691_200 },
				{ resource: 'WOOD', amount: 123_456_000 },
				{ resource: 'MARBLE', amount: 61_728_000 },
				{ resource: 'WINE', amount: 30_864_000 }
			]
		},
		6: {
			costs: [
				{ resource: 'GOLD', amount: 49_382_400 },
				{ resource: 'WOOD', amount: 246_912_000 },
				{ resource: 'MARBLE', amount: 123_456_000 },
				{ resource: 'WINE', amount: 61_728_000 }
			]
		},
		7: {
			costs: [
				{ resource: 'GOLD', amount: 98_764_800 },
				{ resource: 'WOOD', amount: 493_824_000 },
				{ resource: 'MARBLE', amount: 246_912_000 },
				{ resource: 'WINE', amount: 123_456_000 },
				{ resource: 'SULFUR', amount: 61_728_000 }
			]
		},
		8: {
			costs: [
				{ resource: 'GOLD', amount: 197_529_600 },
				{ resource: 'WOOD', amount: 987_648_000 },
				{ resource: 'MARBLE', amount: 493_824_000 },
				{ resource: 'WINE', amount: 246_912_000 },
				{ resource: 'SULFUR', amount: 123_456_000 }
			]
		},
		9: {
			costs: [
				{ resource: 'GOLD', amount: 395_059_200 },
				{ resource: 'WOOD', amount: 1_975_296_000 },
				{ resource: 'MARBLE', amount: 987_648_000 },
				{ resource: 'WINE', amount: 493_824_000 },
				{ resource: 'SULFUR', amount: 246_912_000 },
				{ resource: 'CRYSTAL', amount: 123_456_000 }
			]
		},
		10: {
			costs: [
				{ resource: 'GOLD', amount: 1_000_000_000 },
				{ resource: 'WOOD', amount: 10_000_000_000 },
				{ resource: 'MARBLE', amount: 10_000_000_000 },
				{ resource: 'WINE', amount: 10_000_000_000 },
				{ resource: 'SULFUR', amount: 10_000_000_000 },
				{ resource: 'CRYSTAL', amount: 10_000_000_000 }
			]
		}
	},
	PROD_BOOST: {
		1: {
			costs: [
				{ resource: 'GOLD', amount: 1_000_00 }, // 1K
				{ resource: 'WOOD', amount: 1_000_000 }, // 1K
			]
		},
		2: {
			costs: [
				{ resource: 'GOLD', amount: 10_000_00 }, // 10K
				{ resource: 'WOOD', amount: 10_000_000 }, // 10K
				{ resource: 'MARBLE', amount: 5_000_000 }, // 5K
			]
		},
		3: {
			costs: [
				{ resource: 'GOLD', amount: 100_000_00 }, // 100K
				{ resource: 'WOOD', amount: 50_000_000 }, // 50K
				{ resource: 'MARBLE', amount: 25_000_000 }, // 25K
				{ resource: 'WINE', amount: 12_500_000 }, // 12.5K
			]
		},
		4: {
			costs: [
				{ resource: 'GOLD', amount: 1_000_000_00 }, // 1M
				{ resource: 'WOOD', amount: 100_000_000 }, // 100K
				{ resource: 'MARBLE', amount: 50_000_000 }, // 50K
				{ resource: 'WINE', amount: 25_000_000 }, // 25K
				{ resource: 'SULFUR', amount: 12_500_000 }, // 12.5K
			]
		},
		5: {
			costs: [
				{ resource: 'GOLD', amount: 5_000_000_00 }, // 5M
				{ resource: 'WOOD', amount: 500_000_000 }, // 500K
				{ resource: 'MARBLE', amount: 250_000_000 }, // 250K
				{ resource: 'WINE', amount: 125_000_000 }, // 125K
				{ resource: 'SULFUR', amount: 62_500_000 }, // 62.5K
				{ resource: 'CRYSTAL', amount: 31_250_000 }, // 31.25K
			]
		},
		6: {
			costs: [
				{ resource: 'GOLD', amount: 10_000_000_00 }, // 10M
				{ resource: 'WOOD', amount: 1_000_000_000 }, // 1M
				{ resource: 'MARBLE', amount: 500_000_000 }, // 500K
				{ resource: 'WINE', amount: 250_000_000 }, // 250K
				{ resource: 'SULFUR', amount: 125_000_000 }, // 125K
				{ resource: 'CRYSTAL', amount: 62_500_000 }, // 62.5K
			]
		},
		7: {
			costs: [
				{ resource: 'GOLD', amount: 25_000_000_00 }, // 25M
				{ resource: 'WOOD', amount: 1_000_000_000 }, // 1M
				{ resource: 'MARBLE', amount: 1_000_000_000 }, // 1M
				{ resource: 'WINE', amount: 500_000_000 }, // 500K
				{ resource: 'SULFUR', amount: 250_000_000 }, // 250K
				{ resource: 'CRYSTAL', amount: 125_000_000 }, // 125K
			]
		},
		8: {
			costs: [
				{ resource: 'GOLD', amount: 50_000_000_00 }, // 50M
				{ resource: 'WOOD', amount: 1_000_000_000 }, // 1M
				{ resource: 'MARBLE', amount: 1_000_000_000 }, // 1M
				{ resource: 'WINE', amount: 1_000_000_000 }, // 1M
				{ resource: 'SULFUR', amount: 500_000_000 }, // 500K
				{ resource: 'CRYSTAL', amount: 250_000_000 }, // 250K
			]
		},
		9: {
			costs: [
				{ resource: 'GOLD', amount: 75_000_000_00 }, // 100M
				{ resource: 'WOOD', amount: 1_000_000_000 }, // 1M
				{ resource: 'MARBLE', amount: 1_000_000_000 }, // 1M
				{ resource: 'WINE', amount: 1_000_000_000 }, // 1M
				{ resource: 'SULFUR', amount: 1_000_000_000 }, // 1M
				{ resource: 'CRYSTAL', amount: 500_000_000 }, // 500K
			]
		},
		10: {
			costs: [
				{ resource: 'GOLD', amount: 100_000_000_00 }, // 100M
				{ resource: 'WOOD', amount: 10_000_000_000 }, // 10M
				{ resource: 'MARBLE', amount: 10_000_000_000 }, // 10M
				{ resource: 'WINE', amount: 10_000_000_000 }, // 10M
				{ resource: 'SULFUR', amount: 10_000_000_000 }, // 10M
				{ resource: 'CRYSTAL', amount: 10_000_000_000 } // 10M
			]
		}
	}
};

export const UpgradesBoosts: Record<
	EnumUpgradeType,
	Record<number, UpgradeBoost>
> = {
	PSV_INC: {
		1: {
			value: 1.001,
			label: 'Or en banque x1.001 toutes les 1h'
		},
		2: {
			value: 1.002,
			label: 'Or en banque x1.002 toutes les 1h'
		},
		3: {
			value: 1.003,
			label: 'Or en banque x1.003 toutes les 1h'
		},
		4: {
			value: 1.004,
			label: 'Or en banque x1.004 toutes les 1h'
		},
		5: {
			value: 1.005,
			label: 'Or en banque x1.005 toutes les 1h'
		}
	},
	EQL_PRICES: {
		1: {
			value: -1,
			label: 'Prix des ressources -1 [gold] à l\'achat'
		}
	},
	MORE_PPL: {
		1: {
			value: 75,
			label: '75 [citizen] (+25)'
		}, // + 25
		2: {
			value: 100,
			label: '100 [citizen] (+25)'
		}, // + 25
		3: {
			value: 145,
			label: '145 [citizen] (+45)'
		}, // + 45
		4: {
			value: 200,
			label: '200 [citizen] (+55)'
		}, // + 55
		5: {
			value: 280,
			label: '280 [citizen] (+80)'
		}, // + 80
		6: {
			value: 370,
			label: '370 [citizen] (+90)'
		}, // + 90
		7: {
			value: 470,
			label: '470 [citizen] (+100)'
		}, // + 100
		8: {
			value: 605,
			label: '605 [citizen] (+135)'
		}, // + 135
		9: {
			value: 755,
			label: '755 [citizen] (+150)'
		}, // + 150
		10: {
			value: 1000,
			label: '1000 [citizen] (+245)'
		} // + 245
	},
	PROD_BOOST: {
		1: {
			value: 1.1,
			label: 'Production +10%'
		},
		2: {
			value: 1.2,
			label: 'Production +20%'
		},
		3: {
			value: 1.3,
			label: 'Production +30%'
		},
		4: {
			value: 1.4,
			label: 'Production +40%'
		},
		5: {
			value: 1.5,
			label: 'Production +50%'
		},
		6: {
			value: 1.6,
			label: 'Production +60%'
		},
		7: {
			value: 1.7,
			label: 'Production +70%'
		},
		8: {
			value: 1.8,
			label: 'Production +80%'
		},
		9: {
			value: 1.9,
			label: 'Production +90%'
		},
		10: {
			value: 2,
			label: 'Production x2'
		}
	}
};
