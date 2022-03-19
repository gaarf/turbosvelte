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
		@apply rounded-xl bg-slate-600 px-4 py-2 text-white;
		@apply outline-2 outline-offset-1 outline-blue-400;
		@apply ring-blue-600 hover:outline focus-visible:ring-2;
	}

	button:active {
		@apply outline outline-1;
	}

	button.small {
		@apply px-2 py-1 text-xs;
	}

	button.wide {
		@apply w-full;
	}

	button:disabled {
		@apply pointer-events-none opacity-50;
	}
</style>
