<script>
	import { onMount } from 'svelte';
	import { pokemon } from '$src/stores/pokestore';

	export let pokemanGenus;

	let res;
	let evolutionList = [];

	async function loadEvolutions() {
		evolutionList = [];
		try {
			const url = pokemanGenus.evolution_chain.url;
			const answer = await fetch(url);
			res = await answer.json();
			evolutionList.push([res.chain.species.name, await findObjectByName(res.chain.species.name)]);
			console.log(evolutionList);
			if (res.chain.evolves_to[0]) {
				evolutionList.push([
					res.chain.evolves_to[0].species.name,
					await findObjectByName(res.chain.evolves_to[0].species.name),
					res.chain.evolves_to[0].evolution_details[0].item
						? res.chain.evolves_to[0].evolution_details[0].item.name
						: res.chain.evolves_to[0].evolution_details[0].min_level
						? `Lvl ${res.chain.evolves_to[0].evolution_details[0].min_level}`
						: 'Friendship'
				]);
			}
			if (res.chain.evolves_to[0].evolves_to[0]) {
				evolutionList.push([
					res.chain.evolves_to[0].evolves_to[0].species.name,
					await findObjectByName(res.chain.evolves_to[0].evolves_to[0].species.name),
					res.chain.evolves_to[0].evolves_to[0].evolution_details[0].item
						? res.chain.evolves_to[0].evolves_to[0].evolution_details[0].item.name
						: res.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level
						? `Lvl ${res.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}`
						: 'Friendship'
				]);
			}
			evolutionList = evolutionList;
		} catch (error) {
			console.log('No evolution chain');
		}
	}

	async function findObjectByName(pokemanName) {
		const res1 = await $pokemon.find((obj) => obj.name === pokemanName);
		return res1.id;
	}

	$: {
		if (pokemanGenus) {
			loadEvolutions();
		}
	}

	onMount(async () => {
		// loadEvolutions();
	});
</script>

<div class="text-center text-sm w-full uppercase font-bold text-gray-800 pt-2">evolution</div>

{#if evolutionList.length > 0}
	<div class="flex flex-row justify-between w-full items-center min-h-[70px]">
		{#each evolutionList as evolution}
			{#if evolution[2]}
				<div
					class="bg-gray-200 px-2 py-1.5 flex items-center rounded-full text-[12px] font-extrabold whitespace-nowrap text-gray-400"
				>
					{evolution[2]}
				</div>
			{/if}
			<button class="flex items-center flex-col justify-center">
				<img
					class="h-14"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution[1]}.png`}
					alt=""
				/>
			</button>
		{/each}
	</div>
{:else}
	<div class="flex flex-row justify-center text-center font-bold w-full items-center min-h-[70px]">
		No Evolution Info
	</div>
{/if}
