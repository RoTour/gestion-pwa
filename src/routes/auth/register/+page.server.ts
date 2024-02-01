import { AppError } from '$lib/app.error';
import { authRepository } from '$lib/modules/auth/auth.service';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';

const register: Action = async ({ request }) => {
	const form = await request.formData();
	const email = form.get('email')?.toString() ?? '';
	const username = form.get('username')?.toString() ?? '';
	const password = form.get('password')?.toString() ?? '';

	console.debug('register', { email, username, password });

	try {
		await authRepository().register(email, username, password);
	} catch (error) {
		console.error(error);
		if (error instanceof AppError) return fail(error.status, { message: error.message });
		return fail(500, {message: 'Unknown error'});
	}
	throw redirect(301, '/auth/login');
};

export const actions: Actions = {
	register
};
