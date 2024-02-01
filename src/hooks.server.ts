import { supabase } from '$lib/clients/supabase';
import { COOKEYS } from '$lib/cookies.helper';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const checkAuth: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get(COOKEYS.authToken) || '';
	console.debug('checkAuth', { authCookie });
	if (!authCookie && !event.url.pathname.includes('/auth/')) {
		console.debug('checkAuth', 'redirecting to login');
		// throw redirect(303, '/auth/login');
	}
	const {data, error} = await supabase.auth.getUser(authCookie)
	if ((error || !data || !data.user) && !event.url.pathname.includes('/auth/')) {
		console.error(error);
		throw redirect(303, '/auth/login');
	}
	return resolve(event)
};

export const handle = sequence(checkAuth);
