import type { Handle } from '@sveltejs/kit';
import { JWT_ACCESS_SECRET, INTERNAL_ADDRESSES } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { api } from '$lib/api';

const handle: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		// Remove Bearer prefix
		const token = authCookie.split(' ')[1];

		try {
			const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}

			const user = await api.getUserUsersIdGet({ id: jwtUser.id });
			if (user == undefined) {
				throw new Error('Something went wrong');
			}
			const sessionUser = {
				id: user.id,
				email: user.email
			};

			event.locals.user = sessionUser;
		} catch (error) {
			console.error(error);
		}
	}

	const ipAddress = event.getClientAddress();
	event.locals.ipAddress = ipAddress;
	event.locals.external = true;
	const ias = INTERNAL_ADDRESSES.split(',');
	for (let i = 0; i < ias.length; i++) {
		if (ipAddress == ias[i]) {
			event.locals.external = false;
			break;
		}
	}
	return await resolve(event);
};

export { handle };
