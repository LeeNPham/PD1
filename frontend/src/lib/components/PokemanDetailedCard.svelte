<script>
	//@ts-nocheck
	import EyeCloseIcon from '$lib/icons/EyeCloseIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { onMount } from 'svelte';
	import EvolutionChain from './EvolutionChain.svelte';
	import Bug from '$lib/icons/types/Bug.svelte';
	import Dark from '$lib/icons/types/Dark.svelte';
	import Dragon from '$lib/icons/types/Dragon.svelte';
	import Electric from '$lib/icons/types/Electric.svelte';
	import Fairy from '$lib/icons/types/Fairy.svelte';
	import Fighting from '$lib/icons/types/Fighting.svelte';
	import Fire from '$lib/icons/types/Fire.svelte';
	import Flying from '$lib/icons/types/Flying.svelte';
	import Ghost from '$lib/icons/types/Ghost.svelte';
	import Grass from '$lib/icons/types/Grass.svelte';
	import Ground from '$lib/icons/types/Ground.svelte';
	import Ice from '$lib/icons/types/Ice.svelte';
	import Normal from '$lib/icons/types/Normal.svelte';
	import Poison from '$lib/icons/types/Poison.svelte';
	import Psychic from '$lib/icons/types/Psychic.svelte';
	import Rock from '$lib/icons/types/Rock.svelte';
	import Steel from '$lib/icons/types/Steel.svelte';
	import Water from '$lib/icons/types/Water.svelte';
	import Male from '$lib/icons/Male.svelte';
	import Female from '$lib/icons/Female.svelte';
	import Shiny from '$lib/icons/Shiny.svelte';
	const iconDict = {
		bug: Bug,
		dark: Dark,
		dragon: Dragon,
		electric: Electric,
		fairy: Fairy,
		fighting: Fighting,
		fire: Fire,
		flying: Flying,
		ghost: Ghost,
		grass: Grass,
		ground: Ground,
		ice: Ice,
		normal: Normal,
		poison: Poison,
		psychic: Psychic,
		rock: Rock,
		steel: Steel,
		water: Water
	};

	const weaknessesMap = {
		normal: ['fighting'],
		fire: ['water', 'ground', 'rock'],
		water: ['grass', 'electric'],
		grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
		electric: ['ground'],
		ice: ['fire', 'fighting', 'rock', 'steel'],
		fighting: ['flying', 'psychic', 'fairy'],
		poison: ['ground', 'psychic'],
		ground: ['water', 'grass', 'ice'],
		flying: ['electric', 'ice', 'rock'],
		psychic: ['bug', 'ghost', 'dark'],
		bug: ['fire', 'flying', 'rock'],
		rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
		ghost: ['ghost', 'dark'],
		dragon: ['ice', 'dragon', 'fairy'],
		dark: ['fighting', 'bug', 'fairy'],
		steel: ['fire', 'fighting', 'ground'],
		fairy: ['poison', 'dragon']
	};
	const statMap = {
		hp: ['HP', 'bg-red-700'],
		attack: ['ATK', 'bg-orange-400'],
		defense: ['DEF', 'bg-yellow-300'],
		'special-attack': ['SpA', 'bg-cyan-400'],
		'special-defense': ['SpD', 'bg-green-300'],
		speed: ['SPD', 'bg-pink-400']
	};

	let showHidden = false;
	let sexImg = true;
	export let pokeId;
	export let pokeman;
	export let pokemanGenus;
	$: hiddenText = showHidden == true ? 'text-gray-800' : 'text-white';

	onMount(() => {
		// console.log(pokeman);
		// console.log(pokemanGenus);
	});
</script>

