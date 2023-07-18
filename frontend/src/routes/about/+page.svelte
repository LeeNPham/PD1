<script>
	import PokemonLogo from '$lib/icons/PokemonLogo.svelte';
	import uiSpec from '$lib/images/uispec.gif';
</script>

<svelte:head>
	<title>About the Author</title>
</svelte:head>

<div class="flex flex-col gap-5 w-full px-10 border rounded-3xl bg-white font-medium py-10">
	<h1 class="text-4xl text-center mt-8 uppercase font-bold tracking-wide">About</h1>
	<p class="indent-4 text-gray-700">
		This is my practice project to get used to svelte a lil more, I grabbed an image from dribble
		that I liked so that I could simulate an actual work environment where I developed the front end
		and its endpoints based on a designers UI spec.
	</p>

	<h1
		class="text-3xl flex items-center flex-col text-center mt-8 uppercase font-bold tracking-wide"
	>
		Bringing the world together through<PokemonLogo Class="fill-blue-700 h-40 w-auto" />
	</h1>
	<h1 class="text-4xl text-center mt-8 uppercase font-bold tracking-wide">About this Pokedex</h1>
	<p>
		Welcome to mt Pokedex app! A comprehensive digital companion for all Pokémon trainers and
		enthusiasts! This app is designed to provide you with a seamless and immersive experience in
		your journey to catch 'em all. Whether you're a seasoned trainer or just starting your
		adventure, this app has everything you need to become a Pokémon Master.
	</p>

	<h1 class="text-4xl text-center mt-8 uppercase font-bold tracking-wide">Features</h1>
	<ul>
		<li>
			<strong>Complete Pokédex: </strong>
			Access a vast database of Pokémon species, including their descriptions, abilities, types, and
			evolutions. Explore detailed profiles for each Pokémon, complete with their moves, stats, and in-depth
			information.
		</li>
		<li>
			<strong>Search and Filter:</strong> Quickly find the Pokémon you're looking for using our powerful
			search and filtering options. Sort by name, type, region, or even by your own collection to easily
			locate the Pokémon you need.
		</li>
		<li>
			<strong>Personal Collection:</strong> Keep track of your captured Pokémon and build your own personal
			collection within the app. Mark the ones you've caught, track their levels, and set goals to complete
			your collection.
		</li>
		<li>
			<strong>Battle Simulator:</strong> Test your skills and strategize with our built-in battle simulator.
			Experiment with different movesets, see how your Pokémon fare against various opponents, and refine
			your battle tactics.
		</li>
		<li>
			<strong>News and Updates:</strong> Stay up to date with the latest Pokémon news, game releases,
			events, and announcements. Get notified about new Pokémon, special promotions, and community activities
			to ensure you never miss an important update.
		</li>
	</ul>

	<h1 class="text-4xl text-center mt-8 uppercase font-bold tracking-wide">Development Team</h1>
	<p>
		This app was developed by me, Lee Pham! I'm dedicated to creating the ultimate tool for trainers
		worldwide. I'm an experienced developer, designer, and Pokémon experts who has poured mt love
		for the franchise into every aspect of the app.
	</p>

	<h1 class="text-4xl text-center mt-8 uppercase font-bold tracking-wide">Contact Me!</h1>
	<p>
		I'd love to hear from you! If you have any feedback, suggestions, or questions regarding this
		app, please feel free to reach out to me through social media or email. I value your input and
		strive to continuously improve the app based on the community's needs and desires.
	</p>

	<img class="border" src={uiSpec} alt="" />
</div>
