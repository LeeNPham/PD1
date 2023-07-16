import { writable } from 'svelte/store';

export const pageLocation = writable('home');
export const pokemon = writable([]);

const fetchPokemon = async (num) => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=${num}`;
	const res = await fetch(url);
	const data = await res.json();
	const loadedPokemon = data.results.map((data, index) => {
		return {
			name: data.name,
			id: index + 1,
			image: `https:raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
				index + 1
			}.gif`

			// 	   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif'
		};
	});
	pokemon.set(loadedPokemon);
};

fetchPokemon(1008);
