<script lang="ts">
	import { onMount } from 'svelte';
	import type { Variant, Component } from './mkItem';

	export let Klass: Component;
	export let variant: Variant;

	$: console.debug(Klass.name, variant);

	onMount(() => {
		console.log('mounted');
	});
</script>

{#if variant.content}
	<svelte:component this={Klass} {...variant.props}>
		{variant.content}
	</svelte:component>
{:else}
	<svelte:component this={Klass} {...variant.props} />
{/if}
