import { error } from '@sveltejs/kit';
import { db } from '$lib/db';
import { s3 } from '$lib/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { S3_BUCKET_NAME } from '$env/static/private';

export const GET = async ({ locals, params }) => {
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
	const command = new GetObjectCommand({
		Bucket: S3_BUCKET_NAME,
		Key: article.path,
	});
	try {
		const response = await s3.send(command);
		return new Response(response.Body?.transformToWebStream(),
			{
				headers: {
					"Content-Type": "application/octet-stream",
					"Content-Disposition": "attachement; filename=" + article.title,
				}
			});
	} catch (err) {
		console.error(err);
	}
};
