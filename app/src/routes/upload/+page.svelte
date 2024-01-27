<script lang="ts">
	import type { PageData } from './$types';
	import MilkdownEditor from '$lib/components/MilkdownEditor.svelte';
	export let data: PageData;

	const { users } = data;
	let review = false;
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

			<MilkdownEditor />

			<div class="group">
				<label for="file">ファイル</label>
				<input type="file" name="file" id="file" required />
			</div>

			<div class="group">
				<label for="allow_external">外部公開OK</label>
				<input type="checkbox" name="allow_external" id="allow_external" />
			</div>

			<div class="group">
				<label for="review">要レビュー</label>
				<input type="checkbox" name="review" id="review" bind:checked={review} />
				<label for="reviewer">レビュー担当者</label>
				<select name="reviewer" id="reviewer" disabled={!review}>
					{#each users as user}
						<option value={user.id}>{user.email}</option>
					{/each}
				</select>
			</div>

			<div class="group">
				<label for="show_from">公開開始日時</label>
				<input type="datetime-local" name="show_from" id="show_from" />
				<label for="show_until">公開終了日時</label>
				<input type="datetime-local" name="show_until" id="show_until" />
			</div>
			<div class="submit-container">
				<button type="submit">投稿</button>
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
