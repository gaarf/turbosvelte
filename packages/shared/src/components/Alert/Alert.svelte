<!-- 
  @component an accessible alert container
 -->
<script lang="ts">
	interface $$Props {
		transparent?: boolean;
		assertive?: boolean;
	}

	export let transparent = false;
	export let assertive = false;
</script>

<div role={assertive ? 'alert' : 'status'} class:assertive class:transparent>
	<slot />
</div>

<style type="postcss">
	div {
		@apply w-full p-2;
	}

	div:not(.transparent) {
		@apply bg-green-600 text-white;
	}

	.assertive:not(.transparent) {
		@apply bg-red-500;
	}

	.assertive {
		@apply font-bold;
	}
</style>
