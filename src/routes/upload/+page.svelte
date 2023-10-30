<script lang="ts">
	import type { PageData } from './$types';
    import Article from "$lib/components/Article.svelte";

	export let data: PageData;

	const { user, articles } = data;
</script>

<svelte:head>
	<title>Upload page</title>
</svelte:head>

<section>
	<div>
		<h1>投稿</h1>
        <form method="POST" action="?/upload" enctype="multipart/form-data">
            <div class="group">
                <label for="title">タイトル</label>
                <input type="text" name="title" id="title" required />
            </div>

            <div class="group">
                <label for="description">説明</label>
                <input type="text" name="description" id="description" required />
            </div>

            <div class="group">
                <label for="file">ファイル</label>
                <input type="file" name="file" id="file" required />
            </div>

            <div class="submit-container">
                <button type="submit">投稿</button>
            </div>
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
