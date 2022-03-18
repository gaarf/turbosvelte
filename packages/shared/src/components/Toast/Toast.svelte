<script lang="ts">
	import Alert from '$components/Alert';
	import Dismissable from '$components/Dismissable';

	interface $$Props {
		content?: string;
	}
	function handleDismissed() {
		console.log('FIXME');
	}

	export const content = undefined;
</script>

<Alert>
	<div class="border p-1">
		<Dismissable on:dismissed={handleDismissed}>
			<slot>{content}</slot>
		</Dismissable>
	</div>
</Alert>
