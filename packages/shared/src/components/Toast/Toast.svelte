<script lang="ts">
	import Alert from '$components/Alert';
	import Dismissable from '$components/Dismissable';
	import uniqueId from '$utils/uniqueId';
	import { onDestroy, onMount } from 'svelte';
	import { dismissToast } from './store';
	import { fly } from 'svelte/transition';

	interface $$Props {
		id?: string;
		content?: string | HTMLElement | undefined;
		assertive?: boolean;
		timeout?: number;
	}

	export let id = uniqueId();
	export let content: unknown = undefined;
	export let assertive = false;
	export let timeout = 2000;

	function handleDismiss() {
		dismissToast(id);
	}

	$: htmlContent = content instanceof HTMLElement ? content.innerHTML : content;

	let timeoutId: ReturnType<typeof setTimeout>;
	onMount(() => {
		if (timeout) {
			timeoutId = setTimeout(handleDismiss, timeout);
		}
	});
	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<Dismissable inside on:dismissed={handleDismiss}>
	<div class="toast" out:fly={{ x: 200, duration: 200 }} in:fly={{ y: -50, duration: 100 }}>
		<Alert {assertive} transparent>
			{@html htmlContent}
		</Alert>
	</div>
</Dismissable>

<style type="postcss">
	.toast {
		@apply bg-white text-black shadow-md;
		@apply max-w-[200px] overflow-hidden rounded-lg border;
		@apply dark\:bg-black dark\:text-white dark\:border-gray-500;
		@apply cursor-pointer select-none;
	}
</style>
