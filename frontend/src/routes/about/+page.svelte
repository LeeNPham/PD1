<script>
	import PokemonLogo from '$lib/icons/PokemonLogo.svelte';
	import uiSpec from '$lib/images/uispec.gif';
</script>

<svelte:head>
	<title>About the Author</title>
</svelte:head>

<div class="flex flex-col gap-5 w-full px-10 border rounded-3xl bg-white font-medium">
	<h1 class="text-4xl text-center my-8 uppercase font-bold tracking-wide">About</h1>
	<p class="indent-4 text-gray-700">
		This is my practice project to get used to svelte a lil more, I grabbed an image from dribble
		that I liked so that I could simulate an actual work environment where I developed the front end
		and its endpoints based on a UI spec.
	</p>

	<h1 class="flex items-center gap-10 text-4xl font-medium uppercase justify-center">
		Bringing the world together <PokemonLogo Class="fill-blue-700 h-40 w-auto" />
	</h1>
	<h2 class="font-extrabold text-center w-full text-3xl">Our Mission</h2>
	<p class="indent-4">
		The world of Pokémon connects people across the globe, beloved by kids, adults, and every
		Trainer in between! These incredible creatures have crossed borders and language barriers to
		reach the hearts of millions for over 25 years, bringing people together through the joy of play
		and discovery.
	</p>
	<img class="border" src={uiSpec} alt="" />
</div>
