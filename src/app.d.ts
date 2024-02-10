// See https://kit.svelte.dev/docs/types#app

import type { User } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface ApiResponse <T> {
			message: string;
			data?: T;
		}
	}
}

export {};
