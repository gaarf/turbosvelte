<!-- 
  @component an input field
 -->
<script lang="ts">
	interface $$Props {
		wide?: boolean;
		value?: string;
		disabled?: boolean;
		area?: boolean;
	}

	export let value = '';
	export let disabled = false;
	export let wide = false;
	export let area = false;

	$: inputProps = { ...$$restProps, type: $$restProps.type || 'text' };
</script>

{#if area}
	<textarea {disabled} class:wide on:focus on:blur on:input on:change bind:value {...$$restProps} />
{:else}
	<input {disabled} class:wide on:focus on:blur on:input on:change bind:value {...inputProps} />
{/if}

<style lang="postcss">
	input,
	textarea {
		@apply dark\:bg-slate-600 dark\:text-gray-100 text-black;
		@apply rounded-sm;
	}
	input:not(:focus),
	textarea:not(:focus) {
		@apply outline-2 outline-offset-1 outline-blue-400 hover:outline;
	}
	input[disabled],
	textarea[disabled] {
		@apply dark\:border-gray-800 pointer-events-none border-gray-400 text-gray-400;
	}

	.wide {
		@apply w-full;
	}
</style>
