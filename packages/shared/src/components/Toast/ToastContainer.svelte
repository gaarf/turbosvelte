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

<aside use:portal use:registerContainer>
	{#if $toasts.length}
		<ul>
			{#each $toasts as toastProps (toastProps.id)}
				<li>
					<Toast {...toastProps} />
				</li>
			{/each}
		</ul>
	{/if}
</aside>

<style type="postcss">
	aside {
		@apply absolute top-0 right-0;
	}
	li {
		@apply m-2;
	}
</style>
