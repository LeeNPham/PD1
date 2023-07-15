<script>
	import EyeCloseIcon from '$lib/icons/EyeCloseIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { onMount } from 'svelte';

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

	export let pokemanGenus;
	export let pokeman;
	let showHidden = false;
	onMount(async () => {
		console.log(pokeman);
	});
</script>

<div class="bg-buttons-grass" />
<div class="bg-buttons-steel" />
<div class="bg-buttons-ground" />
<div class="bg-buttons-fire" />
<div class="bg-buttons-water" />
<div class="bg-buttons-electricity" />
<div class="bg-buttons-bug" />

<div class="relative">
	<div class="absolute h-[250px] w-full flex items-center justify-center">
		<img
			class="h-full w-auto object-cover"
			src={pokeman.sprites.other['official-artwork'].front_default}
			alt={pokeman.name}
		/>
	</div>
	<div id="placeholderSpace" class="h-[115px]" />
	<div class="pt-[125px] p-8 w-full h-[875px] rounded-xl bg-white flex flex-col items-start gap-1">
		<div class="text-md w-full text-center font-extrabold text-gray-500">#{pokeman.id}</div>
		<div class="text-3xl w-full text-center font-bold text-gray-900 capitalize">
			{pokeman.name}
		</div>
		<div class="text-primary-gray text-center w-full text-md">{pokemanGenus.genera[7].genus}</div>
		<div class="flex w-full justify-center gap-2">
			{#each pokeman.types as types}
				{@const buttonColor = `bg-buttons-${types.type.name}`}
				<div class="font-bold rounded-md text-black/70 px-3 py-1 {buttonColor}">
					{types.type.name}
				</div>
			{/each}
		</div>
		<div class="text-center text-sm py-2 w-full uppercase font-bold text-gray-800">
			pokédex entry
		</div>
		<div class="w-full min-h-[55px] text-sm text-black font-medium">
			{pokemanGenus.flavor_text_entries[1].flavor_text}
		</div>
		<div class="text-center py-2 text-sm w-full uppercase font-bold text-gray-800">abilities</div>
		<div class="flex w-full justify-evenly gap-3">
			{#each pokeman.abilities as ability}
				<div
					class="relative p-1 px-4 text-left w-full whitespace-nowrap border rounded-full font-bold text-gray-800 capitalize {ability.is_hidden
						? 'border-red-800'
						: 'border-primary-gray'}"
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
					class="w-full h-auto my-2 py-1 bg-primary-background rounded-full text-center font-bold text-sm flex flex-row gap-4"
				>
					{#each pokeman.types as types}
						{#each weaknessesMap[types.type.name] as weakness}
							<div>{weakness}</div>
							<!-- display as weakness badges -->
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
		<div class="text-center text-sm w-full uppercase font-bold text-gray-800">evolution</div>
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
				<div class="bg-gray-200 rounded-full p-1 px-2 text-xs font-bold text-gray-500">
					evolves to
				</div>
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
		<div class="flex flex-row w-full justify-between bg-gray-200 rounded-md py-2">
			<a
				class="w-full h-full text-white text-center flex items-center border-r px-4 justify-start gap-4 border-gray-500"
				href={`/pokemon/${pokeman.id - 1}`}
			>
				<div>◀</div>
				<img
					class="h-14 w-auto object-cover"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
						pokeman.id - 1
					}.gif`}
					alt=""
				/>
			</a>
			<a
				class="w-full h-full text-white text-center flex items-center border-l px-4 justify-end gap-4"
				href={`/pokemon/${pokeman.id + 1}`}
			>
				<img
					class="h-14 w-auto object-cover"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
						pokeman.id + 1
					}.gif`}
					alt=""
				/>
				<div>▶</div>
			</a>
		</div>
	</div>
</div>
