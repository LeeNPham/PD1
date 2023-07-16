<script>
	import uiSpec from '$lib/images/uispec.gif';
</script>

<svelte:head>
	<title>About the Author</title>
</svelte:head>

<div class="flex flex-col">
	<h1 class="text-4xl text-center my-8 uppercase">About</h1>
	<p>
		This is my practice project to get used to svelte a lil more, I grabbed an image from dribble
		that I liked so that I could simulate an actual work environment where I developed the front end
		and its endpoints based on a UI spec.
	</p>

	<h1 class="view-check slide-in from-down in-view">
		Bringing the world together <span class="nowrap">through Pokémon</span>
	</h1>
	<h2 class="view-check slide-in from-down in-view">Our Mission</h2>
	<p class="view-check slide-in from-down in-view">
		The world of Pokémon connects people across the globe, beloved by kids, adults, and every
		Trainer in between! These incredible creatures have crossed borders and language barriers to
		reach the hearts of millions for over 25 years, bringing people together through the joy of play
		and discovery.
	</p>
	<img class="border" src={uiSpec} alt="" />
</div>
