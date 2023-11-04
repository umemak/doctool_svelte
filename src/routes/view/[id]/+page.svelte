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
		<p>公開日: {article.show_from}</p>
		<button on:click={downloadGET}>ファイルをダウンロード</button>
		<!-- <form method="POST" action="?/download">
            <button type="submit" name="download" value="true">ファイルをダウンロード</button>
        </form> -->
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
