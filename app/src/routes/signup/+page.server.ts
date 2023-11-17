import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { API_SERVER, APP_KEY } from '$env/static/private';
import { SignupAPI } from '$lib/api';

export const load: PageServerLoad = (event) => {
    const user = event.locals.user;

    if (user) {
        throw redirect(302, '/list');
    }
};

export const actions: Actions = {
    default: async (event) => {
        const formData = Object.fromEntries(await event.request.formData());

        // Verify that we have an email and a password
        if (!formData.email || !formData.password) {
            return fail(400, {
                error: 'Missing email or password'
            });
        }

        const { email, password } = formData as { email: string; password: string };
        // 登録処理
		const resp = await SignupAPI.signupSignupPost({ signupRequest: { email, password } });
        if (resp.email == undefined) {
            return fail(400, {
                error: 'Signup failed'
            });
        }

        // Redirect to the login page
        throw redirect(302, '/login');
    }
};
