<!-- 
  @component a thing that can be dismissed
 -->
<script lang="ts">
	import clickOutside from '$utils/clickOutside';
	import { createEventDispatcher } from 'svelte';

	interface $$Props {
		outside?: boolean;
		escape?: boolean;
		inside?: boolean;
	}

	export let outside = false;
	export let escape = false;
	export let inside = false;

	interface $$Events {
		dismissed: CustomEvent;
	}

	const dispatch = createEventDispatcher();

	function handleDismiss() {
		dispatch('dismissed');
	}

	function handleClickInside() {
		if (inside) {
			handleDismiss();
		}
	}

	function handleClickOutside() {
		if (outside) {
			handleDismiss();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (escape && e.key === 'Escape') {
			handleDismiss();
		}
	}
</script>

<div
	class="dismissable"
	class:inside
	use:clickOutside={handleClickOutside}
	on:click={handleClickInside}
>
	<slot />
</div>
<svelte:window on:keydown={handleKeyDown} />

<style lang="postcss">
	.dismissable.inside {
		@apply cursor-pointer select-none;
	}
</style>
