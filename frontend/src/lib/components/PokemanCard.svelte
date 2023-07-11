<script>
	import { onMount } from 'svelte';

	export let pokeman;

	onMount(() => {
		console.log(pokeman);
	});
</script>

<a
	class="relative p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
	href={`/pokemon/${pokeman.id}`}
>
	<div class="bg-blue-300 rounded-full aspect-square w-40" />
	<img class="absolute boop h-40 w-40" src={pokeman.image} alt={pokeman.name} />
	<h2 class="uppercase text-2xl">{pokeman.id} {pokeman.name}</h2>
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
