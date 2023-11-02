import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AWS_REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, AWS_ENDPOINT, S3_BUCKET_NAME } from '$env/static/private';
import { ulid } from 'ulid'

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
		users: await db.user.findMany({
			where: { NOT: { id: user.id } },
		})
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
		const client = new S3Client({
			region: AWS_REGION,
			credentials: {
				accessKeyId: ACCESS_KEY_ID,
				secretAccessKey: ACCESS_KEY_SECRET,
			},
			// endpoint: AWS_ENDPOINT
		});
		let objPath = ulid().toLowerCase();
		const command = new PutObjectCommand({
			Bucket: S3_BUCKET_NAME,
			Key: objPath,
			Body: Buffer.from(await file.arrayBuffer())
		});
		try {
			const response = await client.send(command);
			console.log(response);
		} catch (err) {
			console.error(err);
		}
		// データベースに登録
		const article = await db.article.create({
			data: {
				title: formData.title as string,
				description: formData.description as string,
				path: objPath,
				filename: file.name,
				authorId: user.id,
				allow_external: formData.allow_external === "on" ? true : false,
			}
		});
		if (formData.review === "on") {
			await db.article.update({
				where: { id: article.id },
				data: {
					reviews: {
						create: {
							reviewerId: formData.reviewer as string,
							body: "",
						}
					}
				}
			});
			// 詳細ページにリダイレクト
			throw redirect(302, '/detail/' + formData.review_id);
		}
		// 一覧ページにリダイレクト
		throw redirect(302, '/list');
	}
};
