import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { api } from '$lib/api';
import type { ArticleResponse, ReviewResponse } from '$lib/openapi';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	let article = await api.getArticleArticlesIdGet({ id: params.id }) as ArticleResponse | undefined;
	if (article?.deletedAt) {
		article = undefined;
	}
	// 外部接続の場合は、外部許可の記事のみ表示
	if (locals.external && article) {
		if (article.allowExternal == false) {
			article = undefined;
		}
	}
	// レビュー担当者か投稿者本人以外で、公開期間外の場合は、表示しない
	if (article?.reviews[0]?.reviewerId != user.id && article?.authorId != user.id) {
		if (article?.showFrom && article?.showFrom > new Date()) {
			article = undefined;
		}
		if (article?.showUntil && article?.showUntil < new Date()) {
			article = undefined;
		}
	}
	if (article === undefined) {
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
		const review = await api.getReviewReviewsIdGet({ id: formData.reviewId }) as ReviewResponse | undefined;
		if (review?.reviewerId != user.id) {
			throw error(401, {
				message: 'You must be a reviewer to view this page'
			});
		}
		// レビューのコメントとステータスを更新
		let approved = formData.approved === "on" ? true : false;
		await api.updateReviewReviewsIdPut({ id: formData.reviewId, reviewUpdate: {
			id: formData.reviewId as string,
			comment: formData.comment as string,
			approved: approved,
		}});
		// 記事のステータスを更新
		await api.updateArticleArticlesIdPut({ id: review.articleId, articleUpdate: {
			id: review.articleId,
			reviewOk: approved,
		}});
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
		const article = await api.getArticleArticlesIdGet({ id: formData.articleId }) as ArticleResponse | undefined;
		if (article?.authorId != user.id) {
			throw error(401, {
				message: 'You must be a reviewer to view this page'
			});
		}
		// 記事の削除日時を更新
		await api.updateArticleArticlesIdPut({ id: formData.articleId.toString(), articleUpdate: {
			id: formData.articleId.toString(),
			deletedAt: new Date(),
		}});
		throw redirect(302, '/list');
	},
};
