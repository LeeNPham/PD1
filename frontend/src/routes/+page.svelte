<script>
	// @ts-nocheck
	import PokemanCard from '$lib/components/PokemanCard.svelte';
	import PokemanDetailedCard from '$lib/components/PokemanDetailedCard.svelte';
	import PokeBall from '$lib/icons/PokeBall.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import {
		paginatedPokemon,
		loading,
		error,
		searchTerm,
		sortBy,
		sortOrder,
		selectedRegions,
		selectedTypes,
		selectedWeaknesses,
		weightRange,
		heightRange,
		currentPage,
		totalPagesDerived,
		itemsPerPage,
		pokemonTypes,
		regions,
		weightRanges,
		heightRanges,
		pokemonActions,
		fetchDetailedPokemon
	} from '../stores/pokestore';
	import {
		Button,
		Dropdown,
		DropdownItem,
		Chevron,
		Checkbox,
		DropdownDivider
	} from 'flowbite-svelte';
	import { onMount, tick } from 'svelte';

	let pokeId = null;
	let pokeman;
	let pokemanGenus;
	let searchInput = $searchTerm;

	// When the paginatedPokemon list changes, auto-select the first one if pokeId is not present
	$: autoSelectFirstPokemon();
	async function autoSelectFirstPokemon() {
		await tick();
		if ($paginatedPokemon.length > 0) {
			const found = $paginatedPokemon.find((p) => p.id === pokeId);
			if (!found) {
				pokeId = Number($paginatedPokemon[0].id);
			}
		} else {
			pokeId = null;
		}
	}

	function selectPokemon(id) {
		pokeId = Number(id);
	}

	// Always fetch details when pokeId changes and is valid
	$: if (pokeId && typeof pokeId === 'number' && !isNaN(pokeId)) {
		fetchDetailedPokemonData();
	} else if (pokeId !== null) {
		console.warn('Invalid pokeId for fetchDetailedPokemon:', pokeId);
	}

	async function fetchDetailedPokemonData() {
		if (pokeId === null || pokeId === undefined || typeof pokeId !== 'number' || isNaN(pokeId)) {
			return;
		}
		const result = await fetchDetailedPokemon(pokeId);
		if (result) {
			pokeman = result.pokemon;
			pokemanGenus = result.species;
		} else {
			pokeman = null;
			pokemanGenus = null;
		}
	}

	onMount(() => {
		fetchDetailedPokemonData();
	});

	// Handle weight range selection
	function selectWeightRange(range) {
		pokemonActions.setWeightRange(range.min, range.max);
	}

	// Handle height range selection
	function selectHeightRange(range) {
		pokemonActions.setHeightRange(range.min, range.max);
	}

	// Generate page numbers for pagination
	function getPageNumbers(currentPage, totalPages) {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			// Show all pages if total is small
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Show current page and surrounding pages
			let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
			let end = Math.min(totalPages, start + maxVisible - 1);

			// Adjust start if we're near the end
			if (end === totalPages) {
				start = Math.max(1, end - maxVisible + 1);
			}

			// Add first page and ellipsis if needed
			if (start > 1) {
				pages.push(1);
				if (start > 2) pages.push('...');
			}

			// Add visible pages
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			// Add last page and ellipsis if needed
			if (end < totalPages) {
				if (end < totalPages - 1) pages.push('...');
				pages.push(totalPages);
			}
		}

		return pages;
	}

	function handleSearch() {
		pokemonActions.setSearchTerm(searchInput);
	}
</script>

<svelte:head>
	<title>Svelte Kit Pokédex</title>
</svelte:head>