<div class="bg-type-normal" />
<div class="bg-type-steel" />
<div class="bg-type-ground" />
<div class="bg-type-flying" />
<div class="bg-type-water" />
<div class="bg-type-electric" />
<div class="bg-type-bug" />
<div class="bg-type-poison" />
<div class="bg-type-psychic" />
<div class="bg-type-ice" />
<div class="bg-type-rock" />
<div class="bg-type-fairy" />
<div class="bg-type-fire" />
<div class="bg-type-dark" />
<div class="bg-type-dragon" />
<div class="bg-type-fighting" />
<div class="bg-type-ghost" />
<div class="bg-type-grass" />
{#if pokeman && pokemanGenus}
	<div class="relative scale-[85%]">
		<div class="absolute h-[250px] w-full flex items-center justify-center">
			{#if sexImg == true}
				<img
					class="h-full w-auto object-cover"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeman.id}.png`}
					alt={pokeman.name}
				/>
			{:else}
				<img
					class="h-full w-auto object-cover"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeman.id}.png`}
					alt={pokeman.name}
				/>
			{/if}
			<div class="absolute flex flex-col gap-2 top-[135px] right-4">
				<button
					type="button"
					on:click={() => {
						sexImg = !sexImg;
					}}
					class=" rounded-lg hover:bg-yellow-600 bg-yellow-400 p-1"
				>
					<Shiny Class="w-6 h-6 fill-yellow-300" />
				</button>
			</div>
		</div>
		<div id="placeholderSpace" class="h-[115px]" />
		<div
			class="pt-[125px] p-8 w-full h-[875px] rounded-xl bg-white flex flex-col items-start gap-1"
		>
			<div class="text-md w-full text-center font-extrabold text-gray-500">#{pokeman.id}</div>
			<div class="text-3xl w-full text-center font-bold text-gray-900 capitalize">
				{pokeman.name}
			</div>
			<div class="text-primary-gray text-center w-full text-md">
				{#if pokeId < 899}
					{pokemanGenus.genera[7].genus}
				{:else if pokeId >= 899}
					{pokemanGenus.genera[3].genus}
				{:else}
					{pokemanGenus.genera[0].genus}
				{/if}
			</div>
			<div class="flex w-full justify-center gap-2">
				{#each pokeman.types as types}
					{@const buttonColor = `bg-type-${types.type.name}`}
					<div class="font-bold rounded-md text-black/70 px-3 py-1 {buttonColor}">
						{types.type.name}
					</div>
				{/each}
			</div>
			<div class="text-center text-sm py-2 w-full uppercase font-bold text-gray-800">
				pokédex entry
			</div>
			<div class="w-full min-h-[55px] text-sm text-black font-medium">
				<!-- {pokemanGenus.flavor_text_entries[14].flavor_text} -->
				{#if pokeId < 387}
					{pokemanGenus.flavor_text_entries[14].flavor_text}
				{:else if pokeId < 494}
					{pokemanGenus.flavor_text_entries[2].flavor_text}
				{:else if pokeId < 646}
					{pokemanGenus.flavor_text_entries[1].flavor_text}
				{:else if pokeId < 647}
					{pokemanGenus.flavor_text_entries[2].flavor_text}
				{:else if pokeId < 649}
					{pokemanGenus.flavor_text_entries[0].flavor_text}
				{:else if pokeId < 650}
					{pokemanGenus.flavor_text_entries[1].flavor_text}
				{:else if pokeId < 721}
					{pokemanGenus.flavor_text_entries[6].flavor_text}
				{:else if pokeId < 899}
					{pokemanGenus.flavor_text_entries[7].flavor_text}
				{:else}
					{pokemanGenus.flavor_text_entries[0].flavor_text}
				{/if}
			</div>
			<div class="text-center py-2 text-sm w-full uppercase font-bold text-gray-800">abilities</div>
			<div class="flex w-full justify-evenly gap-3">
				{#each pokeman.abilities as ability}
					<div
						class="relative p-1 px-4 text-left w-full whitespace-nowrap border rounded-full font-bold capitalize {ability.is_hidden
							? `border-red-800 text-gray-800 ${hiddenText}`
							: 'border-primary-gray text-gray-800'}"
					>
						{ability.ability.name}

						{#if ability.is_hidden}
							<button
								on:click={() => {
									showHidden = !showHidden;
								}}
								class="absolute right-3 top-[6px]"
							>
								{#if showHidden}
									<EyeIcon Class="h-5 w-5 stroke-red-800 hover:stroke-black" />
								{:else}
									<EyeCloseIcon Class="h-5 w-5 stroke-primary-gray hover:stroke-black" />
								{/if}
							</button>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex flex-row gap-3 w-full justify-between">
				<div class="flex flex-col w-1/2 items-center justify-center">
					<div class="text-center text-sm w-full uppercase font-bold text-gray-800">height</div>
					<div
						class="w-full h-auto my-2 py-1 bg-primary-background rounded-full text-center font-bold text-sm"
					>
						{(pokeman.height / 10).toFixed(1)}m
					</div>
					<div class="text-center text-sm w-full uppercase font-bold text-gray-800">weaknesses</div>
					<div
						class="w-full h-auto my-2 py-1 bg-primary-background rounded-full text-center font-bold text-sm flex flex-row justify-evenly"
					>
						{#each pokeman.types as types}
							{#each weaknessesMap[types.type.name] as weakness}
								<svelte:component this={iconDict[weakness]} />
							{/each}
						{/each}
					</div>
				</div>
				<div class="flex flex-col w-1/2 items-center justify-center">
					<div class="text-center text-sm w-full uppercase font-bold text-gray-800">weight</div>
					<div
						class="w-full h-auto my-2 py-1 bg-primary-background rounded-full text-center font-bold text-sm"
					>
						{(pokeman.weight / 10).toFixed(1)}Kg
					</div>
					<div class="text-center text-sm w-full uppercase font-bold text-gray-800">base exp</div>
					<div
						class="w-full h-auto my-2 py-1 bg-primary-background rounded-full text-center font-bold text-sm"
					>
						{pokeman.base_experience}
					</div>
				</div>
			</div>
			<div class="text-center text-sm w-full uppercase font-bold text-gray-800">stats</div>
			<div class="flex w-full justify-between">
				{#each pokeman.stats as stat}
					{@const statName = statMap[stat.stat.name]}
					<div class="relative h-16 rounded-full bg-gray-200 flex justify-center w-8">
						<div
							class="absolute top-1 rounded-full w-7 h-7 overflow-visible items-center justify-center text-white font-semibold text-[10px] flex {statName[1]}"
						>
							{statName[0]}
						</div>
						<div
							class="absolute bottom-1 rounded-full w-7 h-7 overflow-visible items-center justify-center text-gray-900 font-extrabold text-[12px] flex"
						>
							{stat.base_stat}
						</div>
					</div>
				{/each}
			</div>
			<EvolutionChain {pokemanGenus} />

			<div class="flex flex-row w-full justify-between bg-gray-200 rounded-2xl py-5">
				<button
					on:click={() => {
						pokeId = pokeman.id - 1;
					}}
					class="{pokeman.id - 1 == 0
						? 'hidden'
						: ''} w-full h-full text-white text-center flex items-center border-r px-4 justify-start gap-4 border-gray-500"
				>
					<div class="text-gray-500 font-extrabold">{`<<`}</div>
					{#if pokeman.id - 1 <= 649 && pokeman.id - 1 > 0}
						<img
							class="h-8 w-auto object-cover"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
								pokeman.id - 1
							}.gif`}
							alt=""
						/>
					{:else if pokeman.id - 1 >= 650 && pokeman.id - 1 != 0}
						<img
							class="h-8 w-auto object-cover"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
								pokeman.id - 1
							}.png`}
							alt=""
						/>
					{/if}
					<div class="text-gray-500">#{pokeman.id - 1}</div>
				</button>
				<button
					on:click={() => {
						pokeId = pokeman.id + 1;
					}}
					class="w-full h-full text-white text-center flex items-center border-l px-4 justify-end gap-4 {pokeman.id +
						1 ==
					1009
						? 'hidden'
						: ''}"
					><div class="text-gray-500">#{pokeman.id + 1}</div>
					{#if pokeman.id + 1 <= 649}
						<img
							class="h-8 w-auto object-cover"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
								pokeman.id + 1
							}.gif`}
							alt=""
						/>
					{:else}
						<img
							class="h-8 w-auto object-cover"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
								pokeman.id + 1
							}.png`}
							alt=""
						/>
					{/if}
					<div class="text-gray-500 font-extrabold">>></div>
				</button>
			</div>
		</div>
	</div>
{/if}
