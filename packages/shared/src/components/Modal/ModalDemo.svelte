<script lang="ts">
	import Modal from '$components/Modal';
	import Button from '$components/Button';
	import Input from '$components/Input/Input.svelte';

	let open = true;

	function handleClick() {
		open = true;
	}
</script>

<span aria-label="Hey tooltip!" data-microtip-position="top" role="tooltip">
	<Button on:click={() => (open = true)}>open modal</Button>
</span>

<Modal bind:open>
	<svelte:fragment slot="header">modal header</svelte:fragment>

	{#each Array(2) as _}
		<p class="m-2">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos maxime quis placeat
			praesentium vel repellat ipsum. Unde incidunt repellendus illum! Ipsum autem quo voluptatum
			enim quia modi dicta veritatis culpa?
		</p>

		<Input />
	{/each}

	<svelte:fragment slot="footer">
		<Button on:click={() => (open = false)} disabled>Close</Button>
		<Button on:click={() => (open = false)}>Close</Button>
	</svelte:fragment>
</Modal>
