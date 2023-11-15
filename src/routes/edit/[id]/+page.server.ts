import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { upload } from '$lib/s3';
import { ArticlesAPI, UsersAPI,ReviewsAPI } from '$lib/api';
import type { ArticleResponse, UserResponse } from '$lib/openapi';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	// 指定idのarticleをレビュー情報も含めて取得する	
	let article = await ArticlesAPI.getArticleArticlesIdGet({ id: params.id }) as ArticleResponse | undefined;
	// let article = await db.article.findFirst({
	// 	where: {
	// 		id: params.id,
	// 		deletedAt: null,
	// 	},
	// 	include: {
	// 		reviews: {
	// 			include: {
	// 				reviewer: true
	// 			}
	// 		},
	// 	},
	// })
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
	if (article == null) {
		throw error(404, {
			message: 'Article not found'
		});
	}
	let users = await UsersAPI.getUsersUsersGet() as UserResponse[];
	// ログインユーザーを除外
	users = users.filter(u => u.id !== user.id);
	return {
		users: users,
		article: article,
	};
};

export const actions: Actions = {
	update: async (event) => {
		const user = event.locals.user;
		if (!user) {
			throw error(401, {
				message: 'You must be logged in to view this page'
			});
		}
		// アップロードするファイル情報の取得
		const formData = Object.fromEntries(await event.request.formData());
		const articleId = event.params.id;
		// ファイルが指定されていない場合は、ファイルを更新しない
		const file = formData.file as File;
		if (file.name != 'undefined') {
			// S3にアップロード
			const objPath = await upload(file);
			// データベースを更新
			await ArticlesAPI.updateArticleArticlesIdPut({ id: articleId, articleUpdate: {
				id: articleId,
				title: formData.title as string,
				description: formData.description as string,
				authorId: user.id,
				path: objPath,
				filename: file.name,
				allowExternal: formData.allow_external === "on" ? true : false,
				showFrom: formData.show_from === "" ? null : new Date(formData.show_from as string),
				showUntil: formData.show_until === "" ? null : new Date(formData.show_until as string),
				reviewOk: formData.review_ok === "on" ? true : false,
			}});
		} else {
			// データベースを更新
			await ArticlesAPI.updateArticleArticlesIdPut({ id: articleId, articleUpdate: {
				id: articleId,
				title: formData.title as string,
				description: formData.description as string,
				authorId: user.id,
				path: formData.path as string,
				filename: formData.filename as string,
				allowExternal: formData.allow_external === "on" ? true : false,
				showFrom: formData.show_from === "" ? null : new Date(formData.show_from as string),
				showUntil: formData.show_until === "" ? null : new Date(formData.show_until as string),
				reviewOk: formData.review_ok === "on" ? true : false,
			}});
		}
		if (formData.review === "on") {
			await ReviewsAPI.createReviewReviewsPost({reviewCreate:{
				reviewerId: formData.reviewer as string,
				articleId: articleId,
				comment: "",
			}})
		}
		// 詳細ページにリダイレクト
		throw redirect(302, '/view/' + articleId);
	}
};
