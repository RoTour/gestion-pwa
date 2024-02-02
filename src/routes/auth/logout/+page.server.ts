import { COOKEYS } from '$lib/helpers/cookies.helper';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.delete(COOKEYS.authToken, { path: '/' })
	throw redirect(303, '/auth/login');
};