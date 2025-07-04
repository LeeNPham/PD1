//@ts-nocheck
import { writable, derived, get } from 'svelte/store';

// Base stores
export const pageLocation = writable('home');
export const pokemon = writable([]);
export const detailedPokemon = writable({});
export const loading = writable(false);
export const error = writable(null);

// Pagination stores
export const currentPage = writable(1);
export const itemsPerPage = writable(20);
export const totalItems = writable(0);
export const totalPages = writable(0);

// Search and filter stores
export const searchTerm = writable('');
export const sortOrder = writable('asc');
export const sortBy = writable('id');

// Filter stores
export const selectedRegions = writable([]);
export const selectedTypes = writable([]);
export const selectedWeaknesses = writable([]);
export const weightRange = writable({ min: null, max: null });
export const heightRange = writable({ min: null, max: null });

// Pokemon types for filtering
export const pokemonTypes = [
	'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
	'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
	'dark', 'dragon', 'steel', 'fairy'
];

// Regions for filtering
export const regions = [
	'kanto', 'johto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea'
];

// Weight ranges for filtering
export const weightRanges = [
	{ label: '0.0kg - 9.9kg', min: 0, max: 9.9 },
	{ label: '10.0kg - 20.0kg', min: 10, max: 20 },
	{ label: '20.1kg - 24.9kg', min: 20.1, max: 24.9 },
	{ label: '25.0kg - 49.9kg', min: 25, max: 49.9 },
	{ label: '50kg - 59.9kg', min: 50, max: 59.9 },
	{ label: '60kg - 98.9kg', min: 60, max: 98.9 },
	{ label: '99.0kg - 99.9kg', min: 99, max: 99.9 },
	{ label: '100.0kg - 102.3kg', min: 100, max: 102.3 },
	{ label: '102.4kg - 149.9kg', min: 102.4, max: 149.9 },
	{ label: '150.0kg - 199.9kg', min: 150, max: 199.9 },
	{ label: '200.0kg - 204.7kg', min: 200, max: 204.7 },
	{ label: '204.8kg - 299.9kg', min: 204.8, max: 299.9 },
	{ label: '300.0kg - 307.1kg', min: 300, max: 307.1 },
	{ label: '307.2kg - 359.9kg', min: 307.2, max: 359.9 },
	{ label: '360.0kg - 409.5kg', min: 360, max: 409.5 },
	{ label: '409.6kg - 999.9kg', min: 409.6, max: 999.9 }
];

// Height ranges for filtering
export const heightRanges = [
	{ label: '0.0 m - 0.5 m', min: 0, max: 0.5 },
	{ label: '0.6 m - 1.2 m', min: 0.6, max: 1.2 },
	{ label: '1.3 m - 1.8 m', min: 1.3, max: 1.8 },
	{ label: '1.9 m - 2.7 m', min: 1.9, max: 2.7 },
	{ label: '2.8 m - 3.6 m', min: 2.8, max: 3.6 },
	{ label: '4.0 m - 4.2 m', min: 4.0, max: 4.2 },
	{ label: '4.5 m', min: 4.5, max: 4.5 },
	{ label: '5.0 m - 5.8 m', min: 5.0, max: 5.8 },
	{ label: '6.1 m - 6.9 m', min: 6.1, max: 6.9 },
	{ label: '7.0 m - 9.8 m', min: 7.0, max: 9.8 },
	{ label: '10.5 m - 12.0 m', min: 10.5, max: 12.0 },
	{ label: '14.5 m', min: 14.5, max: 14.5 },
	{ label: '20.0 m', min: 20.0, max: 20.0 },
	{ label: '100.0 m', min: 100.0, max: 100.0 }
];

// GraphQL endpoint
const GRAPHQL_ENDPOINT = 'https://graphql.pokeapi.co/v1beta2';

// GraphQL query for paginated Pokemon list
const POKEMON_LIST_QUERY = `
  query GetPokemonList($offset: Int!, $limit: Int!) {
    pokemon(offset: $offset, limit: $limit, order_by: {id: asc}) {
      id
      name
      height
      weight
      pokemontypes {
        type {
          name
        }
      }
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemonabilities {
        ability {
          name
        }
      }
      pokemonsprites {
        sprites
      }
    }
  }
`;

