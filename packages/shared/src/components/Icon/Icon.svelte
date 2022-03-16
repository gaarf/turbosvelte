<!-- 
  @component an SVG icon
 -->
<script lang="ts">
	import Fa from 'svelte-fa';
	import iconDefs, { type IconName } from './icons';

	interface $$Props {
		name: IconName;
	}

	export let name: IconName;
</script>

<Fa icon={iconDefs[name]} />
