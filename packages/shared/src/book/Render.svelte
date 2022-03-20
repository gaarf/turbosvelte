<script lang="ts">
	import type { Variant, Component } from './mkItem';

	export let Klass: Component;
	export let variant: Variant;

	$: {
		console.groupEnd();
		console.group(`${Klass.name}/${variant.name}`);
		console.debug(variant);
	}

	function handleEvent(e: Event) {
		console.info(e.type, e.target);
	}
</script>

{#if variant.content}
	<svelte:component
		this={Klass}
		{...variant.props}
		on:click={handleEvent}
		on:focus={handleEvent}
		on:blur={handleEvent}
		on:input={handleEvent}
		on:change={handleEvent}
	>
		{variant.content}
	</svelte:component>
{:else}
	<svelte:component
		this={Klass}
		{...variant.props}
		on:click={handleEvent}
		on:focus={handleEvent}
		on:blur={handleEvent}
		on:input={handleEvent}
		on:change={handleEvent}
	/>
{/if}
