//@ts-nocheck
import { writable } from 'svelte/store';

export const pageLocation = writable('home');
export const pokemon = writable([]);

const fetchPokemon = async (num) => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=${num}`;
	const res = await fetch(url);
	const data = await res.json();

	const loadedPokemon = data.results.map((data, index) => {
		let img;
		let region;
		if (index + 1 > 649) {
			img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
				index + 1
			}.png`;
		} else {
			img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
				index + 1
			}.gif`;
		}
		if (index + 1 < 152) {
			region = 'kanto';
		} else if (index + 1 >= 152 && index + 1 < 252) {
			region = 'jhoto';
		} else if (index + 1 >= 252 && index + 1 < 387) {
			region = 'hoenn';
		} else if (index + 1 >= 387 && index + 1 < 494) {
			region = 'sinnoh';
		} else if (index + 1 >= 494 && index + 1 < 650) {
			region = 'unova';
		} else if (index + 1 >= 650 && index + 1 < 722) {
			region = 'kalos';
		} else if (index + 1 >= 722 && index + 1 < 810) {
			region = 'alola';
		} else if (index + 1 >= 810 && index + 1 < 906) {
			region = 'galar';
		} else {
			region = 'paldea';
		}

		return {
			name: data.name,
			id: index + 1,
			image: img,
			region
		};
	});
	pokemon.set(loadedPokemon);
};

fetchPokemon(1008);
