import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AWS_REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, AWS_ENDPOINT, S3_BUCKET_NAME } from '$env/static/private';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	const articles = await db.article.findMany()
	return {
		user: user,
		articles: articles,
	};
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('AuthorizationToken');

		throw redirect(302, '/login');
	},
	upload: async (event) => {
		// アップロードするファイル情報の取得
		const formData = Object.fromEntries(await event.request.formData());
		const file = formData.file as File;
		const fileName = file.name;
		// S3にアップロード
		const client = new S3Client({
			region: AWS_REGION,
			credentials: {
				accessKeyId: ACCESS_KEY_ID,
				secretAccessKey: ACCESS_KEY_SECRET
			},
			endpoint: AWS_ENDPOINT
		});
		const command = new PutObjectCommand({
			Bucket: "demo", //S3_BUCKET_NAME,
			Key: "demo/test.txt", //fileName,
			Body: "test",//Buffer.from(await file.arrayBuffer())
		});
		try {
			const response = await client.send(command);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
		// データベースに登録
		// 一覧ページにリダイレクト
	}
};