// GraphQL query for filtered Pokemon list (larger dataset)
const POKEMON_FILTERED_QUERY = `
  query GetFilteredPokemonList($limit: Int!) {
    pokemon(limit: $limit, order_by: {id: asc}) {
      id
      name
      height
      weight
      pokemontypes {
        type {
          name
        }
      }
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemonabilities {
        ability {
          name
        }
      }
      pokemonsprites {
        sprites
      }
    }
  }
`;

// GraphQL query for detailed Pokemon data
const POKEMON_DETAIL_QUERY = `
  query GetPokemonDetail($id: Int!) {
    pokemon(where: {id: {_eq: $id}}, limit: 1) {
      id
      name
      height
      weight
      pokemontypes {
        type {
          name
        }
      }
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
      pokemonabilities {
        ability {
          name
        }
      }
      pokemonsprites {
        sprites
      }
    }
    pokemonspecies(where: {id: {_eq: $id}}, limit: 1) {
      id
      name
      pokemonspeciesnames(where: {language: {name: {_eq: "en"}}}) {
        genus
      }
      pokemonspeciesflavortexts(where: {language: {name: {_eq: "en"}}}, limit: 1) {
        flavor_text
      }
    }
  }
`;

// Helper function to get region based on Pokemon ID
function getRegion(id) {
	if (id < 152) return 'kanto';
	if (id >= 152 && id < 252) return 'johto';
	if (id >= 252 && id < 387) return 'hoenn';
	if (id >= 387 && id < 494) return 'sinnoh';
	if (id >= 494 && id < 650) return 'unova';
	if (id >= 650 && id < 722) return 'kalos';
	if (id >= 722 && id < 810) return 'alola';
	if (id >= 810 && id < 906) return 'galar';
	return 'paldea';
}

// Helper function to get image URL based on Pokemon ID
function getImageUrl(id) {
	if (id > 649) {
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
	} else {
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
	}
}

