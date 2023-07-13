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
				buttons: {
					grass: '#a8ef95',
					ground: '#ffcd83',
					fighting: '#df7763',
					fire: '#ff994d',
					water: '#98baff',
					steel: '#98baff',
					electricity: '#fce67f'
				},
				stats: {
					grass: '#a8ef95',
					ground: '#ffcd83',
					fighting: '#df7763',
					fire: '#ff994d',
					water: '#98baff',
					steel: '#98baff',
					electricity: '#fce67f'
				},
				types: {
					grass: '#a8ef95',
					ground: '#ffcd83',
					fighting: '#df7763',
					fire: '#ff994d',
					water: '#98baff',
					steel: '#98baff',
					electricity: '#fce67f'
				}
			}
		}
	}
};

module.exports = config;
