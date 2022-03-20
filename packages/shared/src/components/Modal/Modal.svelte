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

		<div class="outer" transition:fly={{ y: -200, duration: 300 }}>
			<Dismissable outside escape on:dismissed={() => (open = false)}>
				<div class="inner">
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
		</div>
	{/if}
</dialog>

<style lang="postcss">
	dialog {
		@apply static block h-auto w-auto bg-transparent p-0;
	}

	.backdrop {
		@apply dark\:bg-black absolute inset-0 bg-white opacity-75;
	}

	.outer {
		@apply absolute inset-0 p-10;
		@apply flex flex-col items-center justify-center;
	}

	.inner {
		@apply relative max-h-[90vh] max-w-lg;
		@apply flex flex-col shadow-lg;
		@apply rounded-lg border bg-white text-black;
	}

	.inner > div.body {
		@apply overflow-y-auto p-3;
	}
	.inner > header {
		@apply border-b p-3;
		@apply flex justify-start gap-3;
	}
	.inner > footer {
		@apply border-t p-3;
		@apply flex justify-end gap-3;
	}
</style>
