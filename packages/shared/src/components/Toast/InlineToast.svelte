<script lang="ts">
	import uniqueId from '$utils/uniqueId';
	import { makeToast } from './store';

	interface $$Props {
		id?: string;
		assertive?: boolean;
	}

	export let assertive = false;

	export let id = uniqueId();

	function bake(content: HTMLDivElement) {
		makeToast({ id, assertive }, content);
	}
</script>

<div hidden use:bake>
	<slot />
</div>
