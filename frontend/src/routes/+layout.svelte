<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
	import PokeBall from '$lib/icons/PokeBall.svelte';
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta
		name="description"
		content="A beautiful SvelteKit Pokédex app with search, filters, and Pokémon details."
	/>
	<meta property="og:title" content="SvelteKit Pokédex" />
	<meta
		property="og:description"
		content="A beautiful SvelteKit Pokédex app with search, filters, and Pokémon details."
	/>
	<meta property="og:image" content="/favicon.png" />
	<meta name="theme-color" content="#2563eb" />
</svelte:head>

<div class="absolute">
	<PokeBall
		Class="h-[600px] w-[600px] fill-primary-gray/5 -translate-x-[150px] -translate-y-[150px]"
	/>
</div>
<div class="w-full min-h-screen bg-primary-background">
	<Nav />
	<div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-5">
		<slot />
	</div>
</div>