<div class="w-2/3">
	<div class="relative flex flex-col gap-8 pb-5">
		<!-- Search component -->
		<input
			class="w-full rounded-xl text-lg p-5 border-0 focus:ring-0 focus:border-0 shadow-lg shadow-black/5"
			bind:value={searchInput}
			type="text"
			placeholder="Search your Pokémon"
			on:keydown={(e) => {
				if (e.key === 'Enter') handleSearch();
			}}
		/>
		<button
			class="absolute -p-3 right-3 top-2 shadow-md hover:shadow-primary-activebutton/50 bg-primary-activebutton rounded-xl p-2 w-12 h-12"
			on:click={handleSearch}
		>
			<PokeBall Class="fill-white h-full w-full rotate-180" />
		</button>

		<!-- Sort filter -->
		<div class="flex justify-start items-center relative z-30">
			<div>
				<Button
					class="w-44 whitespace-nowrap justify-between focus:border-0 focus:ring-0 text-gray-900 font-semibold text-md px-2 py-2 "
					><Chevron
						>Order by {$sortBy === 'id'
							? 'Number'
							: $sortBy === 'name'
							? 'Name'
							: $sortBy === 'weight'
							? 'Weight'
							: 'Height'}</Chevron
					></Button
				>
				<Dropdown class="z-40">
					<DropdownItem>
						<button on:click={() => pokemonActions.setSortBy('id')} type="button">Number</button>
					</DropdownItem>
					<DropdownItem>
						<button on:click={() => pokemonActions.setSortBy('name')} type="button">Name</button>
					</DropdownItem>
					<DropdownItem>
						<button on:click={() => pokemonActions.setSortBy('weight')} type="button">Weight</button
						>
					</DropdownItem>
					<DropdownItem>
						<button on:click={() => pokemonActions.setSortBy('height')} type="button">Height</button
						>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem>
						<button on:click={() => pokemonActions.toggleSortOrder()} type="button">
							{$sortOrder === 'asc' ? 'Ascending' : 'Descending'}
						</button>
					</DropdownItem>
				</Dropdown>
			</div>
		</div>

		<!-- Filter categories -->
		<div class="flex flex-wrap justify-between items-center text-primary-gray font-semibold gap-3">
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Region</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox on:click={() => pokemonActions.clearRegions()}>Clear All</Checkbox>
					</li>
					{#each regions as region}
						<li>
							<Checkbox
								checked={$selectedRegions.includes(region)}
								on:click={() => pokemonActions.toggleRegion(region)}
							>
								{region.charAt(0).toUpperCase() + region.slice(1)}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Type</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox on:click={() => pokemonActions.clearTypes()}>Clear All</Checkbox>
					</li>
					{#each pokemonTypes as type}
						<li>
							<Checkbox
								checked={$selectedTypes.includes(type)}
								on:click={() => pokemonActions.toggleType(type)}
							>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Weaknesses</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox on:click={() => pokemonActions.clearWeaknesses()}>Clear All</Checkbox>
					</li>
					{#each pokemonTypes as type}
						<li>
							<Checkbox
								checked={$selectedWeaknesses.includes(type)}
								on:click={() => pokemonActions.toggleWeakness(type)}
							>
								{type.charAt(0).toUpperCase() + type.slice(1)}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Height</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox on:click={() => pokemonActions.clearHeightRange()}>Clear All</Checkbox>
					</li>
					{#each heightRanges as range}
						<li>
							<Checkbox
								checked={$heightRange.min === range.min && $heightRange.max === range.max}
								on:click={() => selectHeightRange(range)}
							>
								{range.label}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>
			<div>
				<Button
					class="bg-white w-32 justify-between focus:border-0 focus:ring-0 text-primary-gray font-semibold text-md px-2 py-2 rounded-md shadow-lg shadow-primary-gray/20"
					><Chevron>Weight</Chevron></Button
				>
				<Dropdown class="w-auto p-2 space-y-2 text-sm z-10">
					<li>
						<Checkbox on:click={() => pokemonActions.clearWeightRange()}>Clear All</Checkbox>
					</li>
					{#each weightRanges as range}
						<li>
							<Checkbox
								checked={$weightRange.min === range.min && $weightRange.max === range.max}
								on:click={() => selectWeightRange(range)}
							>
								{range.label}
							</Checkbox>
						</li>
					{/each}
				</Dropdown>
			</div>

			<button
				on:click={() => pokemonActions.resetAllFilters()}
				class="h-full w-auto p-[5px] aspect-square rounded-md flex items-center justify-center bg-primary-gray hover:shadow-md shadow-primary-gray"
			>
				<RefreshIcon />
			</button>
		</div>

		<!-- Loading and error states -->
		{#if $loading}
			<div class="text-center py-8">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
				<p class="mt-4 text-gray-600">Loading Pokémon...</p>
			</div>
		{:else if $error}
			<div class="text-center py-8 text-red-600">
				<p>Error: {$error}</p>
				<button
					on:click={() => pokemonActions.loadInitialData()}
					class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
				>
					Retry
				</button>
			</div>
		{:else}
			<!-- Pokemon Grid -->
			<div class="flex flex-wrap gap-8 gap-y-12 w-full justify-center py-8">
				{#each $paginatedPokemon as pokeman}
					<PokemanCard {pokeman} {pokeId} {selectPokemon} disabled={pokeman.id > 10263} />
				{/each}
			</div>

			<!-- Pagination -->
			{#if $totalPagesDerived > 1}
				<div class="flex justify-center items-center gap-2 py-8">
					<!-- Previous 5 pages button -->
					<button
						on:click={() => pokemonActions.setPage(Math.max(1, $currentPage - 5))}
						disabled={$currentPage <= 5}
						class="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
					>
						««
					</button>

					<!-- Previous page button -->
					<button
						on:click={() => pokemonActions.setPage($currentPage - 1)}
						disabled={$currentPage <= 1}
						class="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
					>
						«
					</button>

					<!-- Page numbers -->
					{#each getPageNumbers($currentPage, $totalPagesDerived) as pageNum}
						{#if pageNum === '...'}
							<span class="px-3 py-2 text-gray-500">...</span>
						{:else}
							<button
								on:click={() => pokemonActions.setPage(pageNum)}
								class="px-3 py-2 rounded text-sm {pageNum === $currentPage
									? 'bg-blue-600 text-white'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
							>
								{pageNum}
							</button>
						{/if}
					{/each}

					<!-- Next page button -->
					<button
						on:click={() => pokemonActions.setPage($currentPage + 1)}
						disabled={$currentPage >= $totalPagesDerived}
						class="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
					>
						»
					</button>

					<!-- Next 5 pages button -->
					<button
						on:click={() => pokemonActions.setPage(Math.min($totalPagesDerived, $currentPage + 5))}
						disabled={$currentPage >= $totalPagesDerived - 4}
						class="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
					>
						»»
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>

<div class="sticky top-0 right-0 w-1/3 min-w-[384px]">
	<PokemanDetailedCard {pokeman} {pokemanGenus} bind:pokeId />
</div>
