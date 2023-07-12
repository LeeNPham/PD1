<script>
	export let pokeman;
</script>

<a
	class="relative p-6 w-[250px] h-[150px] bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokeman.id}`}
>
	<img class="absolute boop -top-8 h-14 w-14" src={pokeman.image} alt={pokeman.name} />
	<h2 class="uppercase text-2xl flex flex-row w-full justify-between">
		<div class="text-sm font-extrabold text-gray-500">Nº{pokeman.id}</div>
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
