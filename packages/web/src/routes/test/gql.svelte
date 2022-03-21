<script lang="ts">
	import Button from '$components/Button';
	import Input from '$components/Input';
	import { gql, operationStore, query } from '$lib/gql';

	let pokemonName = 'voltorb';

	const op = operationStore(
		gql`
			query ($pokemon: PokemonEnum!) {
				getPokemon(pokemon: $pokemon) {
					num
					species
					types
					baseStats {
						hp
						attack
						defense
						specialattack
						specialdefense
						speed
					}
					flavorTexts {
						game
						flavor
					}
					sprite
				}
			}
		`,
		{ pokemon: pokemonName }
	);

	query(op);

	function handleSubmit() {
		$op.variables = { pokemon: pokemonName };
	}

	let pokemonData: Record<string, string>; // not really...
	$: pokemonData = $op.data?.getPokemon || {};
</script>

<section class="flex flex-col p-2">
	<form class="mb-2" on:submit|preventDefault={handleSubmit}>
		<Input bind:value={pokemonName} disabled={$op.fetching} />
		<Button icon="flag" type="submit" disabled={$op.fetching}>Submit</Button>
	</form>
	{#if $op.fetching}
		<p>Loading...</p>
	{:else if $op.error}
		<p>Oh no... {$op.error.message}</p>
	{:else}
		<div>
			<img src={pokemonData.sprite} alt={pokemonData.species} />
		</div>
		<code class="overflow-x-hidden">
			<pre>{JSON.stringify(pokemonData, null, 2)}</pre>
		</code>
	{/if}
</section>
