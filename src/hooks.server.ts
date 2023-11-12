import type { Handle } from '@sveltejs/kit';
import { JWT_ACCESS_SECRET, INTERNAL_ADDRESSES, API_SERVER } from '$env/static/private';
import jwt from 'jsonwebtoken';

import { db } from '$lib/db';

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

			const url = API_SERVER + '/users/' + jwtUser.id;
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			if (res.status == 404) {
				throw new Error('User not found');
			}
			if (res.status != 200) {
				throw new Error('Something went wrong');
			}
			const user = await res.json();
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
