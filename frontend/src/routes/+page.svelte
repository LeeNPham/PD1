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
	let paginatedPokemon = [];
	let pokeId = 1;
	let startFlag = false;
	let pokemanGenus;
	let pokeman;
	let order = 'default';
	let selectedRegion = [];
	let selectedTypes = [];
	let selectedWeaknesses = [];
	let selectedHeightRanges = [];
	let selectedWeightRanges = [];
	let minNumber = '';
	let maxNumber = '';
	let isLoading = false;
	
	// Pagination variables
	let currentPage = 1;
	let itemsPerPage = 20;
	let totalPages = 1;

	// Enhanced Pokemon data cache
	let enhancedPokemonData = new Map();

	// Type effectiveness map for weaknesses
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

	$: {
		if (pokeId != 1 || startFlag == true) {
			fetchData();
			startFlag = true;
		}
	}

	// Reset pagination when search term changes
	$: if (searchTerm !== undefined) {
		currentPage = 1;
	}

	// Enhanced filtering and sorting
	$: {
		let filtered = [...$pokemon];

		// Search filter
		if (searchTerm !== '') {
			filtered = filtered.filter((pokeman) =>
				pokeman.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Region filter
		if (selectedRegion.length !== 0 && !selectedRegion.includes('all')) {
			filtered = filtered.filter((pokeman) => selectedRegion.includes(pokeman.region));
		}

		// Number range filter
		if (minNumber !== '' || maxNumber !== '') {
			const min = minNumber === '' ? 1 : parseInt(minNumber);
			const max = maxNumber === '' ? 1008 : parseInt(maxNumber);
			filtered = filtered.filter((pokeman) => pokeman.id >= min && pokeman.id <= max);
		}

		// Apply async filters (type, weakness, height, weight)
		applyAsyncFilters(filtered);
	}

	async function applyAsyncFilters(baseFiltered) {
		let filtered = [...baseFiltered];

		// Apply type, weakness, height, weight filters if any are selected
		if (selectedTypes.length > 0 || selectedWeaknesses.length > 0 || selectedHeightRanges.length > 0 || selectedWeightRanges.length > 0) {
			isLoading = true;
			const filteredWithDetails = [];
			
			for (const pokeman of filtered) {
				const details = await getEnhancedPokemonData(pokeman.id);
				if (details && matchesAdvancedFilters(details)) {
					filteredWithDetails.push(pokeman);
				}
			}
			filtered = filteredWithDetails;
			isLoading = false;
		}

		// Apply sorting
		filtered = applySorting(filtered);
		
		filteredPokemon = filtered;
		updatePagination();
	}

	function matchesAdvancedFilters(details) {
		// Type filter
		if (selectedTypes.length > 0) {
			const pokemonTypes = details.types.map(t => t.type.name);
			const hasMatchingType = selectedTypes.some(type => pokemonTypes.includes(type));
			if (!hasMatchingType) return false;
		}

		// Weakness filter
		if (selectedWeaknesses.length > 0) {
			const pokemonTypes = details.types.map(t => t.type.name);
			const pokemonWeaknesses = new Set();
			pokemonTypes.forEach(type => {
				if (weaknessesMap[type]) {
					weaknessesMap[type].forEach(weakness => pokemonWeaknesses.add(weakness));
				}
			});
			const hasMatchingWeakness = selectedWeaknesses.some(weakness => pokemonWeaknesses.has(weakness));
			if (!hasMatchingWeakness) return false;
		}

		// Height filter
		if (selectedHeightRanges.length > 0) {
			const heightInMeters = details.height / 10;
			const matchesHeight = selectedHeightRanges.some(range => {
				switch(range) {
					case '0.0 m - 0.5 m': return heightInMeters >= 0.0 && heightInMeters <= 0.5;
					case '0.6 m - 1.2 m': return heightInMeters >= 0.6 && heightInMeters <= 1.2;
					case '1.3 m - 1.8 m': return heightInMeters >= 1.3 && heightInMeters <= 1.8;
					case '1.9 m - 2.7 m': return heightInMeters >= 1.9 && heightInMeters <= 2.7;
					case '2.8 m - 3.6 m': return heightInMeters >= 2.8 && heightInMeters <= 3.6;
					case '4.0 m - 4.2 m': return heightInMeters >= 4.0 && heightInMeters <= 4.2;
					case '4.5 m': return heightInMeters >= 4.4 && heightInMeters <= 4.6;
					case '5.0 m - 5.8 m': return heightInMeters >= 5.0 && heightInMeters <= 5.8;
					case '6.1 m - 6.9 m': return heightInMeters >= 6.1 && heightInMeters <= 6.9;
					case '7.0 m - 9.8 m': return heightInMeters >= 7.0 && heightInMeters <= 9.8;
					case '10.5 m - 12.0 m': return heightInMeters >= 10.5 && heightInMeters <= 12.0;
					case '14.5 m': return heightInMeters >= 14.0 && heightInMeters <= 15.0;
					case '20.0 m': return heightInMeters >= 19.0 && heightInMeters <= 21.0;
					case '100.0 m': return heightInMeters >= 99.0;
					default: return false;
				}
			});
			if (!matchesHeight) return false;
		}

		// Weight filter
		if (selectedWeightRanges.length > 0) {
			const weightInKg = details.weight / 10;
			const matchesWeight = selectedWeightRanges.some(range => {
				switch(range) {
					case '0.0kg - 9.9kg': return weightInKg >= 0.0 && weightInKg <= 9.9;
					case '10.0kg - 20.0kg': return weightInKg >= 10.0 && weightInKg <= 20.0;
					case '20.1kg - 24.9kg': return weightInKg >= 20.1 && weightInKg <= 24.9;
					case '25.0kg - 49.9kg': return weightInKg >= 25.0 && weightInKg <= 49.9;
					case '50kg - 59.9kg': return weightInKg >= 50.0 && weightInKg <= 59.9;
					case '60kg - 98.9kg': return weightInKg >= 60.0 && weightInKg <= 98.9;
					case '99.0kg - 99.9kg': return weightInKg >= 99.0 && weightInKg <= 99.9;
					case '100.0kg - 102.3kg': return weightInKg >= 100.0 && weightInKg <= 102.3;
					case '102.4kg - 149.9kg': return weightInKg >= 102.4 && weightInKg <= 149.9;
					case '150.0kg - 199.9kg': return weightInKg >= 150.0 && weightInKg <= 199.9;
					case '200.0kg - 204.7kg': return weightInKg >= 200.0 && weightInKg <= 204.7;
					case '204.8kg - 299.9kg': return weightInKg >= 204.8 && weightInKg <= 299.9;
					case '300.0kg - 307.1kg': return weightInKg >= 300.0 && weightInKg <= 307.1;
					case '307.2kg - 359.9kg': return weightInKg >= 307.2 && weightInKg <= 359.9;
					case '360.0kg - 409.5kg': return weightInKg >= 360.0 && weightInKg <= 409.5;
					case '409.6kg - 999.9kg': return weightInKg >= 409.6;
					default: return false;
				}
			});
			if (!matchesWeight) return false;
		}

		return true;
	}

	function applySorting(filtered) {
		switch(order) {
			case 'descending':
				return filtered.sort((a, b) => b.id - a.id);
			case 'name-asc':
				return filtered.sort((a, b) => a.name.localeCompare(b.name));
			case 'name-desc':
				return filtered.sort((a, b) => b.name.localeCompare(a.name));
			case 'default':
			default:
				return filtered.sort((a, b) => a.id - b.id);
		}
	}

	function updatePagination() {
		totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
		if (currentPage > totalPages) currentPage = 1;
		
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);
	}

	async function getEnhancedPokemonData(id) {
		if (enhancedPokemonData.has(id)) {
			return enhancedPokemonData.get(id);
		}

		try {
			const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
			const res = await fetch(url);
			const data = await res.json();
			enhancedPokemonData.set(id, data);
			return data;
		} catch (error) {
			console.error(`Error fetching Pokemon ${id}:`, error);
			return null;
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

	function toggleRegion(region) {
		if (region === 'all') {
			selectedRegion = selectedRegion.includes('all') ? [] : ['all'];
		} else {
			selectedRegion = selectedRegion.filter(r => r !== 'all');
			if (selectedRegion.includes(region)) {
				selectedRegion = selectedRegion.filter((item) => item !== region);
			} else {
				selectedRegion.push(region);
			}
		}
		selectedRegion = selectedRegion;
		currentPage = 1;
	}

	function toggleType(type) {
		if (selectedTypes.includes(type)) {
			selectedTypes = selectedTypes.filter(item => item !== type);
		} else {
			selectedTypes.push(type);
		}
		selectedTypes = selectedTypes;
		currentPage = 1;
	}

	function toggleWeakness(weakness) {
		if (selectedWeaknesses.includes(weakness)) {
			selectedWeaknesses = selectedWeaknesses.filter(item => item !== weakness);
		} else {
			selectedWeaknesses.push(weakness);
		}
		selectedWeaknesses = selectedWeaknesses;
		currentPage = 1;
	}

	function toggleHeightRange(range) {
		if (selectedHeightRanges.includes(range)) {
			selectedHeightRanges = selectedHeightRanges.filter(item => item !== range);
		} else {
			selectedHeightRanges.push(range);
		}
		selectedHeightRanges = selectedHeightRanges;
		currentPage = 1;
	}

	function toggleWeightRange(range) {
		if (selectedWeightRanges.includes(range)) {
			selectedWeightRanges = selectedWeightRanges.filter(item => item !== range);
		} else {
			selectedWeightRanges.push(range);
		}
		selectedWeightRanges = selectedWeightRanges;
		currentPage = 1;
	}

	function clearAllFilters() {
		searchTerm = '';
		selectedRegion = [];
		selectedTypes = [];
		selectedWeaknesses = [];
		selectedHeightRanges = [];
		selectedWeightRanges = [];
		minNumber = '';
		maxNumber = '';
		order = 'default';
		currentPage = 1;
	}

	function goToPage(page) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	onMount(() => {
		fetchData();
		filteredPokemon = [...$pokemon];
		updatePagination();
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
					class="w-44 whitespace-nowrap justify-between focus:border-0 focus:ring-0 text-gray-900 font-semibold text-md px-2 py-2 "
					><Chevron>Sort by</Chevron></Button
				>
				<Dropdown>
					<DropdownItem>
						<button on:click={() => (order = 'default')}>Number (Default)</button>
					</DropdownItem>
					<DropdownItem>
						<button on:click={() => (order = 'descending')}>Number (Descending)</button>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem>
						<button on:click={() => (order = 'name-asc')}>Name (A-Z)</button>
					</DropdownItem>
					<DropdownItem>
						<button on:click={() => (order = 'name-desc')}>Name (Z-A)</button>
					</DropdownItem>
				</Dropdown>
			</div>
			<div class="flex flex-row gap-2 items-center">
				<div class="font-semibold text-gray-900">from</div>
				<input placeholder="min" class="w-20 rounded-md bg-primary-background" type="text" bind:value={minNumber} />
				<div class="font-semibold text-gray-900">to</div>
				<input placeholder="max" class="w-20 rounded-md bg-primary-background" type="text" bind:value={maxNumber} />
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
						<Checkbox checked={selectedRegion.includes('all')} on:click={() => toggleRegion('all')}>All</Checkbox>
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
					><Chevron>Type</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox checked={selectedTypes.includes('normal')} on:click={() => toggleType('normal')}>Normal</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('fire')} on:click={() => toggleType('fire')}>Fire</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('water')} on:click={() => toggleType('water')}>Water</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('grass')} on:click={() => toggleType('grass')}>Grass</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('electric')} on:click={() => toggleType('electric')}>Electric</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('ice')} on:click={() => toggleType('ice')}>Ice</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('fighting')} on:click={() => toggleType('fighting')}>Fighting</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('poison')} on:click={() => toggleType('poison')}>Poison</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('ground')} on:click={() => toggleType('ground')}>Ground</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('flying')} on:click={() => toggleType('flying')}>Flying</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('psychic')} on:click={() => toggleType('psychic')}>Psychic</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('bug')} on:click={() => toggleType('bug')}>Bug</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('rock')} on:click={() => toggleType('rock')}>Rock</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('ghost')} on:click={() => toggleType('ghost')}>Ghost</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('dark')} on:click={() => toggleType('dark')}>Dark</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('dragon')} on:click={() => toggleType('dragon')}>Dragon</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('steel')} on:click={() => toggleType('steel')}>Steel</Checkbox>
					</li>
					<li>
						<Checkbox checked={selectedTypes.includes('fairy')} on:click={() => toggleType('fairy')}>Fairy</Checkbox>
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
						<Checkbox on:click={() => toggleWeakness('normal')}>Normal</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('fire')}>Fire</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('water')}>Water</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('grass')}>Grass</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('electric')}>Electric</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('ice')}>Ice</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('fighting')}>Fighting</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('poison')}>Poison</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('ground')}>Ground</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('flying')}>Flying</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('psychic')}>Psychic</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('bug')}>Bug</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('rock')}>Rock</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('ghost')}>Ghost</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('dark')}>Dark</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('dragon')}>Dragon</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('steel')}>Steel</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeakness('fairy')}>Fairy</Checkbox>
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
						<Checkbox on:click={() => toggleHeightRange('0.0 m - 0.5 m')}>0.0 m - 0.5 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('0.6 m - 1.2 m')}>0.6 m - 1.2 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('1.3 m - 1.8 m')}>1.3 m - 1.8 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('1.9 m - 2.7 m')}>1.9 m - 2.7 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('2.8 m - 3.6 m')}>2.8 m - 3.6 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('4.0 m - 4.2 m')}>4.0 m - 4.2 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('4.5 m')}>4.5 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('5.0 m - 5.8 m')}>5.0 m - 5.8 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('6.1 m - 6.9 m')}>6.1 m - 6.9 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('7.0 m - 9.8 m')}>7.0 m - 9.8 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('10.5 m - 12.0 m')}>10.5 m - 12.0 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('14.5 m')}>14.5 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('20.0 m')}>20.0 m</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleHeightRange('100.0 m')}>100.0 m</Checkbox>
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
						<Checkbox on:click={() => toggleWeightRange('0.0kg - 9.9kg')}>0.0kg - 9.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('10.0kg - 20.0kg')}>10.0kg - 20.0kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('20.1kg - 24.9kg')}>20.1kg - 24.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('25.0kg - 49.9kg')}>25.0kg - 49.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('50kg - 59.9kg')}>50kg - 59.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('60kg - 98.9kg')}>60kg - 98.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('99.0kg - 99.9kg')}>99.0kg - 99.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('100.0kg - 102.3kg')}>100.0kg - 102.3kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('102.4kg - 149.9kg')}>102.4kg - 149.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('150.0kg - 199.9kg')}>150.0kg - 199.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('200.0kg - 204.7kg')}>200.0kg - 204.7kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('204.8kg - 299.9kg')}>204.8kg - 299.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('300.0kg - 307.1kg')}>300.0kg - 307.1kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('307.2kg - 359.9kg')}>307.2kg - 359.9kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('360.0kg - 409.5kg')}>360.0kg - 409.5kg</Checkbox>
					</li>
					<li>
						<Checkbox on:click={() => toggleWeightRange('409.6kg - 999.9kg')}>409.6kg - 999.9kg</Checkbox>
					</li>
				</Dropdown>
			</div>

			<button
				class="h-full w-auto p-[5px] aspect-square rounded-md flex items-center justify-center bg-primary-gray hover:shadow-md shadow-primary-gray"
				on:click={clearAllFilters}
			>
				<RefreshIcon />
			</button>
		</div>
	</div>

	<!-- Pokemon -->
	<div class="flex flex-wrap gap-8 gap-y-12 w-full justify-center py-8">
		{#if isLoading}
			<div class="flex items-center justify-center w-full py-12">
				<div class="text-lg text-gray-600">Loading Pokemon...</div>
			</div>
		{:else if paginatedPokemon.length === 0}
			<div class="flex items-center justify-center w-full py-12">
				<div class="text-lg text-gray-600">No Pokemon found matching your filters.</div>
			</div>
		{:else}
			{#each paginatedPokemon as pokeman}
				<PokemanCard {pokeman} bind:pokeId />
			{/each}
		{/if}
	</div>

	<!-- Pagination Controls -->
	{#if totalPages > 1}
		<div class="flex flex-col items-center gap-4 py-8">
			<div class="text-sm text-gray-700">
				Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPokemon.length)} of {filteredPokemon.length} results
			</div>
			
			<div class="flex items-center gap-2">
				<!-- Previous Button -->
				<button
					on:click={prevPage}
					disabled={currentPage === 1}
					class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Previous
				</button>

				<!-- Page Numbers -->
				{#each Array.from({length: Math.min(7, totalPages)}, (_, i) => {
					if (totalPages <= 7) return i + 1;
					if (currentPage <= 4) return i + 1;
					if (currentPage >= totalPages - 3) return totalPages - 6 + i;
					return currentPage - 3 + i;
				}) as page}
					<button
						on:click={() => goToPage(page)}
						class="px-3 py-2 text-sm font-medium {currentPage === page 
							? 'text-blue-600 bg-blue-50 border border-blue-300' 
							: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'} rounded-lg"
					>
						{page}
					</button>
				{/each}

				<!-- Next Button -->
				<button
					on:click={nextPage}
					disabled={currentPage === totalPages}
					class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
				</button>
			</div>

			<!-- Page Size Selector -->
			<div class="flex items-center gap-2 text-sm">
				<span class="text-gray-700">Items per page:</span>
				<select 
					bind:value={itemsPerPage} 
					on:change={updatePagination}
					class="border border-gray-300 rounded px-2 py-1 text-sm"
				>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
			</div>
		</div>
	{/if}
</div>

<div class="sticky top-0 right-0 w-1/3 min-w-[384px]">
	<PokemanDetailedCard {pokeman} {pokemanGenus} bind:pokeId />
</div>
