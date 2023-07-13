<script>
	// @ts-nocheck
	import PokemanCard from '$lib/components/PokemanCard.svelte';
	import PokeBall from '$lib/icons/PokeBall.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import { pokemon } from '$src/stores/pokestore';
	import { Button, Dropdown, DropdownItem, Chevron, Checkbox } from 'flowbite-svelte';
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

<!-- //this is going to become my search/filter component -->
<div class="relative flex flex-col gap-8 pb-5">
	<input
		class="w-full rounded-xl text-lg p-5 border-0 focus:ring-0 focus:border-0 shadow-lg shadow-black/5"
		bind:value={searchTerm}
		type="text"
		placeholder="Search your Pokémon"
	/>
	<button
		class="absolute top-3 right-3 shadow-md hover:shadow-primary-activebutton/50 bg-primary-activebutton rounded-xl p-2 w-12 h-12"
	>
		<PokeBall Class="fill-white h-full w-full rotate-180" />
	</button>
	<div class="flex flex-row justify-between items-center">
		<div class="font-semibold text-gray-900">Ascending ▽</div>
		<div class="flex flex-row gap-2 items-center">
			<div class="font-semibold text-gray-900">from</div>
			<input placeholder="min" class="w-20 rounded-md bg-primary-background" type="text" />
			<div class="font-semibold text-gray-900">to</div>
			<input placeholder="max" class="w-20 rounded-md bg-primary-background" type="text" />
		</div>
	</div>
	<div class="flex flex-row justify-between items-center text-primary-gray font-semibold">
		<Button
			class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
			><Chevron>Type</Chevron></Button
		>
		<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
			<li>
				<Checkbox>Normal</Checkbox>
			</li>
			<li>
				<Checkbox>Fire</Checkbox>
			</li>
			<li>
				<Checkbox>Water</Checkbox>
			</li>
			<li>
				<Checkbox>Grass</Checkbox>
			</li>
			<li>
				<Checkbox>Electric</Checkbox>
			</li>
			<li>
				<Checkbox>Ice</Checkbox>
			</li>
			<li>
				<Checkbox>Fighting</Checkbox>
			</li>
			<li>
				<Checkbox>Poison</Checkbox>
			</li>
			<li>
				<Checkbox>Ground</Checkbox>
			</li>
			<li>
				<Checkbox>Flying</Checkbox>
			</li>
			<li>
				<Checkbox>Psychic</Checkbox>
			</li>
			<li>
				<Checkbox>Bug</Checkbox>
			</li>
			<li>
				<Checkbox>Rock</Checkbox>
			</li>
			<li>
				<Checkbox>Ghost</Checkbox>
			</li>
			<li>
				<Checkbox>Dark</Checkbox>
			</li>
			<li>
				<Checkbox>Dragon</Checkbox>
			</li>
			<li>
				<Checkbox>Steel</Checkbox>
			</li>
			<li>
				<Checkbox>Fairy</Checkbox>
			</li>
		</Dropdown>

		<div
			class="bg-white h-10 w-32 flex items-center px-2 rounded-md shadow-lg shadow-primary-gray/20"
		>
			Weaknesses
		</div>
		<div
			class="bg-white h-10 w-32 flex items-center px-2 rounded-md shadow-lg shadow-primary-gray/20"
		>
			Ability
		</div>
		<div
			class="bg-white h-10 w-32 flex items-center px-2 rounded-md shadow-lg shadow-primary-gray/20"
		>
			Height
		</div>
		<div
			class="bg-white h-10 w-32 flex items-center px-2 rounded-md shadow-lg shadow-primary-gray/20"
		>
			Weight
		</div>

		<button
			class="h-full w-auto p-[5px] aspect-square rounded-md flex items-center justify-center bg-primary-gray hover:shadow-md shadow-primary-gray"
		>
			<RefreshIcon />
		</button>
	</div>
</div>

<div class="flex flex-wrap gap-8 gap-y-12 w-full justify-center py-8">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>
