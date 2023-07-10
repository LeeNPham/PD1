<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<div class="p-8 max-w-6xl mx-auto">
	<Nav />
	<slot />
</div>
