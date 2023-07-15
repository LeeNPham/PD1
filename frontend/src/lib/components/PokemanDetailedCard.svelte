<script>
	import EyeCloseIcon from '$lib/icons/EyeCloseIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { pokemon } from '$src/stores/pokestore';
	import { onMount } from 'svelte';

	export let pokemanGenus;
	export let pokeman;
	onMount(async () => {
		console.log(pokeman);
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
	<div class="pt-[125px] p-8 w-full h-[670px] rounded-xl bg-white flex flex-col items-start gap-1">
		<div class="text-md w-full text-center font-extrabold text-gray-500">#{pokeman.id}</div>
		<div class="text-3xl w-full text-center font-bold text-gray-900 capitalize">
			{pokeman.name}
		</div>
		<div class="text-primary-gray text-center w-full text-md">{pokemanGenus.genera[7].genus}</div>
		<div class="flex w-full justify-center gap-2">
			{#each pokeman.types as types}
				{@const buttonColor = `bg-buttons-${types.type.name}`}
				<div class="font-bold rounded-md text-black-800 px-3 py-1 {buttonColor}">
					{types.type.name}
				</div>
			{/each}
		</div>
		<div class="text-center text-sm py-2 w-full uppercase font-bold text-gray-800">
			pokédex entry
		</div>
		<div class="w-full h-20 text-sm text-black font-medium">
			{pokemanGenus.flavor_text_entries[1].flavor_text}
		</div>
		<div class="text-center py-2 text-sm w-full uppercase font-bold text-gray-800">abilities</div>
		<div class="flex w-full gap-5">
			{#each pokeman.abilities as ability}
				<div
					class="relative p-1 px-4 text-left w-full border rounded-full font-bold text-gray-800 capitalize {ability.is_hidden
						? 'border-red-800'
						: 'border-primary-gray'}"
				>
					{ability.ability.name}
					{#if ability.is_hidden}
						<div class="absolute right-3 top-[6px]">
							<EyeCloseIcon Class="h-5 w-5 stroke-primary-gray" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="flex flex-row w-full justify-between">
			<div class="flex flex-col w-1/2 items-center justify-center">
				<div>height</div>
				<div>{pokeman.height}</div>
				<div>weaknesses</div>
				<div>weakness types</div>
			</div>
			<div class="flex flex-col w-1/2 items-center justify-center">
				<div>weight</div>
				<div>{pokeman.weight}</div>
				<div>base exp</div>
				<div>{pokeman.base_experience}</div>
			</div>
		</div>
		<div class="text-center text-sm w-full uppercase font-bold text-gray-800">stats</div>
		<div class="flex w-full justify-evenly">
			<div>HP</div>
			<div>ATK</div>
			<div>DEF</div>
			<div>SpA</div>
			<div>SpO</div>
			<div>SPD</div>
			<div>TOT</div>
		</div>
		<div class="text-center text-sm w-full uppercase font-bold text-gray-800">evolution</div>
		<div class="flex w-full justify-between">
			<div>piplup</div>
			<div>level 16</div>
			<div>prinplup</div>
			<div>lvl 38</div>
			<div>emporion</div>
		</div>
		<div class="flex w-full justify-between">
			<a
				class="w-20 py-0.5 bg-gray-700 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
				href={`/pokemon/${pokeman.id - 1}`}
			>
				PREVIOUS
			</a>
			<a
				class="w-20 py-0.5 bg-gray-700 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
				href={`/pokemon/${pokeman.id + 1}`}
			>
				NEXT
			</a>
		</div>
	</div>
</div>
