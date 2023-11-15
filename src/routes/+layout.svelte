<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main>
	<nav>
		<a href="/">Home</a>
		{#if data.user}
			<a href="/list">投稿一覧</a>
			<a href="/upload">投稿</a>
			<a href="/adcal/2023/list">アドベントカレンダー2023</a>
			<a href="/logout">Logout</a>
			<div>{data.user.email}</div>
		{:else}
			<a href="/signup">Sign Up</a>
			<a href="/login">Log In</a>
		{/if}
		{#if data.external}
			<div>外部接続({data.ipAddress})</div>
		{:else}
			<div>内部接続({data.ipAddress})</div>
		{/if}
	</nav>

	<slot />
</main>

<style>
	nav {
		display: flex;
		gap: 1rem;
	}

	form {
		display: block;
		padding: 0;
		background-color: transparent;
	}

	form button {
		padding: 0;
		background-color: transparent;
		color: inherit;
	}
</style>