// Helper function to get weaknesses based on Pokemon types
function getWeaknesses(types) {
	const typeChart = {
		normal: ['fighting'],
		fire: ['water', 'ground', 'rock'],
		water: ['electric', 'grass'],
		electric: ['ground'],
		grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
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

	let weaknesses = [];

	types.forEach(type => {
		if (typeChart[type]) {
			weaknesses = [...new Set([...weaknesses, ...typeChart[type]])];
		}
	});

	return weaknesses;
}

// Helper function to execute GraphQL queries
async function executeGraphQLQuery(query, variables = null) {
	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': '*/*'
			},
			body: JSON.stringify({
				query,
				variables
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (data.errors) {
			throw new Error(`GraphQL errors: ${data.errors.map(e => e.message).join(', ')}`);
		}

		return data.data;
	} catch (error) {
		console.error('GraphQL query error:', error);
		throw error;
	}
}

// Transform GraphQL Pokemon data to our format
function transformPokemonData(pokemonData) {
	return {
		id: pokemonData.id,
		name: pokemonData.name,
		image: getImageUrl(pokemonData.id),
		region: getRegion(pokemonData.id),
		types: pokemonData.pokemontypes.map(t => t.type.name),
		weight: pokemonData.weight / 10,
		height: pokemonData.height / 10,
		stats: pokemonData.pokemonstats.map(stat => ({
			base_stat: stat.base_stat,
			stat: { name: stat.stat.name }
		})),
		abilities: pokemonData.pokemonabilities.map(ability => ({
			ability: { name: ability.ability.name }
		})),
		sprites: pokemonData.pokemonsprites[0]?.sprites ?? {}
	};
}

// Fetch Pokemon list with pagination using GraphQL
export async function fetchPokemonList(offset = 0, limit = 20) {
	loading.set(true);
	error.set(null);

	try {
		const data = await executeGraphQLQuery(POKEMON_LIST_QUERY, { offset, limit });

		// Get total count for pagination
		const totalCountQuery = `
			query GetPokemonCount {
				pokemon_aggregate {
					aggregate {
						count
					}
				}
			}
		`;
		const countData = await executeGraphQLQuery(totalCountQuery);
		const totalCount = countData.pokemon_aggregate.aggregate.count;

		totalItems.set(totalCount);
		totalPages.set(Math.ceil(totalCount / limit));

		// Transform the data
		const transformedPokemon = data.pokemon.map(transformPokemonData);
		pokemon.set(transformedPokemon);
	} catch (err) {
		console.error('Error fetching Pokemon list:', err);
		error.set(err.message);
	} finally {
		loading.set(false);
	}
}

// Fetch Pokemon list for filtered searches using GraphQL
export async function fetchFilteredPokemonList() {
	loading.set(true);
	error.set(null);

	try {
		// Fetch all standard Pokémon for global search (id <= 10263)
		const data = await executeGraphQLQuery(POKEMON_FILTERED_QUERY, { limit: 10263 });

		// Transform the data
		const transformedPokemon = data.pokemon.map(transformPokemonData).filter(p => p.id <= 10263);
		pokemon.set(transformedPokemon);
	} catch (err) {
		console.error('Error fetching filtered Pokemon list:', err);
		error.set(err.message);
	} finally {
		loading.set(false);
	}
}

// Fetch detailed Pokemon data using GraphQL
export async function fetchDetailedPokemon(id) {
	try {
		const data = await executeGraphQLQuery(POKEMON_DETAIL_QUERY, { id });
		const pokemonData = data.pokemon[0];
		const speciesData = data.pokemonspecies[0];
		if (!pokemonData || !speciesData) {
			return null;
		}

		// Transform Pokemon data to match REST API format
		const transformedPokemon = {
			id: pokemonData.id,
			name: pokemonData.name,
			height: pokemonData.height,
			weight: pokemonData.weight,
			types: pokemonData.pokemontypes.map(t => ({
				type: { name: t.type.name }
			})),
			stats: pokemonData.pokemonstats.map(stat => ({
				base_stat: stat.base_stat,
				stat: { name: stat.stat.name }
			})),
			abilities: pokemonData.pokemonabilities.map(ability => ({
				ability: { name: ability.ability.name }
			})),
			sprites: pokemonData.pokemonsprites[0]?.sprites ?? {}
		};

		// Transform species data to match REST API format
		const transformedSpecies = {
			id: speciesData.id,
			name: speciesData.name,
			genera: speciesData.pokemonspeciesnames.map(g => ({
				genus: g.genus,
				language: { name: 'en' }
			})),
			flavor_text_entries: speciesData.pokemonspeciesflavortexts.map(ft => ({
				flavor_text: ft.flavor_text,
				language: { name: 'en' }
			}))
		};

		detailedPokemon.set({
			pokemon: transformedPokemon,
			species: transformedSpecies
		});

		return { pokemon: transformedPokemon, species: transformedSpecies };
	} catch (err) {
		console.error('Error fetching detailed Pokemon:', err);
		error.set(err.message);
		return null;
	}
}

// Filter and sort Pokemon
export const filteredAndSortedPokemon = derived(
	[pokemon, searchTerm, sortBy, sortOrder, selectedRegions, selectedTypes, selectedWeaknesses, weightRange, heightRange],
	([$pokemon, $searchTerm, $sortBy, $sortOrder, $selectedRegions, $selectedTypes, $selectedWeaknesses, $weightRange, $heightRange]) => {
		let filtered = [...$pokemon];

		// Search filter
		if ($searchTerm) {
			filtered = filtered.filter(p =>
				p.name.toLowerCase().includes($searchTerm.toLowerCase()) ||
				p.id.toString().includes($searchTerm)
			);
		}

		// Region filter
		if ($selectedRegions.length > 0) {
			filtered = filtered.filter(p => $selectedRegions.includes(p.region));
		}

		// Type filter
		if ($selectedTypes.length > 0) {
			filtered = filtered.filter(p =>
				p.types.some(type => $selectedTypes.includes(type))
			);
		}

		// Weakness filter
		if ($selectedWeaknesses.length > 0) {
			filtered = filtered.filter(p => {
				// Get weaknesses for this Pokemon
				const weaknesses = getWeaknesses(p.types);
				return $selectedWeaknesses.some(weakness => weaknesses.includes(weakness));
			});
		}

		// Weight filter
		if ($weightRange.min !== null || $weightRange.max !== null) {
			filtered = filtered.filter(p => {
				const weight = p.weight;
				if ($weightRange.min !== null && weight < $weightRange.min) return false;
				if ($weightRange.max !== null && weight > $weightRange.max) return false;
				return true;
			});
		}

		// Height filter
		if ($heightRange.min !== null || $heightRange.max !== null) {
			filtered = filtered.filter(p => {
				const height = p.height;
				if ($heightRange.min !== null && height < $heightRange.min) return false;
				if ($heightRange.max !== null && height > $heightRange.max) return false;
				return true;
			});
		}

		// Sort
		filtered.sort((a, b) => {
			let aVal, bVal;

			switch ($sortBy) {
				case 'name':
					aVal = a.name.toLowerCase();
					bVal = b.name.toLowerCase();
					break;
				case 'weight':
					aVal = a.weight;
					bVal = b.weight;
					break;
				case 'height':
					aVal = a.height;
					bVal = b.height;
					break;
				default: // 'id'
					aVal = a.id;
					bVal = b.id;
			}

			if ($sortOrder === 'asc') {
				return aVal > bVal ? 1 : -1;
			} else {
				return aVal < bVal ? 1 : -1;
			}
		});

		return filtered;
	}
);

// Paginated Pokemon - handles both filtered and unfiltered cases
export const paginatedPokemon = derived(
	[filteredAndSortedPokemon, currentPage, itemsPerPage],
	([$filteredAndSortedPokemon, $currentPage, $itemsPerPage]) => {
		// Check if any filters are active
		const hasFilters = get(searchTerm) ||
			get(selectedRegions).length > 0 ||
			get(selectedTypes).length > 0 ||
			get(selectedWeaknesses).length > 0 ||
			get(weightRange).min !== null ||
			get(weightRange).max !== null ||
			get(heightRange).min !== null ||
			get(heightRange).max !== null;

		if (hasFilters) {
			// For filtered results, paginate client-side
			const startIndex = ($currentPage - 1) * $itemsPerPage;
			const endIndex = startIndex + $itemsPerPage;
			return $filteredAndSortedPokemon.slice(startIndex, endIndex);
		} else {
			// For unfiltered results, return all loaded data (already paginated by server)
			return $filteredAndSortedPokemon;
		}
	}
);

// Total pages - handles both filtered and unfiltered cases
export const totalPagesDerived = derived(
	[filteredAndSortedPokemon, itemsPerPage, totalPages],
	([$filteredAndSortedPokemon, $itemsPerPage, $totalPages]) => {
		// Check if any filters are active
		const hasFilters = get(searchTerm) ||
			get(selectedRegions).length > 0 ||
			get(selectedTypes).length > 0 ||
			get(selectedWeaknesses).length > 0 ||
			get(weightRange).min !== null ||
			get(weightRange).max !== null ||
			get(heightRange).min !== null ||
			get(heightRange).max !== null;

		if (hasFilters) {
			// For filtered results, calculate pages based on filtered results
			return Math.ceil($filteredAndSortedPokemon.length / $itemsPerPage);
		} else {
			// For unfiltered results, use the server-calculated total pages
			return $totalPages;
		}
	}
);

// Action handlers
export const pokemonActions = {
	// Search
	setSearchTerm: (term) => {
		searchTerm.set(term);
		currentPage.set(1);
		if (term) {
			fetchFilteredPokemonList();
		} else {
			fetchPokemonList(0, 20);
		}
	},

	// Sorting
	setSortBy: (field) => {
		sortBy.set(field);
		currentPage.set(1);
		const hasFilters = get(searchTerm) ||
			get(selectedRegions).length > 0 ||
			get(selectedTypes).length > 0 ||
			get(selectedWeaknesses).length > 0 ||
			get(weightRange).min !== null ||
			get(weightRange).max !== null ||
			get(heightRange).min !== null ||
			get(heightRange).max !== null;
		if (!hasFilters) {
			if (field === 'id') {
				fetchPokemonList(0, 20);
			} else {
				fetchFilteredPokemonList();
			}
		}
	},

	toggleSortOrder: () => {
		sortOrder.update(order => order === 'asc' ? 'desc' : 'asc');
		currentPage.set(1);
		const hasFilters = get(searchTerm) ||
			get(selectedRegions).length > 0 ||
			get(selectedTypes).length > 0 ||
			get(selectedWeaknesses).length > 0 ||
			get(weightRange).min !== null ||
			get(weightRange).max !== null ||
			get(heightRange).min !== null ||
			get(heightRange).max !== null;
		if (!hasFilters) {
			if (get(sortBy) === 'id') {
				fetchPokemonList(0, 20);
			} else {
				fetchFilteredPokemonList();
			}
		}
	},

	// Region filters
	toggleRegion: (region) => {
		selectedRegions.update(regions => {
			const newRegions = regions.includes(region)
				? regions.filter(r => r !== region)
				: [...regions, region];

			// If any filters are active, use filtered search
			if (newRegions.length > 0) {
				fetchFilteredPokemonList();
			} else {
				fetchPokemonList(0, 20);
			}

			return newRegions;
		});
		currentPage.set(1);
	},

	clearRegions: () => {
		selectedRegions.set([]);
		currentPage.set(1);
		fetchPokemonList(0, 20);
	},

	// Type filters
	toggleType: (type) => {
		selectedTypes.update(types => {
			const newTypes = types.includes(type)
				? types.filter(t => t !== type)
				: [...types, type];

			// If any filters are active, use filtered search
			if (newTypes.length > 0) {
				fetchFilteredPokemonList();
			} else {
				fetchPokemonList(0, 20);
			}

			return newTypes;
		});
		currentPage.set(1);
	},

	clearTypes: () => {
		selectedTypes.set([]);
		currentPage.set(1);
		fetchPokemonList(0, 20);
	},

	// Weakness filters
	toggleWeakness: (weakness) => {
		selectedWeaknesses.update(weaknesses => {
			const newWeaknesses = weaknesses.includes(weakness)
				? weaknesses.filter(w => w !== weakness)
				: [...weaknesses, weakness];

			// If any filters are active, use filtered search
			if (newWeaknesses.length > 0) {
				fetchFilteredPokemonList();
			} else {
				fetchPokemonList(0, 20);
			}

			return newWeaknesses;
		});
		currentPage.set(1);
	},

	clearWeaknesses: () => {
		selectedWeaknesses.set([]);
		currentPage.set(1);
		fetchPokemonList(0, 20);
	},

	// Weight range
	setWeightRange: (min, max) => {
		weightRange.set({ min, max });
		currentPage.set(1);
		if (min !== null || max !== null) {
			fetchFilteredPokemonList();
		} else {
			fetchPokemonList(0, 20);
		}
	},

	clearWeightRange: () => {
		weightRange.set({ min: null, max: null });
		currentPage.set(1);
		fetchPokemonList(0, 20);
	},

	// Height range
	setHeightRange: (min, max) => {
		heightRange.set({ min, max });
		currentPage.set(1);
		if (min !== null || max !== null) {
			fetchFilteredPokemonList();
		} else {
			fetchPokemonList(0, 20);
		}
	},

	clearHeightRange: () => {
		heightRange.set({ min: null, max: null });
		currentPage.set(1);
		fetchPokemonList(0, 20);
	},

	// Pagination
	setPage: (page) => {
		currentPage.set(page);
		// Check if any filters are active
		const hasFilters = get(searchTerm) ||
			get(selectedRegions).length > 0 ||
			get(selectedTypes).length > 0 ||
			get(selectedWeaknesses).length > 0 ||
			get(weightRange).min !== null ||
			get(weightRange).max !== null ||
			get(heightRange).min !== null ||
			get(heightRange).max !== null;

		if (hasFilters) {
			// For filtered results, pagination is handled client-side
			// No need to fetch new data
		} else {
			// For unfiltered results, use server-side pagination
			const offset = (page - 1) * 20; // 20 items per page
			fetchPokemonList(offset, 20);
		}
	},

	setItemsPerPage: (items) => {
		itemsPerPage.set(items);
		currentPage.set(1);
	},

	// Reset all filters
	resetAllFilters: () => {
		searchTerm.set('');
		sortBy.set('id');
		sortOrder.set('asc');
		selectedRegions.set([]);
		selectedTypes.set([]);
		selectedWeaknesses.set([]);
		weightRange.set({ min: null, max: null });
		heightRange.set({ min: null, max: null });
		currentPage.set(1);
		fetchPokemonList(0, 20);
	},

	// Load initial data
	loadInitialData: () => {
		currentPage.set(1);
		fetchPokemonList(0, 20);
	}
};

// Initialize with first page of data
fetchPokemonList(0, 20);
