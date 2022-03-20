<!-- 
  @component a microtip wrapper
  assumes the css is present
 -->
<script lang="ts">
	type Position = 'top' | 'bottom' | 'left' | 'right';

	interface $$Props {
		label: string;
		position?: Position;
	}

	export let label: string;
	export let position = 'top';
</script>

<span role="tooltip" aria-label={label} data-microtip-position={position}><slot /></span>
