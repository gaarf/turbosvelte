<!-- 
  @component a clickable button
 -->
<script lang="ts">
	interface $$Props {
		small?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit';
	}

	export let small = false;
	export let disabled = false;
	export let type = 'button';
</script>

<button class:small on:click {disabled} {type}>
	<slot>Click Me</slot>
</button>

<style lang="postcss">
	button {
		@apply rounded-lg bg-slate-600 p-1 text-white;
	}

	button:hover {
		@apply outline outline-2 outline-blue-400;
	}

	button:active {
		@apply outline outline-1 outline-offset-1 outline-green-500;
	}

	button.small {
		@apply text-sm;
	}

	button:disabled {
		@apply pointer-events-none opacity-75;
	}
</style>
