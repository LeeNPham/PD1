/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				primary: {
					background: '#f6f8fc',
					activebutton: '#ff5350',
					navbutton: '#777777',
					gray: '#758a97'
				},
				type: {
					bug: '#A8EF95',
					dark: '#F0C079',
					dragon: '#D8573E',
					electric: '#F59C59',
					fairy: '#8FAEEF',
					fighting: '#B2BDD5',
					fire: '#F0DE86',
					flying: '#CB95EC',
					ghost: '#40C038',
					grass: '#D8573E',
					ground: '#F59C59',
					ice: '#8FAEEF',
					normal: '#B2BDD5',
					poison: '#F0DE86',
					psychic: '#CB95EC',
					rock: '#D8573E',
					steel: '#F59C59',
					water: '#8FAEEF'
				}
			}
		}
	}
};

module.exports = config;
