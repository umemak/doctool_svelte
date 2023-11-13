import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { api } from '$lib/api';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

	if (user) {
		throw redirect(302, '/list');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email or password'
			});
		}

		const { email, password } = formData as { email: string; password: string };
		// ログイン処理
		const resp = await api.loginLoginPost({ loginRequest: { email, password } });
		if (resp.accessToken == undefined) {
			return fail(400, {
				error: 'Login failed'
			});
		}
		// Set the cookie
		event.cookies.set('AuthorizationToken', `Bearer ${resp.accessToken}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/list');
	}
};
