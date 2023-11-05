<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	const { year, user, adventCalendar, adventCalendarArticles } = data;
</script>

<svelte:head>
	<title>{data.year}年{adventCalendar.category}の記事一覧</title>
</svelte:head>

<section>
	<div>
		<h1>{data.year}年{adventCalendar.category}の記事一覧</h1>
		<!-- 1から25までループしてadventCalendarArticles.dayに該当するものがあればtitleを表示、なければtitle入力とエントリーボタンのフォームを表示する -->
		{#each Array.from({ length: 25 }, (_, i) => i + 1) as day}
			<!-- 日付と曜日を表示 -->
			<div class="article">
				<h2>
					12月{day}日({new Date(parseInt(data.year), 12 - 1, day).toLocaleDateString('ja-JP', {
						weekday: 'short'
					})})
				</h2>
			</div>
			{#if adventCalendarArticles.find((article) => article.day === day)}
				<div class="article">
					<h2>
						{adventCalendarArticles.find((article) => article.day === day).title}
						by {adventCalendarArticles.find((article) => article.day === day)?.author.email}
					</h2>
				</div>
			{:else}
				<form method="POST" action="?/entry">
					<input type="hidden" name="day" value={day} />
					<div class="group">
						<label for="title">仮タイトル</label>
						<input type="text" name="title" id="title" required />
					</div>
					<div class="submit-container">
						<button type="submit">エントリー</button>
					</div>
				</form>
			{/if}
		{/each}
	</div>
</section>
