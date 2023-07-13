<script>
	import { pageLocation } from '$src/stores/pokestore';

	// create some sort of onclick, have it grab the elements id value and re-assign the value of pageLocation to it
</script>

<nav
	class="sticky z-10 top-0 flex border-b-2 border-gray-900 items-center justify-center w-full bg-gray-500 h-auto py-4"
>
	<div
		class=" bg-white flex flex-row max-w-6xl w-full justify-between items-center h-20 text-gray-500 font-semibold rounded-xl"
	>
		<a id="home" class="mx-4 text-lg" href="/">Home</a>
		<a id="about" class="mx-4 text-lg" href="/about">About</a>
		<a id="pokedex" class="mx-4 text-lg" href="/">Pokédex</a>
		<a id="videogames" class="mx-4 text-lg" href="/">Videogames</a>
		<a id="tcg" class="mx-4 text-lg" href="/">TCG Pokémon</a>
		<a id="tv" class="mx-4 text-lg" href="/">TV Pokémon</a>
		<a id="play" class="mx-4 text-lg" href="/">Play!Pokémon</a>
		<a id="news" class="mx-4 text-lg" href="/">News</a>
	</div>
</nav>
