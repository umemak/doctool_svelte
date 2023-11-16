<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user, article } = data;

	async function downloadGET() {
		let res = await fetch(`/download/${encodeURIComponent(article.id)}`, {
			method: 'GET'
		});

		let blob = await res.blob();
		console.log(blob);
		var url = window.URL || window.webkitURL;
		let link = url.createObjectURL(blob);

		// generate anchor tag, click it for download and then remove it again
		let a = document.createElement('a');
		a.setAttribute('download', article.filename);
		a.setAttribute('href', link);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<section>
	<div>
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<p>投稿者: {user.email}</p>
		<p>
			公開期間: {article.showFrom ? `${new Date(article.showFrom).toLocaleString()}` : '未定義'} ～
			{article.showUntil ? `${new Date(article.showUntil).toLocaleString()}` : '未定義'}
		</p>
		<p>投稿日時: {new Date(article.createdAt).toLocaleString()}</p>
		<p>更新日時: {new Date(article.updatedAt).toLocaleString()}</p>
		<p>
			ドキュメント名: {article.filename}
		</p>
		<p>
			<button on:click={downloadGET}>ファイルをダウンロード</button>
			{article.filetype} ({article.filesize} bytes)
		</p>
		<!-- レビュー担当だったら、コメントと承認／否認のフォームを表示する -->
		{#if article.reviews[0]?.reviewerId == user.id}
			<form method="POST" action="?/review">
				<input type="hidden" name="articleId" value={article.id} />
				<input type="hidden" name="reviewId" value={article.reviews[0].id} />
				<div class="group">
					<label for="comment">コメント</label>
					<input type="text" name="comment" id="comment" />
				</div>
				<div class="group">
					<label for="approved">承認</label>
					<input type="checkbox" name="approved" id="approved" />
				</div>
				<div class="submit-container">
					<button type="submit">レビューを送信</button>
				</div>
			</form>
		{/if}
		<!-- 投稿者だったら、編集ボタンと削除ボタンを表示する -->
		{#if article.authorId == user.id}
			<form method="GET" action="/edit/{article.id}">
				<div class="submit-container">
					<button type="submit">投稿を編集</button>
				</div>
			</form>
			<form method="POST" action="?/delete">
				<input type="hidden" name="articleId" value={article.id} />
				<div class="submit-container">
					<button type="submit">投稿を削除</button>
				</div>
			</form>
		{/if}
	</div>
</section>

<style>
	section > * {
		margin-bottom: 2rem;
	}

	form button {
		width: fit-content;
	}
</style>
