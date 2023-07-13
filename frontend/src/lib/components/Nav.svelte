<script>
	import { pageLocation } from '$src/stores/pokestore';

	// create some sort of onclick, have it grab the elements id value and re-assign the value of pageLocation to it
</script>

<nav class="sticky z-10 top-0 flex items-center justify-center w-full h-auto py-4">
	<div
		class=" bg-white flex flex-row max-w-6xl w-full justify-between items-center h-20 text-gray-500 font-semibold rounded-xl shadow-lg shadow-black/5"
	>
		<a id="home" class="mx-4 text-lg text-primary-navbutton" href="/">Home</a>
		<a id="about" class="mx-4 text-lg text-primary-navbutton" href="/about">About</a>
		<a id="pokedex" class="mx-4 text-lg text-primary-navbutton" href="/">Pokédex</a>
		<a id="videogames" class="mx-4 text-lg text-primary-navbutton" href="/">Videogames</a>
		<a id="tcg" class="mx-4 text-lg text-primary-navbutton" href="/">TCG Pokémon</a>
		<a id="tv" class="mx-4 text-lg text-primary-navbutton" href="/">TV Pokémon</a>
		<a id="play" class="mx-4 text-lg text-primary-navbutton" href="/">Play!Pokémon</a>
		<a id="news" class="mx-4 text-lg text-primary-navbutton" href="/">News</a>
	</div>
</nav>
