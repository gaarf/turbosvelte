<!-- 
  @component a select field
 -->
<script lang="ts">
	interface $$Props {
		wide?: boolean;
		value?: unknown;
		disabled?: boolean;
	}

	export let value: unknown = undefined;
	export let disabled = false;
	export let wide = false;
</script>

<select {disabled} class:wide on:focus on:blur on:change bind:value {...$$restProps}>
	<slot />
</select>

<style lang="postcss">
	select {
		@apply dark\:bg-slate-800 dark\:text-gray-100 text-black;
		@apply rounded-md;
	}

	select:hover:not(:focus-visible) {
		@apply outline outline-2 outline-offset-1;
		@apply dark\:outline-blue-900 outline-blue-300;
	}

	select:disabled {
		@apply dark\:border-gray-800 border-gray-400 text-gray-400;
		@apply pointer-events-none;
	}

	select.wide {
		@apply w-full;
	}
</style>
