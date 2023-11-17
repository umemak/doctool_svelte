import { error } from '@sveltejs/kit';
import { download } from '$lib/s3';
import { ArticlesAPI } from '$lib/api';
import type { ArticleResponse } from '$lib/openapi';

export const GET = async ({ locals, params }) => {
	const user = locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}
	let article = await ArticlesAPI.getArticleArticlesIdGet({ id: params.id }) as ArticleResponse | undefined;
	// 外部接続の場合は、外部許可の記事のみ表示
	if (locals.external && article) {
		if (article.allowExternal == false) {
			article = undefined;
		}
	}
	if (article == null) {
		throw error(404, {
			message: 'Article not found'
		});
	}
	// S3からダウンロード
	return await download(article.path, article.title);
};
