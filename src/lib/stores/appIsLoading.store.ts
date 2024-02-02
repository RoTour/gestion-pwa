import { writable, type Writable } from 'svelte/store';

export const appIsLoading: Writable<boolean> = writable(false);