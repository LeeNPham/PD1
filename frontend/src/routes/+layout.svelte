<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<div class="w-full h-full bg-primary-background">
	<Nav />
	<div class="py-5 max-w-6xl mx-auto flex flex-row items-start gap-10">
		<slot />
	</div>
</div>
