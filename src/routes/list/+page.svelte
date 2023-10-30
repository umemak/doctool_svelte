<script lang="ts">
	import type { PageData } from './$types';
    import Article from "$lib/components/Article.svelte";

	export let data: PageData;

	const { user, articles } = data;
</script>

<svelte:head>
	<title>List page</title>
</svelte:head>

<section>
	<div>
		<h1>投稿一覧</h1>
        {#each data.articles as article (article.id)}
        <Article {article} />
      {/each}
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
