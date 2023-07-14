<script context='module'>

</script>

<script>
	import { onMount } from 'svelte';

	export let pokeman
	onMount(async () => {
		// console.log(pokeman);
		// this is to get the species endpoint, see who it evolves into/from, and its genus
		// current data = https://pokeapi.co/api/v2/pokemon/395
		// https://pokeapi.co/api/v2/pokemon-species/395}/
	});
</script>

<div class="relative">
	<div class="absolute h-[250px] w-full flex items-center justify-center">
		<img
			class="h-full w-auto object-cover"
			src={pokeman.sprites.other['official-artwork'].front_default}
			alt={pokeman.name}
		/>
	</div>
	<div id="placeholderSpace" class="h-[125px]" />
	<div class="pt-[125px] p-8 w-full h-[670px] rounded-xl bg-white flex flex-col items-start">
		<div>{pokeman.id}</div>
		<div>{pokeman.name}</div>
		<div>pokemon genus</div>
		<div class='flex w-full justify-evenly'>
			{#each pokeman.types as types}
				<div>{types.type.name}</div>
			{/each}
		</div>
		<div class='text-center w-full uppercase font-bold text-gray-800'>pokédex entry</div>
		<div class='border w-full h-20'>pokemon description</div>
		<div class='text-center w-full uppercase font-bold text-gray-800'>abilities</div>
		<div class='flex w-full gap-5'>
			{#each pokeman.abilities as ability}
			<div class='p-2 px-4 w-full border rounded-full font-bold text-gray-800 capitalize'>{ability.ability.name}</div>
			{/each}
		</div>
		<div class='flex flex-row w-full justify-between'>
			<div class='flex flex-col w-1/2 items-center justify-center'>
				<div>height</div>
				<div>height value</div>
				<div>weaknesses</div>
				<div>weakness types</div>
			</div>
			<div class='flex flex-col w-1/2 items-center justify-center'>
				<div>weight</div>
				<div>weight value</div>
				<div>base exp</div>
				<div>base exp value</div>
			</div>
		</div>
		<div class='text-center w-full uppercase font-bold text-gray-800'>stats</div>
		<div class='flex w-full justify-evenly'>
			<div>HP</div>
			<div>ATK</div>
			<div>DEF</div>
			<div>SpA</div>
			<div>SpO</div>
			<div>SPD</div>
			<div>TOT</div>
		</div>
		<div class='text-center w-full uppercase font-bold text-gray-800'>evolution</div>
		<div class='flex w-full justify-between'>
			<div>piplup </div>
			<div>level 16</div>
			<div>prinplup </div>
			<div>lvl 38</div>
			<div>emporion </div>
		</div>
		<div class='flex w-full justify-between'>
			<div>previous pokeman</div>
			<div>next pokeman</div>
		</div>





















	</div>
</div>
