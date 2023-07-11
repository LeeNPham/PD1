<script>
	export let pokeman;
</script>

<a
	class="relative p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokeman.id}`}
>
	<div
		class="bg-blue-300 rounded-full aspect-square w-40 border border-gray-500 shadow-lg shadow-black/50"
	/>
	<img class="absolute boop h-40 w-40" src={pokeman.image} alt={pokeman.name} />
	<h2 class="uppercase text-2xl flex flex-row w-full justify-between">
		<div class="text-[50px] text-gray-900"># {pokeman.id}</div>
		<div>{pokeman.name}</div>
	</h2>
</a>

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
