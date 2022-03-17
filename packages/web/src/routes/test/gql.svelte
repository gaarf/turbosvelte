<script lang="ts">
	import { gql, operationStore, query } from '$lib/gql';

	const helloWorld = operationStore(
		gql`
			query ($pokemon: PokemonEnum!) {
				getPokemon(pokemon: $pokemon) {
					num
					species
					types
					abilities {
						first
						second
						hidden
					}
					baseStats {
						hp
						attack
						defense
						specialattack
						specialdefense
						speed
					}
					height
					weight
					flavorTexts {
						game
						flavor
					}
					sprite
					bulbapediaPage
				}
			}
		`,
		{ pokemon: 'voltorb' }
	);

	query(helloWorld);
</script>

<section class="flex flex-col p-2">
	{#if $helloWorld.fetching}
		<p>Loading...</p>
	{:else if $helloWorld.error}
		<p>Oh no... {$helloWorld.error.message}</p>
	{:else}
		<pre>{JSON.stringify($helloWorld.data.getPokemon, null, 2)}</pre>
	{/if}
</section>
