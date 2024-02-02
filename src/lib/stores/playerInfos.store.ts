import { type Resources, type Citizen, type Player } from '@prisma/client';
import { writable } from 'svelte/store';

export const playerInfos = writable<Player | undefined>(undefined);
export const playerResources = writable<Resources | undefined>(undefined);
export const playerCitizens = writable<Citizen[] | undefined>(undefined);
export const playerCitizensAvailable = writable<number>(0);
export const playerCitizensMax = writable<number>(0);