import { type Player, type Resources, type Workforce } from '@prisma/client';
import { writable } from 'svelte/store';

export const playerInfos = writable<Player | undefined>(undefined);
export const playerResources = writable<Resources | undefined>(undefined);
export const playerWorkforces = writable<Workforce[] | undefined>(undefined);
export const playerCitizensAvailable = writable<number>(0);
export const playerCitizensMax = writable<number>(0);
export const upgradeProductionLevel = writable<number>(0);
