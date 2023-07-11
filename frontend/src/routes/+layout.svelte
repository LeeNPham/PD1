<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />
<div class="p-8 max-w-6xl mx-auto bg-red-700">
	<slot />
</div>
