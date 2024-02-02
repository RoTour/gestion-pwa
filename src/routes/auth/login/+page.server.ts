import { AppError } from '$lib/app.error';
import { COOKEYS } from '$lib/helpers/cookies.helper';
import { authRepository } from '$lib/modules/auth/auth.service';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';

const login: Action = async ({ request, cookies }) => {
	const form = await request.formData();

	const email = form.get('email')?.toString() ?? '';
	const password = form.get('password')?.toString() ?? '';

	try {
		const {user, session} = await authRepository().login(email, password);
		console.debug('login success', user, session);
		cookies.set(COOKEYS.authToken, session.access_token, { path: '/', maxAge: 60 * 60 * 24 * 30 });
	}	catch (error) {
		console.error(error);
		if (error instanceof AppError) return fail(error.status, { message: error.message });
		return fail(500, {message: 'Unknown error'});
	}
	throw redirect(301, '/');
};

export const actions: Actions = {
	login
}