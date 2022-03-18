<script lang="ts">
	import Button from '$components/Button';
	import Toast, { makeToast } from '$components/Toast';

	let assertive = false;
	function handleClick() {
		makeToast({
			assertive,
			content: `${assertive ? 'assertive' : 'regular'} toast! ${Date.now()}`
		});
		assertive = !assertive;
	}
</script>

<div>
	<Button on:click={handleClick}>click for more toast</Button>

	<Toast id="onlyonce">here be an <em>Inline Toast</em></Toast>
</div>
