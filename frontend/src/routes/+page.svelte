<script>
	// @ts-nocheck
	import PokemanCard from '$lib/components/PokemanCard.svelte';
	import { pokemon } from '$src/stores/pokestore';

	let searchTerm = '';
	let filteredPokemon = [];

	$: {
		console.log(searchTerm);
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
	<title>Svelte Kit Pokedex</title>
</svelte:head>

<h1 class="text-4xl text-white font-bold text-center my-8 mt-10">Pokédex</h1>
<input
	class="w-full rounded-full text-lg p-2 border-2 border-gray-200"
	bind:value={searchTerm}
	type="text"
	placeholder="Search Pokemon"
/>
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>
