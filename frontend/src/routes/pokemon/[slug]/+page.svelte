<script>
	export let data;
	console.log(data);
</script>

<div class="flex flex-col items-center gap-5">
	<h1 class="text-4xl text-center my-8 uppercase">{data.pokeman.name}</h1>
	<p class="bg-white px-10 rounded-lg py-1">
		Type: <strong>{data.pokeman.types[0].type.name}</strong> | Height:
		<strong>{data.pokeman.height}</strong>
		| Weight: <strong>{data.pokeman.height}</strong>
	</p>
	<img
		class="bg-blue-300 rounded-full shadow-lg shadow-black/50 h-40 w-40"
		src={data.pokeman.sprites['front_default']}
		alt={data.pokeman.name}
	/>

	<div class="flex flex-row gap-10 items-baseline">
		<a
			class="px-2 py-1 bg-gray-700 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
			href={`/pokemon/${data.pokeman.id - 1}`}
		>
			previous
		</a>
		<a
			class="px-2 py-1 bg-gray-700 text-white text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
			href={`/pokemon/${data.pokeman.id + 1}`}
		>
			next
		</a>
	</div>
</div>
