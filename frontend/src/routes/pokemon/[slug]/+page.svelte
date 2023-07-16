<script>
	import PokemanDetailedCard from '$lib/components/PokemanDetailedCard.svelte';

	export let data;
</script>

<div class="flex justify-center w-full">
	<div class="w-[384px] scale-90 -translate-y-16">
		<PokemanDetailedCard pokeman={data.pokeman} pokemanGenus={data.pokemanGenus} />
	</div>
</div>
