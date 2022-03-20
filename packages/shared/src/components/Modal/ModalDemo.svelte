<script lang="ts">
	import Modal from '$components/Modal';
	import Button from '$components/Button';

	let open = true;

	function handleClick() {
		open = true;
	}
</script>

<Button on:click={handleClick}>open modal</Button>

<Modal bind:open>
	<svelte:fragment slot="header">modal header</svelte:fragment>

	{#each Array(2) as _}
		<p class="m-2">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos maxime quis placeat
			praesentium vel repellat ipsum. Unde incidunt repellendus illum! Ipsum autem quo voluptatum
			enim quia modi dicta veritatis culpa?
		</p>
	{/each}

	<svelte:fragment slot="footer">modal footer</svelte:fragment>
</Modal>
