<script>
	import { onMount } from 'svelte';

	export let data;
	onMount(async () => {
		console.log(data);
	});
</script>

<h1>PokeName</h1>
<h1 class="text-4xl text-center my-8 uppercase">{data.pokeman.name}</h1>
