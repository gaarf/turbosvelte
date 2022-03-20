<script lang="ts">
	import type { Component, Props, Variant } from './mkItem';
	import items from './uiLibItems';
	import { onMount } from 'svelte';

	export let Klass: Component<Props> | null = null;
	export let variant: Variant | null = null;

	function handleSelect(klassName: string, varName: string) {
		const item = items.find(([one]) => one.name === klassName);
		if (item) {
			Klass = item[0];
			variant = item[1].find((one) => one.name === varName) || item[1][0];
		}
	}

	onMount(() => {
		const p = window.location.hash.match(/^#(\w+)\/(\w+)$/);
		if (p) {
			handleSelect(p[1], p[2]);
		}
	});
</script>

<ul>
	{#each items as [K, o]}
		<li>
			<details open={K.name === Klass?.name}>
				<summary>{K.name}</summary>
				<ol>
					{#each o as v}
						<li>
							<a
								href={`#${K.name}/${v.name}`}
								class:selected={Klass?.name === K.name && v.name === variant?.name}
								on:click={() => handleSelect(K.name, v.name)}>{v.name}</a
							>
						</li>
					{/each}
				</ol>
			</details>
		</li>
	{/each}
</ul>

<style lang="postcss">
	ul > li {
		@apply mb-4;
	}
	ol {
		@apply text-sm;
	}
	ol a.selected {
		@apply pointer-events-none text-amber-600;
	}
</style>
