<script>
	import PokemanDetailedCard from '$lib/components/PokemanDetailedCard.svelte';

	export let data;
	console.log(data);
</script>

<div class="flex flex-col items-center gap-5">
	<h1 class="text-4xl text-center my-8 uppercase font-bold text-white">{data.pokeman.name}</h1>
	<div class="flex flex-col gap-4 items-center p-5 bg-gray-400 rounded-xl">
		<p class="bg-white px-10 rounded-lg py-1">
			<strong>Type:</strong>
			{data.pokeman.types[0].type.name} |
			<strong>Height: </strong>
			{data.pokeman.height} decimeters |
			<strong>Weight: </strong>
			{data.pokeman.height} hectograms
		</p>
		<img
			class="h-20 w-auto"
			src={data.pokeman.sprites.versions['generation-v']['black-white'].animated.front_default}
			alt={data.pokeman.name}
		/>

		<div class="flex flex-row gap-10 items-baseline px-10 py-1 bg-gray-300 rounded-xl">
			<a
				class="w-20 py-0.5 bg-gray-700 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
				href={`/pokemon/${data.pokeman.id - 1}`}
			>
				PREVIOUS
			</a>
			<a
				class="w-20 py-0.5 bg-gray-700 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
				href={`/pokemon/${data.pokeman.id + 1}`}
			>
				NEXT
			</a>
		</div>
	</div>
</div>

<PokemanDetailedCard />
