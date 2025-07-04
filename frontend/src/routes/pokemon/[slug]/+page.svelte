<script lang="ts">
	import PokemanDetailedCard from '$lib/components/PokemanDetailedCard.svelte';
	import { goto } from '$app/navigation';

	export let data: any;
	let pokeId = data?.pokeman?.id ?? data?.pokemanGenus?.id ?? null;
</script>

{#if data?.pokeman && data?.pokemanGenus}
	<div class="flex flex-col items-center w-full min-h-screen bg-white py-8">
		<button
			class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
			on:click={() => goto('/')}>← Back to Pokédex</button
		>
		<div class="w-[400px] scale-90 -translate-y-8">
			<PokemanDetailedCard {pokeId} pokeman={data.pokeman} pokemanGenus={data.pokemanGenus} />
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center w-full min-h-screen bg-white py-8">
		<button
			class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
			on:click={() => goto('/')}>← Back to Pokédex</button
		>
		<div class="text-2xl text-gray-600">Pokémon not found or data missing.</div>
	</div>
{/if}
