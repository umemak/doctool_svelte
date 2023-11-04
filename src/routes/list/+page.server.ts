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
		where: { 
			deletedAt: null,
		},
		include: {
			author: true,
			reviews: {
				include: {
					reviewer: true
				}
			},
		},
		orderBy: { createdAt: 'desc' }
	})
	// 外部接続の場合は、外部許可の記事のみ表示
	if (event.locals.external) {
		articles = articles.filter((article) => { return article.allow_external; })
	}
	// レビュー担当者か投稿者本人以外で、公開期間外の場合は、表示しない
	articles = articles.filter((article) => {
		if (article.reviews[0]?.reviewerId != user.id && article.authorId != user.id) {
			if (article.show_from && article.show_from > new Date()) {
				return false;
			}
			if (article.show_until && article.show_until < new Date()) {
				return false;
			}
			if (article.review_ok == false) {
				return false;
			}
		}
		return true;
	})
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
