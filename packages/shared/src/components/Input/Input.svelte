<!-- 
  @component an input field
 -->
<script lang="ts">
	interface $$Props {
		value?: string | number;
		disabled?: boolean;
	}

	export let value: string | number = '';
	export let disabled = false;

	$: addProps = { ...$$restProps, type: $$restProps.type || 'text' };
</script>

<input {disabled} on:focus on:input on:change bind:value {...addProps} />

<style lang="postcss">
	input {
		@apply dark\:bg-slate-600 dark\:text-gray-100 text-black;
	}
	input[disabled] {
		@apply dark\:border-gray-800 border-gray-400 text-gray-400;
	}
</style>
