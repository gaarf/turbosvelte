<script lang="ts">
	import Button from '$components/Button';
	import Input from '$components/Input';
	import { operationStore, query } from '$lib/gql';
	import { PokeTestDocument, PokemonEnum } from '@repo/graphql';

	let pokemonName: PokemonEnum = 'voltorb' as PokemonEnum;

	const op = operationStore(PokeTestDocument, { pokemon: pokemonName });

	query(op);

	function handleSubmit() {
		$op.variables = { pokemon: pokemonName };
	}
</script>

<section class="flex flex-col p-2">
	<form class="mb-2" on:submit|preventDefault={handleSubmit}>
		<Input bind:value={pokemonName} disabled={$op.fetching} />
		<Button type="submit" disabled={$op.fetching}>Submit</Button>
	</form>
	{#if $op.fetching}
		<p>Loading...</p>
	{:else if $op.error}
		<p>Oh no... {$op.error.message}</p>
	{:else}
		<div>
			<img src={$op.data?.getPokemon.sprite} alt={$op.data?.getPokemon.species} />
		</div>
		<code class="overflow-x-hidden">
			<pre>{JSON.stringify($op.data?.getPokemon, null, 2)}</pre>
		</code>
	{/if}
</section>
