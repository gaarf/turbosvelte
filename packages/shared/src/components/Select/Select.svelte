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
	select:not(:focus) {
		@apply outline-2 outline-offset-1 outline-blue-400 hover:outline;
	}
	select[disabled] {
		@apply dark\:border-gray-800 pointer-events-none border-gray-400 text-gray-400;
	}

	select.wide {
		@apply w-full;
	}
</style>
