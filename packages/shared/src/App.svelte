<script lang="ts">
	import BookIndex from './book/Index.svelte';
	import type { Variant, Component } from './book/mkItem';

	let Klass: Component;
	let variant: Variant;
</script>

<main>
	<nav>
		<BookIndex bind:Klass bind:variant />
	</nav>
	<section>
		{#if Klass}
			{#if variant.slot}
				<svelte:component this={Klass} {...variant.props}>
					{variant.slot}
				</svelte:component>
			{:else}
				<svelte:component this={Klass} {...variant.props} />
			{/if}
		{:else}
			<p class=" text-gray-500">Choose a component!</p>
		{/if}
	</section>
</main>

<style lang="postcss">
	main {
		@apply absolute top-0 bottom-0 flex w-full overflow-hidden;
	}
	nav {
		@apply max-w-xs overflow-x-auto px-4 py-2;
		@apply dark\:border-r-yellow-800 border-r;
	}

	section {
		@apply flex-1 overflow-auto p-2;
		@apply flex h-full items-center justify-center;
	}
</style>
