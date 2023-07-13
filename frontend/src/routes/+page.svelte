<script>
	// @ts-nocheck
	import PokemanCard from '$lib/components/PokemanCard.svelte';
	import PokeBall from '$lib/icons/PokeBall.svelte';
	import { pokemon } from '$src/stores/pokestore';

	let searchTerm = '';
	let filteredPokemon = [];

	$: {
		if (searchTerm) {
			//search the pokemon
			filteredPokemon = $pokemon.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemon];
		}
	}
</script>

<svelte:head>
	<title>Svelte Kit Pokédex</title>
</svelte:head>

<div class="relative">
	<input
		class="w-full rounded-xl text-lg p-5 border-0 focus:ring-0 focus:border-0"
		bind:value={searchTerm}
		type="text"
		placeholder="Search your Pokémon"
	/>
	<button
		class="absolute top-3 right-3 shadow-lg hover:shadow-red-700/50 bg-red-700 rounded-xl p-2 w-12 h-12"
	>
		<PokeBall Class="fill-white h-full w-full rotate-180" />
	</button>
</div>

<div class="flex flex-wrap gap-8 w-full justify-center py-8">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>
