<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user, article } = data;
</script>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<section>
	<div>
		<h1>{article.title}</h1>
        <p>{article.description}</p>
        <p>投稿者: {user.email}</p>
        <p>公開日: {article.show_from}</p>
        <form method="POST" action="?/download">
            <button type="submit" name="download" value="true">ファイルをダウンロード</button>
        </form>
        </div>

	<form method="POST" action="?/logout">
		<button type="submit" name="logout" value="true">Logout</button>
	</form>
</section>

<style>
	section > * {
		margin-bottom: 2rem;
	}

	form button {
		width: fit-content;
	}
</style>
