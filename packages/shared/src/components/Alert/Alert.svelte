<!-- 
  @component an accessible alert container
 -->
<script lang="ts">
	interface $$Props {
		assertive?: boolean;
	}

	export let assertive = false;
</script>

<div role={assertive ? 'alert' : 'status'} class:assertive>
	<slot />
</div>

<style type="postcss">
	div {
		@apply rounded-md border p-2;
	}

	.assertive {
		@apply font-bold;
	}
</style>
