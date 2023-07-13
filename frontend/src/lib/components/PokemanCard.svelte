<script>
	export let pokeman;
</script>

<a
	class="relative pt-10 p-6 w-[210px] h-[135px] bg-white text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokeman.id}`}
>
	<img class="absolute boop -top-7 h-10 w-10" src={pokeman.image} alt={pokeman.name} />
	<div class="uppercase text-sm font-bold gap-2 flex flex-col w-full justify-between">
		<div class="text-xs font-extrabold text-gray-500">Nº{pokeman.id}</div>
		<div>{pokeman.name}</div>
		<div class="flex flex-wrap gap-2 text-xs font-bold uppercase">
			<button class="p-1 rounded-md bg-green-400 uppercase">grass</button>
			<button class="p-1 rounded-md bg-red-600 uppercase">fire</button>
		</div>
	</div>
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
