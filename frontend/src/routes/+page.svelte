<script>
	// @ts-nocheck
	import PokemanCard from '$lib/components/PokemanCard.svelte';
	import PokemanDetailedCard from '$lib/components/PokemanDetailedCard.svelte';
	import PokeBall from '$lib/icons/PokeBall.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import { pokemon } from '$src/stores/pokestore';
	import {
		Button,
		Dropdown,
		DropdownItem,
		Chevron,
		Checkbox,
		DropdownDivider
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	let searchTerm = '';
	let filteredPokemon = [];

	let pokeId = 1;
	let startFlag = false;

	$: {
		if (pokeId != 1 || startFlag == true) {
			fetchData();
			startFlag = true;
		}
	}

	let pokemanGenus;
	let pokeman;

	async function fetchData() {
		const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
		const res = await fetch(url);
		pokeman = await res.json();

		const genusUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`;
		const gRes = await fetch(genusUrl);
		pokemanGenus = await gRes.json();
	}

	$: {
		if (searchTerm) {
			filteredPokemon = $pokemon.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredPokemon = [...$pokemon];
		}
	}
	onMount(() => {
		fetchData();
		filteredPokemon = [...$pokemon];
	});
</script>

<svelte:head>
	<title>Svelte Kit Pokédex</title>
</svelte:head>

<div class="w-2/3">
	<div class="relative flex flex-col gap-8 pb-5">
		<!-- this is going - become my search component -->

		<input
			class="w-full rounded-xl text-lg p-5 border-0 focus:ring-0 focus:border-0 shadow-lg shadow-black/5"
			bind:value={searchTerm}
			type="text"
			placeholder="Search your Pokémon"
		/>
		<button
			class="absolute -p-3 right-3 top-2 shadow-md hover:shadow-primary-activebutton/50 bg-primary-activebutton rounded-xl p-2 w-12 h-12"
		>
			<PokeBall Class="fill-white h-full w-full rotate-180" />
		</button>

		<!-- filter order by types, power level, weight, height -->
		<div class="flex justify-between items-center">
			<div>
				<Button
					class="w-32 justify-between focus:border-0 focus:ring-0 text-gray-900 font-semibold text-md px-2 py-2 "
					><Chevron>Ascending</Chevron></Button
				>
				<Dropdown>
					<DropdownItem>Descending</DropdownItem>
					<DropdownDivider />
					<DropdownItem>Default</DropdownItem>
				</Dropdown>
			</div>
			<div class="flex flex-row gap-2 items-center">
				<div class="font-semibold text-gray-900">from</div>
				<input placeholder="min" class="w-20 rounded-md bg-primary-background" type="text" />
				<div class="font-semibold text-gray-900">to</div>
				<input placeholder="max" class="w-20 rounded-md bg-primary-background" type="text" />
			</div>
		</div>
		<!-- filter categories -->
		<div class="flex flex-wrap justify-between items-center text-primary-gray font-semibold gap-3">
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Region</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox>All</Checkbox>
					</li>
					<li>
						<Checkbox>Kanto</Checkbox>
					</li>
					<li>
						<Checkbox>Jhoto</Checkbox>
					</li>
					<li>
						<Checkbox>Hoenn</Checkbox>
					</li>
					<li>
						<Checkbox>Sinnoh</Checkbox>
					</li>
					<li>
						<Checkbox>Unova</Checkbox>
					</li>
					<li>
						<Checkbox>Kalos</Checkbox>
					</li>
					<li>
						<Checkbox>Alola</Checkbox>
					</li>
					<li>
						<Checkbox>Galar</Checkbox>
					</li>
					<li>
						<Checkbox>Paldea</Checkbox>
					</li>
				</Dropdown>
			</div>
			<div>
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
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Weaknesses</Chevron></Button
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
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Height</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox>0.0 m - 0.5 m</Checkbox>
					</li>
					<li>
						<Checkbox>0.6 m - 1.2 m</Checkbox>
					</li>
					<li>
						<Checkbox>1.3 m - 1.8 m</Checkbox>
					</li>
					<li>
						<Checkbox>1.9 m - 2.7 m</Checkbox>
					</li>
					<li>
						<Checkbox>2.8 m - 3.6 m</Checkbox>
					</li>
					<li>
						<Checkbox>4.0 m - 4.2 m</Checkbox>
					</li>
					<li>
						<Checkbox>4.5 m</Checkbox>
					</li>
					<li>
						<Checkbox>5.0 m - 5.8 m</Checkbox>
					</li>
					<li>
						<Checkbox>6.1 m - 6.9 m</Checkbox>
					</li>
					<li>
						<Checkbox>7.0 m - 9.8 m</Checkbox>
					</li>
					<li>
						<Checkbox>10.5 m - 12.0 m</Checkbox>
					</li>
					<li>
						<Checkbox>14.5 m</Checkbox>
					</li>
					<li>
						<Checkbox>20.0 m</Checkbox>
					</li>
					<li>
						<Checkbox>100.0 m</Checkbox>
					</li>
				</Dropdown>
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Weight</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox>0.0kg - 9.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>10.0kg - 20.0kg</Checkbox>
					</li>
					<li>
						<Checkbox>20.1kg - 24.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>25.0kg - 49.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>50kg - 59.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>60kg - 98.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>99.0kg - 99.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>100.0kg - 102.3kg</Checkbox>
					</li>
					<li>
						<Checkbox>102.4kg - 149.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>150.0kg - 199.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>200.0kg - 204.7kg</Checkbox>
					</li>
					<li>
						<Checkbox>204.8kg - 299.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>300.0kg - 307.1kg</Checkbox>
					</li>
					<li>
						<Checkbox>307.2kg - 359.9kg</Checkbox>
					</li>
					<li>
						<Checkbox>360.0kg - 409.5kg</Checkbox>
					</li>
					<li>
						<Checkbox>409.6kg - 999.9kg</Checkbox>
					</li>
				</Dropdown>
			</div>

			<button
				class="h-full w-auto p-[5px] aspect-square rounded-md flex items-center justify-center bg-primary-gray hover:shadow-md shadow-primary-gray"
			>
				<RefreshIcon />
			</button>
		</div>
	</div>

	<!-- Pokemon -->
	<div class="flex flex-wrap gap-8 gap-y-12 w-full justify-center py-8">
		{#each filteredPokemon as pokeman}
			<PokemanCard {pokeman} bind:pokeId />
		{/each}
	</div>
</div>

<div class="sticky top-0 right-0 w-1/3 min-w-[384px]">
	<PokemanDetailedCard {pokeman} {pokemanGenus} bind:pokeId />
</div>
