<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { users, article } = data;
	let review = false;

	function formatDate(date: Date) {
		if (!date) return '';
		const offset = date.getTimezoneOffset();
		const localDate = new Date(date.getTime() - offset * 60 * 1000);
		return localDate.toISOString().slice(0, 19);
	}
</script>

<svelte:head>
	<title>編集</title>
</svelte:head>

<section>
	<div>
		<h1>編集</h1>
		<form method="POST" action="?/update" enctype="multipart/form-data">
			<div class="group">
				<label for="title">タイトル</label>
				<input type="text" name="title" id="title" value={article.title} required />
			</div>

			<div class="group">
				<label for="description">説明</label>
				<input
					type="text"
					name="description"
					id="description"
					value={article.description}
					required
				/>
			</div>

			<div class="group">
				<label for="file">ファイル</label>
				<input type="file" name="file" id="file" />
			</div>

			<div class="group">
				<label for="allow_external">外部公開OK</label>
				<input
					type="checkbox"
					name="allow_external"
					id="allow_external"
					bind:checked={article.allow_external}
				/>
			</div>

			<div class="group">
				<label for="review">要レビュー</label>
				<input type="checkbox" name="review" id="review" bind:checked={review} />
				<label for="reviewer">レビュー担当者</label>
				<select name="reviewer" id="reviewer" disabled={!review}>
					{#each users as user}
						{#if user.id == article.reviews[0]?.reviewer.id}
							<option value={user.id} selected>{user.email}</option>
						{:else}
							<option value={user.id}>{user.email}</option>
						{/if}
					{/each}
				</select>
			</div>

			<div class="group">
				<label for="show_from">公開開始日時</label>
				<input type="datetime-local" name="show_from" id="show_from" value={formatDate(article.show_from)} />
				<label for="show_until">公開終了日時</label>
				<input type="datetime-local" name="show_until" id="show_until" value={formatDate(article.show_until)} />
			</div>
			<div class="submit-container">
				<button type="submit">更新</button>
			</div>
		</form>
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
