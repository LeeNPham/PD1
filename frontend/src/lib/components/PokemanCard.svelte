<script>
	export let pokeman;
	import { onMount } from 'svelte';

	let pokemanTypes;
	export let pokeId;

	onMount(async () => {
		const genusUrl = `https://pokeapi.co/api/v2/pokemon/${pokeman.id}`;
		const gRes = await fetch(genusUrl);
		pokemanTypes = await gRes.json();
		// console.log(pokemanTypes.types);
	});
</script>

<!-- <a
	class="relative pt-10 p-6 w-[225px] bg-white text-gray-800 text-center rounded-2xl shadow-md hover:shadow-lg shadow-primary-gray/20 flex flex-col items-center"
	href={`/pokemon/${pokeman.id}`}
> -->
<button
	on:click={() => {
		pokeId = pokeman.id;
	}}
	class="relative pt-10 p-6 w-[225px] bg-white text-gray-800 text-center rounded-2xl shadow-md hover:shadow-lg shadow-primary-gray/20 flex flex-col items-center"
>
	<img class="absolute boop -top-7 h-14 w-auto" src={pokeman.image} alt={pokeman.name} />
	<div class="uppercase text-sm font-bold gap-2 flex flex-col w-full justify-between">
		<div class="text-xs font-extrabold text-gray-500">Nº{pokeman.id}</div>
		<div class="capitalize text-lg">{pokeman.name}</div>
		<div
			class="flex flex-wrap gap-2 text-[10px] font-extrabold tracking-tight uppercase justify-center items-center"
		>
			{#if pokemanTypes}
				{#each pokemanTypes.types as typeSet}
					{@const buttonColor = `bg-type-${typeSet.type.name}`}
					<div class="rounded-lg text-black/60 px-3 py-1 {buttonColor}">
						{typeSet.type.name}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</button>

<!-- </a> -->

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
