<!-- 
  @component a thing with a close button
 -->
<script lang="ts">
	import Button from '$components/Button';
	import Icon from '$components/Icon';
	import clickOutside from '$utils/clickOutside';
	import { createEventDispatcher, onDestroy } from 'svelte';

	interface $$Props {
		outside?: boolean;
		noButton?: boolean;
	}

	export let outside = false;
	export let noButton = false;

	interface $$Events {
		dismissed: CustomEvent;
	}

	const dispatch = createEventDispatcher();

	let dismissed = false;

	function handleDismiss() {
		dispatch('dismissed');
		dismissed = true;
	}

	function handleClickOutside() {
		if (outside) {
			handleDismiss();
		}
	}

	onDestroy(handleDismiss);
</script>

{#if !dismissed}
	<div class="flex" use:clickOutside={handleClickOutside}>
		<slot />
		{#if !noButton}
			<div class="ml-2">
				<Button small on:click={handleDismiss}><Icon name="close" /></Button>
			</div>
		{/if}
	</div>
{/if}
