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
	let displayedPokemon = [];
	let pokeId = 1;
	let startFlag = false;
	let pokemanGenus;
	let pokeman;
	let order = 'ascending';
	let selectedRegion = [];
	let selectedTypes = [];
	let selectedWeaknesses = [];
	let selectedHeightRanges = [];
	let selectedWeightRanges = [];
	let minId = '';
	let maxId = '';
	let currentPage = 1;
	let itemsPerPage = 20;
	let totalPages = 1;
	let pokemonDataCache = {};
	let isLoadingFilters = false;

	const typesList = [
		'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 
		'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 
		'dark', 'dragon', 'steel', 'fairy'
	];

	const weaknessesMap = {
		normal: ['fighting'],
		fire: ['water', 'ground', 'rock'],
		water: ['grass', 'electric'],
		grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
		electric: ['ground'],
		ice: ['fire', 'fighting', 'rock', 'steel'],
		fighting: ['flying', 'psychic', 'fairy'],
		poison: ['ground', 'psychic'],
		ground: ['water', 'grass', 'ice'],
		flying: ['electric', 'ice', 'rock'],
		psychic: ['bug', 'ghost', 'dark'],
		bug: ['fire', 'flying', 'rock'],
		rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
		ghost: ['ghost', 'dark'],
		dragon: ['ice', 'dragon', 'fairy'],
		dark: ['fighting', 'bug', 'fairy'],
		steel: ['fire', 'fighting', 'ground'],
		fairy: ['poison', 'steel']
	};

	const heightRanges = [
		{ label: '0.0 m - 0.5 m', min: 0, max: 5 },
		{ label: '0.6 m - 1.2 m', min: 6, max: 12 },
		{ label: '1.3 m - 1.8 m', min: 13, max: 18 },
		{ label: '1.9 m - 2.7 m', min: 19, max: 27 },
		{ label: '2.8 m - 3.6 m', min: 28, max: 36 },
		{ label: '3.7 m - 4.5 m', min: 37, max: 45 },
		{ label: '4.6 m - 5.8 m', min: 46, max: 58 },
		{ label: '5.9 m - 6.9 m', min: 59, max: 69 },
		{ label: '7.0 m - 9.9 m', min: 70, max: 99 },
		{ label: '10.0 m+', min: 100, max: 9999 }
	];

	const weightRanges = [
		{ label: '0.0kg - 9.9kg', min: 0, max: 99 },
		{ label: '10.0kg - 24.9kg', min: 100, max: 249 },
		{ label: '25.0kg - 49.9kg', min: 250, max: 499 },
		{ label: '50.0kg - 99.9kg', min: 500, max: 999 },
		{ label: '100.0kg - 149.9kg', min: 1000, max: 1499 },
		{ label: '150.0kg - 199.9kg', min: 1500, max: 1999 },
		{ label: '200.0kg - 299.9kg', min: 2000, max: 2999 },
		{ label: '300.0kg - 399.9kg', min: 3000, max: 3999 },
		{ label: '400.0kg - 499.9kg', min: 4000, max: 4999 },
		{ label: '500.0kg+', min: 5000, max: 999999 }
	];

	$: {
		if (pokeId != 1 || startFlag == true) {
			fetchData();
			startFlag = true;
		}
	}

	async function fetchData() {
		const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
		const res = await fetch(url);
		pokeman = await res.json();

		const genusUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`;
		const gRes = await fetch(genusUrl);
		pokemanGenus = await gRes.json();
	}

	async function fetchPokemonDetails(id) {
		if (pokemonDataCache[id]) {
			return pokemonDataCache[id];
		}
		
		try {
			const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
			const res = await fetch(url);
			const data = await res.json();
			
			pokemonDataCache[id] = {
				types: data.types.map(t => t.type.name),
				height: data.height,
				weight: data.weight
			};
			
			return pokemonDataCache[id];
		} catch (error) {
			console.error(`Failed to fetch data for Pokemon ${id}:`, error);
			return null;
		}
	}

	function toggleRegion(region) {
		if (region === 'all') {
			if (selectedRegion.length === 9) {
				selectedRegion = [];
			} else {
				selectedRegion = ['kanto', 'jhoto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea'];
			}
		} else {
			if (selectedRegion.includes(region)) {
				selectedRegion = selectedRegion.filter((item) => item !== region);
			} else {
				selectedRegion = [...selectedRegion, region];
			}
		}
	}

	function toggleType(type) {
		if (selectedTypes.includes(type)) {
			selectedTypes = selectedTypes.filter((item) => item !== type);
		} else {
			selectedTypes = [...selectedTypes, type];
		}
	}

	function toggleWeakness(weakness) {
		if (selectedWeaknesses.includes(weakness)) {
			selectedWeaknesses = selectedWeaknesses.filter((item) => item !== weakness);
		} else {
			selectedWeaknesses = [...selectedWeaknesses, weakness];
		}
	}

	function toggleHeightRange(range) {
		if (selectedHeightRanges.includes(range)) {
			selectedHeightRanges = selectedHeightRanges.filter((item) => item !== range);
		} else {
			selectedHeightRanges = [...selectedHeightRanges, range];
		}
	}

	function toggleWeightRange(range) {
		if (selectedWeightRanges.includes(range)) {
			selectedWeightRanges = selectedWeightRanges.filter((item) => item !== range);
		} else {
			selectedWeightRanges = [...selectedWeightRanges, range];
		}
	}

	function resetFilters() {
		searchTerm = '';
		selectedRegion = [];
		selectedTypes = [];
		selectedWeaknesses = [];
		selectedHeightRanges = [];
		selectedWeightRanges = [];
		minId = '';
		maxId = '';
		order = 'ascending';
		currentPage = 1;
	}

	function changePage(page) {
		currentPage = page;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// Main filtering logic
	$: {
		let filtered = [...$pokemon];
		
		// Apply search filter
		if (searchTerm !== '') {
			filtered = filtered.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		
		// Apply region filter
		if (selectedRegion.length > 0) {
			filtered = filtered.filter((pokeman) => selectedRegion.includes(pokeman.region));
		}
		
		// Apply ID range filter
		if (minId !== '' || maxId !== '') {
			const min = minId === '' ? 1 : parseInt(minId);
			const max = maxId === '' ? 9999 : parseInt(maxId);
			filtered = filtered.filter((pokeman) => pokeman.id >= min && pokeman.id <= max);
		}
		
		// Apply sorting
		if (order === 'ascending') {
			filtered.sort((a, b) => a.id - b.id);
		} else {
			filtered.sort((a, b) => b.id - a.id);
		}
		
		filteredPokemon = filtered;
		
		// Calculate pagination
		totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
		if (currentPage > totalPages) currentPage = 1;
		
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		displayedPokemon = filteredPokemon.slice(startIndex, endIndex);
	}

	// Apply advanced filters (types, weaknesses, height, weight)
	async function applyAdvancedFilters() {
		if (selectedTypes.length === 0 && selectedWeaknesses.length === 0 && 
			selectedHeightRanges.length === 0 && selectedWeightRanges.length === 0) {
			return;
		}
		
		isLoadingFilters = true;
		
		try {
			let filtered = [...filteredPokemon];
			const detailsPromises = filtered.map(p => fetchPokemonDetails(p.id));
			const allDetails = await Promise.all(detailsPromises);
			
			filtered = filtered.filter((pokeman, index) => {
				const details = allDetails[index];
				if (!details) return false;
				
				// Type filter
				if (selectedTypes.length > 0) {
					const hasType = selectedTypes.some(type => details.types.includes(type));
					if (!hasType) return false;
				}
				
				// Weakness filter
				if (selectedWeaknesses.length > 0) {
					const pokemonWeaknesses = details.types.flatMap(type => weaknessesMap[type] || []);
					const hasWeakness = selectedWeaknesses.some(weakness => pokemonWeaknesses.includes(weakness));
					if (!hasWeakness) return false;
				}
				
				// Height filter
				if (selectedHeightRanges.length > 0) {
					const heightInDecimeters = details.height;
					const matchesHeight = selectedHeightRanges.some(range => 
						heightInDecimeters >= range.min && heightInDecimeters <= range.max
					);
					if (!matchesHeight) return false;
				}
				
				// Weight filter
				if (selectedWeightRanges.length > 0) {
					const weightInHectograms = details.weight;
					const matchesWeight = selectedWeightRanges.some(range => 
						weightInHectograms >= range.min && weightInHectograms <= range.max
					);
					if (!matchesWeight) return false;
				}
				
				return true;
			});
			
			filteredPokemon = filtered;
		} finally {
			isLoadingFilters = false;
		}
	}

	$: if (selectedTypes.length > 0 || selectedWeaknesses.length > 0 || 
		   selectedHeightRanges.length > 0 || selectedWeightRanges.length > 0) {
		applyAdvancedFilters();
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
		<!-- Search component -->
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

		<!-- Filters and sorting -->
		<div class="flex justify-between items-center">
			<div>
				<Button
					class="w-44 whitespace-nowrap justify-between focus:border-0 focus:ring-0 text-gray-900 font-semibold text-md px-2 py-2"
				><Chevron>Order by Number</Chevron></Button>
				<Dropdown>
					<DropdownItem>
						<button on:click={() => (order = 'ascending')} type="button">Ascending</button>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem>
						<button on:click={() => (order = 'descending')} type="button">Descending</button>
					</DropdownItem>
				</Dropdown>
			</div>
			<div class="flex flex-row gap-2 items-center">
				<div class="font-semibold text-gray-900">from</div>
				<input 
					placeholder="min" 
					class="w-20 rounded-md bg-primary-background px-2 py-1" 
					type="number" 
					bind:value={minId}
					min="1"
					max="1008"
				/>
				<div class="font-semibold text-gray-900">to</div>
				<input 
					placeholder="max" 
					class="w-20 rounded-md bg-primary-background px-2 py-1" 
					type="number" 
					bind:value={maxId}
					min="1"
					max="1008"
				/>
			</div>
		</div>

		<!-- Filter categories -->
		<div class="flex flex-wrap justify-between items-center text-primary-gray font-semibold gap-3">
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
				><Chevron>Region</Chevron></Button>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox checked={selectedRegion.length === 9} on:click={() => toggleRegion('all')}>All</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('kanto')} on:click={() => toggleRegion('kanto')}>Kanto</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('jhoto')} on:click={() => toggleRegion('jhoto')}>Jhoto</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('hoenn')} on:click={() => toggleRegion('hoenn')}>Hoenn</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('sinnoh')} on:click={() => toggleRegion('sinnoh')}>Sinnoh</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('unova')} on:click={() => toggleRegion('unova')}>Unova</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('kalos')} on:click={() => toggleRegion('kalos')}>Kalos</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('alola')} on:click={() => toggleRegion('alola')}>Alola</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('galar')} on:click={() => toggleRegion('galar')}>Galar</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedRegion.includes('paldea')} on:click={() => toggleRegion('paldea')}>Paldea</Checkbox>
					</li>
				</Dropdown>
			</div>
			
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
				><Chevron>Type</Chevron></Button>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10 max-h-96 overflow-y-auto">
					{#each typesList as type}
						<li>
							<Checkbox checked={selectedTypes.includes(type)} on:click={() => toggleType(type)}>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
				><Chevron>Weaknesses</Chevron></Button>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10 max-h-96 overflow-y-auto">
					{#each typesList as weakness}
						<li>
							<Checkbox checked={selectedWeaknesses.includes(weakness)} on:click={() => toggleWeakness(weakness)}>
								{weakness.charAt(0).toUpperCase() + weakness.slice(1)}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
				><Chevron>Height</Chevron></Button>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10 max-h-96 overflow-y-auto">
					{#each heightRanges as range}
						<li>
							<Checkbox checked={selectedHeightRanges.includes(range)} on:click={() => toggleHeightRange(range)}>
								{range.label}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
				><Chevron>Weight</Chevron></Button>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10 max-h-96 overflow-y-auto">
					{#each weightRanges as range}
						<li>
							<Checkbox checked={selectedWeightRanges.includes(range)} on:click={() => toggleWeightRange(range)}>
								{range.label}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>

			<button
				on:click={resetFilters}
				class="h-full w-auto p-[5px] aspect-square rounded-md flex items-center justify-center bg-primary-gray hover:shadow-md shadow-primary-gray"
			>
				<RefreshIcon />
			</button>
		</div>
	</div>

	<!-- Pokemon Grid -->
	<div class="flex flex-wrap gap-8 gap-y-12 w-full justify-center py-8 relative">
		{#if isLoadingFilters}
			<div class="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
				<div class="flex flex-col items-center gap-4">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-activebutton"></div>
					<p class="text-gray-600">Applying filters...</p>
				</div>
			</div>
		{/if}
		
		{#each displayedPokemon as pokeman}
			<PokemanCard {pokeman} bind:pokeId />
		{/each}
		
		{#if displayedPokemon.length === 0 && !isLoadingFilters}
			<div class="text-center text-gray-500 py-12">
				No Pokémon found matching your filters.
			</div>
		{/if}
	</div>
	
	<!-- Pagination -->
	{#if totalPages > 1}
		<div class="flex justify-center items-center gap-2 py-8">
			<button
				on:click={() => changePage(currentPage - 1)}
				disabled={currentPage === 1}
				class="px-4 py-2 rounded-md bg-primary-gray text-white disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Previous
			</button>
			
			<div class="flex gap-1">
				{#if totalPages <= 7}
					{#each Array(totalPages) as _, i}
						<button
							on:click={() => changePage(i + 1)}
							class="px-3 py-1 rounded-md {currentPage === i + 1 ? 'bg-primary-activebutton text-white' : 'bg-gray-200 text-gray-700'}"
						>
							{i + 1}
						</button>
					{/each}
				{:else}
					{#if currentPage > 3}
						<button on:click={() => changePage(1)} class="px-3 py-1 rounded-md bg-gray-200 text-gray-700">1</button>
						<span class="px-2">...</span>
					{/if}
					
					{#each Array(5) as _, i}
						{@const pageNum = currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i}
						{#if pageNum > 0 && pageNum <= totalPages}
							<button
								on:click={() => changePage(pageNum)}
								class="px-3 py-1 rounded-md {currentPage === pageNum ? 'bg-primary-activebutton text-white' : 'bg-gray-200 text-gray-700'}"
							>
								{pageNum}
							</button>
						{/if}
					{/each}
					
					{#if currentPage < totalPages - 2}
						<span class="px-2">...</span>
						<button on:click={() => changePage(totalPages)} class="px-3 py-1 rounded-md bg-gray-200 text-gray-700">{totalPages}</button>
					{/if}
				{/if}
			</div>
			
			<button
				on:click={() => changePage(currentPage + 1)}
				disabled={currentPage === totalPages}
				class="px-4 py-2 rounded-md bg-primary-gray text-white disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Next
			</button>
		</div>
		
		<div class="text-center text-gray-500 pb-8">
			Page {currentPage} of {totalPages} • Showing {displayedPokemon.length} of {filteredPokemon.length} Pokémon
		</div>
	{/if}
</div>

<div class="sticky top-0 right-0 w-1/3 min-w-[384px]">
	<PokemanDetailedCard {pokeman} {pokemanGenus} bind:pokeId />
</div>
