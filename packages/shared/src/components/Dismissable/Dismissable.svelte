<!-- 
  @component a thing that can be dismissed
 -->
<script lang="ts">
	import clickOutside from '$utils/clickOutside';
	import { createEventDispatcher } from 'svelte';

	interface $$Props {
		outside?: boolean;
		inside?: boolean;
	}

	export let outside = false;
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
</script>

<div use:clickOutside={handleClickOutside} on:click={handleClickInside}>
	<slot />
</div>
