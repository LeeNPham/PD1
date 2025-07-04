<script>
	import PokeBall from '$lib/icons/PokeBall.svelte';
	export let pokeman;
	export let pokeId;
	export let selectPokemon;
	export let disabled = false;
</script>

<button
	on:click={() => !disabled && selectPokemon(pokeman.id)}
	class="relative pt-10 p-6 w-[225px] bg-white text-gray-800 text-center rounded-2xl shadow-md hover:shadow-lg shadow-primary-gray/20 flex flex-col items-center {disabled
		? 'opacity-50 cursor-not-allowed'
		: ''}"
	{disabled}
	title={disabled ? 'Special forms (Mega, Gmax, etc.) are not supported' : ''}
>
	{#if pokeman.id <= 10263}
		<img class="absolute boop -top-7 h-14 w-auto" src={pokeman.image} alt={pokeman.name} />
	{:else}
		<div class="flex items-center justify-center w-full h-full bg-gray-100 rounded">
			<PokeBall Class="w-16 h-16 text-gray-400" />
		</div>
	{/if}
	<div class="uppercase text-sm font-bold gap-2 flex flex-col w-full justify-between">
		<div class="text-xs font-extrabold text-gray-500">Nº{pokeman.id}</div>
		<div class="capitalize text-lg">{pokeman.name}</div>
		<div
			class="flex flex-wrap gap-2 text-[10px] font-extrabold tracking-tight uppercase justify-center items-center"
		>
			{#if pokeman.types && pokeman.types.length > 0}
				{#each pokeman.types as type}
					{@const buttonColor = `bg-type-${type}`}
					<div class="rounded-lg text-black/60 px-3 py-1 {buttonColor}">
						{type}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</button>

<style>
	@keyframes boop {
		0% {
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(-15deg);
		}
		40% {
			transform: rotate(15deg);
		}
		60% {
			transform: rotate(-7deg);
		}
		80% {
			transform: rotate(7deg);
		}
		90% {
			transform: rotate(-3deg);
		}
		95% {
			transform: rotate(2deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	.boop:hover {
		display: inline-block;
		animation: 1s boop forwards running;
	}
</style>
