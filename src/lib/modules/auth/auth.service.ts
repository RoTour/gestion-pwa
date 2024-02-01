import { AppError } from '$lib/app.error';
import { prisma } from '$lib/clients/prisma';
import { supabase } from '$lib/clients/supabase';
import type { Session, User } from '@supabase/supabase-js';

export const authRepository = () => ({
	register: async (email: string, username: string, password: string): Promise<User> => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: 'https://gestion-pwa.vercel.app/auth/login ' }
		});
		if (error) throw new AppError(500, error.message);
		if (!data || !data.user || !data.session) {
			throw new AppError(500, 'No data returned from Supabase');
		}
		try {
			await prisma.player.create({
				data: { name: username, Resources: { create: {} } }
			});
		} catch (error) {
			if (error instanceof Error) throw new AppError(500, error.message);
			throw new AppError(500, 'Unknown error');
		}
		return data.user;
	},

	login: async (email: string, password: string): Promise<{ user: User; session: Session }> => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) throw new AppError(500, error.message);
		if (!data || !data.user || !data.session) {
			throw new AppError(500, 'No data returned from Supabase');
		}
		return data;
	}
});
