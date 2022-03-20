<!-- 
  @component a modal
 -->
<script lang="ts">
	import Dismissable from '$components/Dismissable';
	import { fade, fly } from 'svelte/transition';
	import portal from '$utils/portal';
	import focusTrap from '$utils/focusTrap';
	import Button from '$components/Button';

	interface $$Props {
		open: boolean;
	}

	export let open: boolean;

	function close() {
		open = false;
	}
</script>

<dialog use:portal class="modal" {open}>
	{#if open}
		<div class="backdrop" transition:fade={{ duration: 200 }} />

		<div class="outer" transition:fly={{ y: -200, duration: 300 }}>
			<Dismissable outside escape on:dismissed={close}>
				<div class="inner" use:focusTrap>
					{#if $$slots.header}
						<header>
							<slot name="header" />
							<Button icon="close" small on:click={close} />
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
		@apply absolute inset-0 bg-black opacity-75;
	}

	.outer {
		@apply absolute inset-0 p-10;
		@apply flex flex-col items-center justify-center;
	}

	.inner {
		@apply relative max-h-[90vh] max-w-lg;
		@apply flex flex-col shadow-lg;
		@apply rounded-lg border bg-white text-black;
		@apply dark\:bg-black dark\:text-white;
	}

	.inner > div.body {
		@apply overflow-y-auto p-3;
	}
	.inner > header {
		@apply dark\:border-gray-600 border-b p-3;
		@apply flex items-center justify-between gap-3;
	}
	.inner > footer {
		@apply dark\:border-gray-600 border-t p-3;
		@apply flex items-center justify-end gap-3;
	}
</style>
