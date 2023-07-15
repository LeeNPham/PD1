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
					grass: '#A8EF95',
					ground: '#F0C079',
					fighting: '#D8573E',
					fire: '#F59C59',
					water: '#8FAEEF',
					steel: '#B2BDD5',
					electricity: '#F0DE86',
					poison: '#CB95EC'
				}
			}
		}
	}
};

module.exports = config;
