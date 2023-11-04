import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	let article = await db.article.findFirst({
		where: { id: params.id }
	})
	// 外部接続の場合は、外部許可の記事のみ表示
	if (locals.external && article) {
		if (article.allow_external == false) {
			article = null;
		}
	}
	if (article == null) {
		throw error(404, {
			message: 'Article not found'
		});
	}
	return {
		user: user,
		article: article,
	};
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('AuthorizationToken');

		throw redirect(302, '/login');
	}
};
