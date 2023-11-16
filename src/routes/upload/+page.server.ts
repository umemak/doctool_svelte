import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { upload } from '$lib/s3';
import { UsersAPI, ArticlesAPI, ReviewsAPI } from '$lib/api';
import type { UserResponse } from '$lib/openapi';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	let users = await UsersAPI.getUsersUsersGet() as UserResponse[];
	// ログインユーザーを除外
	users = users.filter(u => u.id !== user.id);
	return {
		users: users
	};
};

export const actions: Actions = {
	upload: async (event) => {
		const user = event.locals.user;
		if (!user) {
			throw error(401, {
				message: 'You must be logged in to view this page'
			});
		}
		// アップロードするファイル情報の取得
		const formData = Object.fromEntries(await event.request.formData());
		const file = formData.file as File;
		// S3にアップロード
		const objPath = await upload(file);
		if (objPath === "") {
			throw error(500, {
				message: 'Upload failed'
			});
		}
		// データベースに登録
		const article = await ArticlesAPI.createArticleArticlesPost({articleCreate: {
			title: formData.title as string,
			description: formData.description as string,
			path: objPath,
			filename: file.name,
			filetype: file.type,
			filesize: file.size,
			authorId: user.id,
			allowExternal: formData.allow_external === "on" ? true : false,
			showFrom: formData.show_from === "" ? null : new Date(formData.show_from as string),
			showUntil: formData.show_until === "" ? null : new Date(formData.show_until as string),
			reviewOk: formData.review === "on" ? false : true,
		}});
		if (formData.review === "on") {
			const review = await ReviewsAPI.createReviewReviewsPost({reviewCreate:{
				reviewerId: formData.reviewer as string,
				articleId: article.id,
				comment: "",
			}})
		}
		// 詳細ページにリダイレクト
		throw redirect(302, '/view/' + article.id);
	}
};
