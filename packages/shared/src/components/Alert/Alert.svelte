<!-- 
  @component an accessible alert container
 -->
<script lang="ts">
	interface $$Props {
		assertive?: boolean;
	}

	export let assertive = false;
</script>

<div role={assertive ? 'alert' : 'status'}>
	<slot />
</div>
