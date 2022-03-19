<script lang="ts">
	import { ToastContainer } from '$components/Toast';
	import DarkToggle from '$components/DarkToggle';
	import BookIndex from './book/Index.svelte';
	import Render from './book/Render.svelte';
	import type { Variant, Component } from './book/mkItem';

	let Klass: Component;
	let variant: Variant;
</script>

<main>
	<nav>
		<DarkToggle />
		<BookIndex bind:Klass bind:variant />
	</nav>
	<section>
		{#if Klass}
			<Render {Klass} {variant} />
		{:else}
			<p class="choose">Choose a component!</p>
		{/if}
	</section>
</main>

<ToastContainer />

<style lang="postcss">
	main {
		@apply absolute top-0 bottom-0 flex w-full overflow-hidden;
	}
	nav {
		@apply max-w-xs overflow-x-auto px-4 py-2;
		@apply flex flex-col gap-4;
		@apply dark\:border-r-yellow-800 border-r;
	}

	section {
		@apply flex-1 overflow-auto p-2;
		@apply flex h-full items-center justify-center;
	}

	.choose {
		@apply text-gray-500;
	}
</style>
