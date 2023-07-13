<script>
	import { pageLocation } from '$src/stores/pokestore';
	import PokeBall from '$lib/icons/PokeBall.svelte';

	// create some sort of onclick, have it grab the elements id value and re-assign the value of pageLocation to it
</script>

<nav class="sticky z-10 top-0 flex items-center justify-center w-full h-auto py-4">
	<div
		class=" bg-white flex flex-row max-w-6xl w-full justify-between items-center h-20 text-gray-500 font-semibold rounded-xl shadow-lg shadow-black/5"
	>
		<a
			id="home"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" />Home</a
		>
		<a
			id="about"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/about"><PokeBall Class="w-8 h-8 fill-inherit" />About</a
		>
		<a
			id="pokedex"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" /> Pokédex</a
		>
		<a
			id="videogames"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" />Videogames</a
		>
		<a
			id="tcg"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" />TCG Pokémon</a
		>
		<a
			id="tv"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" />TV Pokémon</a
		>
		<a
			id="play"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" />Play!Pokémon</a
		>
		<a
			id="news"
			class="whitespace-nowrap mx-2 gap-2 text-lg text-primary-navbutton fill-primary-navbutton hover:fill-primary-activebutton hover:text-primary-activebutton flex items-center"
			href="/"><PokeBall Class="w-8 h-8 fill-inherit" />News</a
		>
	</div>
</nav>
