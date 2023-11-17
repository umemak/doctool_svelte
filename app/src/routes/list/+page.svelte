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
		{#if data.articles.length == 0}
			<p>投稿がありません</p>
		{/if}
		{#each data.articles as article (article.id)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#if article.allowExternal || !external}
				<div class="article" on:click={() => goto(`/view/${article.id}`)}>
					<h2>
						{article.title}
						{#if !article.reviewOk && article.reviews[0]?.reviewerId == user.id}
							<small>[要レビュー]</small>
						{/if}
						{#if !article.reviewOk && article.authorId == user.id}
							<small>[レビュー待ち]</small>
						{/if}
					</h2>
					<small>
						{article.author?.email ? `${article.author.email}` : 'Unknown author'} が
						{article.showFrom
							? `${new Date(article.showFrom).toLocaleString()} に公開`
							: `${new Date(article.createdAt).toLocaleString()} に作成`}
					</small>
					<p>{@html article.description}</p>
				</div>
			{/if}
		{/each}
	</div>
</section>

<style>
	section > * {
		margin-bottom: 2rem;
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
