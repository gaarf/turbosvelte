<script lang="ts">
	import Alert from '$components/Alert';
	import Dismissable from '$components/Dismissable';
	import uniqueId from '$utils/uniqueId';
	import { dismissToast } from './store';

	interface $$Props {
		id?: string;
		content?: string;
		assertive?: boolean;
	}

	export let id = uniqueId();
	export let content: unknown = undefined;
	export let assertive = false;

	function handleDismissed() {
		dismissToast(id);
	}
</script>

<Dismissable on:dismissed={handleDismissed}>
	<Alert {assertive}>
		<slot>{content}</slot>
	</Alert>
</Dismissable>
