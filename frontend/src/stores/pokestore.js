import { writable } from 'svelte/store';

export const pageLocation = writable('home');
export const pokemon = writable([]);

const fetchPokemon = async (num) => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=${num}`;
	const res = await fetch(url);
	const data = await res.json();
	const loadedPokemon = data.results.map((data, index) => {
		let img;
		if (index + 1 > 649) {
			img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
				index + 1
			}.png`;
		} else {
			img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
				index + 1
			}.gif`;
		}

		return {
			name: data.name,
			id: index + 1,
			image: img
		};
	});
	pokemon.set(loadedPokemon);
};

fetchPokemon(50);
