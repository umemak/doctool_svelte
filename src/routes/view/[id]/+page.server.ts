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
		where: { 
			id: params.id,
			deletedAt: null,
		},
		include: {
			reviews: {
				include: {
					reviewer: true
				}
			},
		},
	})
	// 外部接続の場合は、外部許可の記事のみ表示
	if (locals.external && article) {
		if (article.allow_external == false) {
			article = null;
		}
	}
	// レビュー担当者か投稿者本人以外で、公開期間外の場合は、表示しない
	if (article?.reviews[0]?.reviewerId != user.id && article?.authorId != user.id) {
		if (article?.show_from && article?.show_from > new Date()) {
			article = null;
		}
		if (article?.show_until && article?.show_until < new Date()) {
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
	},
	review: async (event) => {
		// レビュー担当者のみ
		const user = event.locals.user;
		if (!user) {
			throw error(401, {
				message: 'You must be logged in to view this page'
			});
		}
		// レビュー取得
		const formData = Object.fromEntries(await event.request.formData());
		const review = await db.review.findFirst({
			where: { id: formData.reviewId.toString() },
			include: {
				article: true,
			}
		})

		if (review?.reviewerId != user.id) {
			throw error(401, {
				message: 'You must be a reviewer to view this page'
			});
		}
		// レビューのコメントとステータスを更新
		let approved = formData.approved === "on" ? true : false;
		await db.review.update({
			where: { id: formData.reviewId.toString() },
			data: {
				body: formData.comment.toString(),
				approved: approved,
			}
		});
		// 記事のステータスを更新
		await db.article.update({
			where: { id: review.articleId },
			data: {
				review_ok: approved,
			}
		});
		throw redirect(302, '/view/' + review.articleId);
	},
	delete: async (event) => {
		// 投稿者本人のみ
		const user = event.locals.user;
		if (!user) {
			throw error(401, {
				message: 'You must be logged in to view this page'
			});
		}
		// 記事取得
		const formData = Object.fromEntries(await event.request.formData());
		const article = await db.article.findFirst({
			where: { id: formData.articleId.toString() },
		})

		if (article?.authorId != user.id) {
			throw error(401, {
				message: 'You must be a reviewer to view this page'
			});
		}
		// 記事の削除日時を更新
		await db.article.update({
			where: { id: formData.articleId.toString() },
			data: {
				deletedAt: new Date(),
			}
		});
		throw redirect(302, '/list');
	},
};
