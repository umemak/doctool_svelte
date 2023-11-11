import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createUser } from '$lib/user.model';
import { API_SERVER, APP_KEY } from '$env/static/private';

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

        // EMPDB_APIにPOSTリクエストを送信
        const app_key = APP_KEY;
        const res = await fetch(API_SERVER + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, app_key })
        });
        // レスポンスが200番台以外の場合はエラーを返す
        if (!res.ok) {
            return fail(500, {
                error: 'Internal Server Error'
            });
        }
        // // Create a new user
        // const { error } = await createUser(email, password);

        // // If there was an error, return an invalid response
        // if (error) {
        //     return fail(500, {
        //         error
        //     });
        // }

        // Redirect to the login page
        throw redirect(302, '/login');
    }
};
