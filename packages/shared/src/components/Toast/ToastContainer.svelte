<script lang="ts" context="module">
	import portal from '$utils/portal';
	import Toast from './Toast.svelte';
	import toasts from './store';

	let singletonElement: HTMLElement | null = null;

	function registerContainer(node: HTMLElement) {
		if (singletonElement) {
			throw new Error('There should be only one ToastContainer');
		}
		singletonElement = node;
		console.info('ToastContainer', node);
	}
</script>

<div use:portal>
	<section use:registerContainer>
		{#if $toasts.length}
			<ul>
				{#each $toasts as toastProps}
					<li>
						<Toast {...toastProps} />
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</div>

<style type="postcss">
	section {
		@apply absolute top-0 right-0;
	}
</style>
