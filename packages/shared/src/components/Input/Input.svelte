<!-- 
  @component an input field
 -->
<script lang="ts">
	import uniqueId from '$utils/uniqueId';

	interface $$Props {
		wide?: boolean;
		value?: string;
		disabled?: boolean;
		area?: boolean;
		datalist?: string[];
	}

	export let value = '';
	export let disabled = false;
	export let wide = false;
	export let area = false;
	export let datalist: string[] = [];

	$: listId = datalist?.length ? uniqueId() : undefined;

	$: inputProps = { ...$$restProps, type: $$restProps.type || 'text', list: listId };
</script>

{#if area}
	<textarea {disabled} class:wide on:focus on:blur on:input on:change bind:value {...$$restProps} />
{:else}
	<input {disabled} class:wide on:focus on:blur on:input on:change bind:value {...inputProps} />
{/if}

{#if listId}
	<datalist id={listId}>
		{#each datalist as value}
			<option {value} />
		{/each}
	</datalist>
{/if}

<style lang="postcss">
	input,
	textarea {
		@apply dark\:bg-slate-600 dark\:text-gray-100 text-black;
		@apply rounded-sm;
	}
	input:hover:not(:focus-visible),
	textarea:hover:not(:focus-visible) {
		@apply outline outline-2 outline-offset-1;
		@apply dark\:outline-blue-900 outline-blue-300;
	}
	input[disabled],
	textarea[disabled] {
		@apply dark\:border-gray-800 border-gray-400 text-gray-400;
		@apply pointer-events-none;
	}

	.wide {
		@apply w-full;
	}
</style>
