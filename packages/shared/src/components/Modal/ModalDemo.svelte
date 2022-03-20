<script lang="ts">
	import Modal from '$components/Modal';
	import Button from '$components/Button';
	import Tooltip from '$components/Tooltip';
	import Input from '$components/Input/Input.svelte';

	let open = true;

	function dismiss() {
		open = false;
	}
</script>

<Tooltip label="Hey tooltip!" position="top">
	<Button on:click={() => (open = true)}>open modal</Button>
</Tooltip>

<Modal bind:open>
	<h2 slot="header" class="text-lg">modal header</h2>

	{#each Array(5) as _}
		<p class="my-2">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos maxime quis placeat
			praesentium vel repellat ipsum. Unde incidunt repellendus illum! Ipsum autem quo voluptatum
			enim quia modi dicta veritatis culpa?
		</p>

		<Tooltip label="input field!" position="right">
			<Input />
		</Tooltip>
	{/each}

	<svelte:fragment slot="footer">
		<a href="/" on:click|preventDefault={dismiss}>Link</a>
		<Button on:click={dismiss}>Close</Button>
	</svelte:fragment>
</Modal>
