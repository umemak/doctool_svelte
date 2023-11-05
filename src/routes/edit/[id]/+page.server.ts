import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { s3 } from '$lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AWS_ENDPOINT, S3_BUCKET_NAME } from '$env/static/private';
import { ulid } from 'ulid'

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	// 指定idのarticleをレビュー情報も含めて取得する	
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
		users: await db.user.findMany({
			where: { NOT: { id: user.id } },
		}),
		article: article,
	};
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('AuthorizationToken');

		throw redirect(302, '/login');
	},
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
			// データベースを更新
			await db.article.update({
				where: { id: articleId },
				data: {
					title: formData.title as string,
					description: formData.description as string,
					path: objPath,
					filename: file.name,
					allow_external: formData.allow_external === "on" ? true : false,
					show_from: formData.show_from === "" ? null : new Date(formData.show_from as string),
					show_until: formData.show_until === "" ? null : new Date(formData.show_until as string),
				}
			});
		} else {
			// データベースを更新
			await db.article.update({
				where: { id: articleId },
				data: {
					title: formData.title as string,
					description: formData.description as string,
					allow_external: formData.allow_external === "on" ? true : false,
					show_from: formData.show_from === "" ? null : new Date(formData.show_from as string),
					show_until: formData.show_until === "" ? null : new Date(formData.show_until as string),
				}
			});
		}
		if (formData.review === "on") {
			await db.article.update({
				where: { id: articleId },
				data: {
					reviews: {
						create: {
							reviewerId: formData.reviewer as string,
							body: "",
						}
					}
				}
			});
		}
		// 詳細ページにリダイレクト
		throw redirect(302, '/view/' + articleId);
	}
};
