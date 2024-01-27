<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { nord } from '@milkdown/theme-nord';
	import { gfm } from '@milkdown/preset-gfm';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { upload } from '@milkdown/plugin-upload';

	let editor: Editor | undefined;
	let content = '# Hello, Milkdown in SvelteKit!';

	onMount(async () => {
		editor = await Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, document.getElementById('milkdown'));
				ctx.set(defaultValueCtx, content);
			})
			.config(nord)
			.use(gfm)
			.use(listener)
			.use(upload)
			.create();

		editor.action((x: any) => {
			if (x.hasUpdated) {
				content = x.get(defaultValueCtx);
			}
		});
	});

	// エディタの内容を外部に公開するための関数
	export function getMarkdown() {
		return content;
	}
</script>

<div id="milkdown"></div>
