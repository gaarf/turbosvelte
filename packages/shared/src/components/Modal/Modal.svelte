<!-- 
  @component a modal
 -->
<script lang="ts">
	import Dismissable from '$components/Dismissable';
	import { fade, fly } from 'svelte/transition';
	import portal from '$utils/portal';

	interface $$Props {
		open: boolean;
	}

	export let open: boolean;
</script>

<dialog use:portal class="modal" {open}>
	{#if open}
		<div class="backdrop" transition:fade={{ duration: 200 }} />

		<Dismissable outside escape on:dismissed={() => (open = false)}>
			<div
				class="container"
				in:fly={{ y: -200, duration: 500 }}
				out:fly={{ y: -200, duration: 150 }}
			>
				{#if $$slots.header}
					<header>
						<slot name="header" />
					</header>
				{/if}
				<div class="body">
					<slot />
				</div>
				{#if $$slots.footer}
					<footer>
						<slot name="footer" />
					</footer>
				{/if}
			</div>
		</Dismissable>
	{/if}
</dialog>

<style lang="postcss">
	dialog {
		@apply h-auto w-auto bg-transparent p-10;
		@apply flex flex-col items-center justify-center;
		@apply absolute bottom-0;
	}

	dialog[open] {
		@apply top-0;
	}

	.backdrop {
		@apply dark\:bg-black absolute inset-0 bg-white opacity-75;
	}

	.container {
		@apply relative max-h-[90vh] max-w-lg;
		@apply flex flex-col shadow-lg;
		@apply rounded-lg border bg-white text-black;
	}

	.container > div.body {
		@apply overflow-y-auto p-3;
	}
	.container > header {
		@apply border-b p-3;
	}
	.container > footer {
		@apply border-t p-3;
	}
</style>
