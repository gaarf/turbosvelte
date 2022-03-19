<!-- 
  @component declarative toast message
 -->
<script lang="ts">
	import uniqueId from '$utils/uniqueId';
	import { makeToast } from './store';
	import type { ToastProps } from './store';

	interface $$Props extends ToastProps {
		content?: never;
	}

	export let id = uniqueId();
	export let assertive = false;
	export let timeout: $$Props['timeout'] = undefined;

	function bake(content: HTMLDivElement) {
		makeToast({ id, assertive, timeout }, content);
	}
</script>

<div hidden use:bake>
	<slot />
</div>
