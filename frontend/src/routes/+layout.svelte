<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
	import PokeBall from '$lib/icons/PokeBall.svelte';
</script>

<div class="absolute">
	<PokeBall
		Class="h-[600px] w-[600px] fill-primary-gray/5 -translate-x-[150px] -translate-y-[150px]"
	/>
</div>
<div class="w-full min-h-screen bg-primary-background">
	<Nav />
	<div class="max-w-6xl mx-auto flex flex-row items-start gap-10">
		<slot />
	</div>
</div>
