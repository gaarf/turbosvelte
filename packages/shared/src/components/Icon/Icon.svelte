<!-- 
  @component an SVG icon
 -->
<script lang="ts">
	import Fa from 'svelte-fa';
	import iconDefs, { type IconName } from './icons';

	interface $$Props {
		name: IconName;
		label?: string;
	}
	export let name: IconName;
	export let label = '';
</script>

<span aria-label={label || name}>
	<Fa icon={iconDefs[name]} {...$$restProps} />
</span>
