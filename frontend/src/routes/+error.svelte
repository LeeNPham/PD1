<script>
	import PokeBall from '$lib/icons/PokeBall.svelte';
	import { goto } from '$app/navigation';
	export let error;
	export let status;
</script>

<div
	class="flex flex-col items-center justify-center min-h-screen bg-primary-background text-center p-8"
>
	<PokeBall Class="w-32 h-32 mb-6 fill-red-500 animate-bounce" />
	<h1 class="text-6xl font-extrabold text-red-600 mb-4">{status === 404 ? '404' : status}</h1>
	<h2 class="text-3xl font-bold mb-2">
		{status === 404 ? 'Pokémon Not Found!' : 'Something went wrong!'}
	</h2>
	<p class="text-lg text-gray-700 mb-6">
		{status === 404
			? "Looks like this Pokémon ran away or the page doesn't exist."
			: error?.message || 'An unexpected error occurred.'}
	</p>
	<button
		class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow"
		on:click={() => goto('/')}>Back to Pokédex</button
	>
</div>
