import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { AWS_REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, AWS_ENDPOINT, S3_BUCKET_NAME } from '$env/static/private';

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
	},
	download: async ({ locals, params }) => {
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
		// S3からダウンロード
		let objPath = "";
		let client = null;
		if (AWS_ENDPOINT === "") {
			// S3
			client = new S3Client({
				region: AWS_REGION,
				credentials: {
					accessKeyId: ACCESS_KEY_ID,
					secretAccessKey: ACCESS_KEY_SECRET,
				},
			});
			objPath = article.path;
		} else {
			// MinIO
			client = new S3Client({
				region: AWS_REGION,
				credentials: {
					accessKeyId: ACCESS_KEY_ID,
					secretAccessKey: ACCESS_KEY_SECRET,
				},
				endpoint: AWS_ENDPOINT
			});
			objPath = article.path;
		}
		const command = new GetObjectCommand({
			Bucket: S3_BUCKET_NAME,
			Key: objPath,
		});
		let str = "";
		try {
			const response = await client.send(command);
			str = await response.Body.transformToString();
			console.log(str);
		} catch (err) {
			console.error(err);
		}
		return {"data": str};
	}
};
