import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	let articles = await db.article.findMany({
		include: { author: true },
		orderBy: { createdAt: 'desc' }
	})
	// 外部接続の場合は、外部許可の記事のみ表示
	if (event.locals.external) {
		articles = articles.map((article) => { article.allow_external; return article; })
	}
	return {
		user: user,
		articles: articles,
	};
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('AuthorizationToken');

		throw redirect(302, '/login');
	}
};
