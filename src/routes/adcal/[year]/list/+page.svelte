<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    export let data: PageData;

    const { year, user, adventCalendars } = data;
</script>

<svelte:head>
	<title>{data.year}年のカレンダー一覧</title>
</svelte:head>

<section>
	<div>
		<h1>{data.year}年のカレンダー一覧</h1>
		{#if data.adventCalendars.length == 0}
			<p>投稿がありません</p>
		{/if}
        {#each data.adventCalendars as adventCalendar (adventCalendar.id)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="article" on:click={() => goto(`/adcal/${year}/${adventCalendar.category}/list`)}>
                <h2>
                    {adventCalendar.category}
                </h2>
            </div>
        {/each}
        <!-- カテゴリー作成フォームを表示 -->
        <form method="POST" action="?/create">
            <div class="group">
                <label for="category">カテゴリー</label>
                <input type="text" name="category" id="category" required />
            </div>
            <div class="submit-container">
                <button type="submit">作成</button>
            </div>
        </form>
    </div>
</section>
