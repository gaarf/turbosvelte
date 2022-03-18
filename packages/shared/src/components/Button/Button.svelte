<!-- 
  @component a clickable button
 -->
<script lang="ts">
	interface $$Props {
		small?: boolean;
		wide?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
	}

	export let small = false;
	export let wide = false;
	export let disabled = false;
	export let type = 'button';
</script>

<button class:small class:wide on:click {disabled} {type}>
	<slot>Click Me</slot>
</button>

<style lang="postcss">
	button {
		@apply rounded-lg bg-slate-600 px-4 py-2 text-white;
	}

	button:hover {
		@apply outline outline-2 outline-blue-400;
	}

	button:active {
		@apply outline outline-1 outline-offset-1 outline-green-500;
	}

	button.small {
		@apply p-1 text-xs;
	}

	button.wide {
		@apply w-full;
	}

	button:disabled {
		@apply pointer-events-none opacity-75;
	}
</style>
