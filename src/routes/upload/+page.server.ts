import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { s3 } from '$lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AWS_ENDPOINT, S3_BUCKET_NAME } from '$env/static/private';
import { ulid } from 'ulid'
import { api } from '$lib/api';
import type { UserResponse } from '$lib/openapi';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	let users = await api.getUsersUsersGet() as UserResponse[];
	// ログインユーザーを除外
	users = users.filter(u => u.id !== user.id);
	return {
		users: users
	};
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('AuthorizationToken');

		throw redirect(302, '/login');
	},
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
		let objPath = "";
		if (AWS_ENDPOINT === "") {
			// S3
			objPath = ulid().toLowerCase();
		} else {
			// MinIO
			objPath = S3_BUCKET_NAME + "/" + ulid().toLowerCase();
		}
		const command = new PutObjectCommand({
			Bucket: S3_BUCKET_NAME,
			Key: objPath,
			Body: Buffer.from(await file.arrayBuffer())
		});
		try {
			const response = await s3.send(command);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
		// データベースに登録
		const article = await api.createArticleArticlesPost({articleCreate: {
			title: formData.title as string,
			description: formData.description as string,
			path: objPath,
			filename: file.name,
			authorId: user.id,
			allowExternal: formData.allow_external === "on" ? true : false,
			showFrom: formData.show_from === "" ? null : new Date(formData.show_from as string),
			showUntil: formData.show_until === "" ? null : new Date(formData.show_until as string),
			reviewOk: formData.review === "on" ? false : true,
		}});
		if (formData.review === "on") {
			const review = await api.createReviewReviewsPost({reviewCreate:{
				reviewerId: formData.reviewer as string,
				articleId: article.id,
			}})
		}
		// 詳細ページにリダイレクト
		throw redirect(302, '/view/' + article.id);
	}
};
