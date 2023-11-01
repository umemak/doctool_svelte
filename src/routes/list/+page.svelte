<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
	const { user, articles, external } = data;
</script>

<svelte:head>
	<title>List page</title>
</svelte:head>

<section>
	<div>
		<h1>投稿一覧</h1>
		{#each data.articles as article (article.id)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#if article.allow_external || !external}
				<div class="article" on:click={() => goto(`/p/${article.id}`)}>
					<h2>{article.title}</h2>
					<small>
						{article.author?.email ? `By ${article.author.email}` : 'Unknown author'}
						{article.updatedAt && ` - ${new Date(article.updatedAt).toLocaleString()}`}
					</small>
					<p>{@html article.description}</p>
				</div>
			{/if}
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

	div {
		color: inherit;
		padding: 2rem;
	}

	.article {
		background: white;
		transition: box-shadow 0.1s ease-in;
	}

	.article:hover {
		box-shadow: 1px 1px 3px #aaa;
		cursor: pointer;
	}

	.article,
	.article {
		margin-top: 2rem;
	}
</style>
