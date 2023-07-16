<script>
	import { onMount } from 'svelte';

	export let pokeman;
	export let pokemanGenus;
    let res
    let evolutionList = []

	onMount(async () => {
		console.log('hello world');
		const url = pokemanGenus.evolution_chain.url;
		const answer = await fetch(url);
		res = await answer.json();
		console.log(res);
        evolutionList.push([res.chain.species.name])
        if (res.chain.evolves_to){
            evolutionList.push([res.chain.evolves_to[0].species.name, res.chain.evolves_to[0].evolution_details[0].min_level])
        }
        if (res.chain.evolves_to[0].evolves_to) {
            evolutionList.push([res.chain.evolves_to[0].evolves_to[0].species.name, res.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level])
        }
        console.log('evlist',evolutionList)
        evolutionList=evolutionList

	});
</script>

<div class="text-center text-sm w-full uppercase font-bold text-gray-800">evolution</div>

<div class='flex flex-row justify-between w-full items-center'>
{#each evolutionList as evolution}

{#if evolution[1]}
<div class='bg-gray-200 px-2 py-1.5 flex items-center rounded-full text-xs font-extrabold whitespace-nowrap text-gray-500'>Lvl {evolution[1]}</div>
{/if}
<div class='flex items-center flex-col justify-center'>
    <div>img</div>
<div class="text-center w-full uppercase font-extrabold text-xs text-gray-500">{evolution[0]}</div>
</div>
{/each}
</div>


<div class="flex w-full justify-between items-center min-h-[100px]">
	{#if pokemanGenus.evolves_from_species}
		<div class="flex flex-col justify-center items-center">
			<img
				class="h-10 w-10 object-cover"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
					pokeman.id - 1
				}.png`}
				alt=""
			/>
			<div class="text-center w-full uppercase font-extrabold text-gray-500 text-xs">
				{pokemanGenus.evolves_from_species.name}
			</div>
		</div>
		<div class="bg-gray-200 rounded-full p-1 px-2 text-xs font-bold text-gray-500">evolves to</div>
		<div class="flex flex-col justify-center items-center">
			<img
				class="h-10 w-10 object-cover"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeman.id}.png`}
				alt=""
			/>
			<div class="text-center w-full uppercase font-extrabold text-xs text-gray-500">
				{pokeman.name}
			</div>
		</div>
	{:else}
		<div class="text-center w-full text-xl font-semibold text-black">No Pre-Evolution</div>
	{/if}
</div>
