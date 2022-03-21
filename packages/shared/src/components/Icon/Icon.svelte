<!-- 
  @component an SVG icon
 -->
<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import iconDefs, { type IconName } from './icons';
	import type { ComponentProps } from '$utils/types';

	type IconSize = ComponentProps<Fa>['size'];

	interface $$Props {
		name: IconName;
		size?: IconSize;
		label?: string;
	}

	export let name: IconName;
	export let size: IconSize = '1x';
	export let label = '';
</script>

<span aria-label={label || name}>
	<Fa icon={iconDefs[name]} {size} />
</span>
