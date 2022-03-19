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

	<Toast id="onlyonce" timeout={5000}>here be a long-lived <em>Inline Toast</em></Toast>
</div>
