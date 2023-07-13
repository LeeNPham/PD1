<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />
<div class="p-8 max-w-6xl mx-auto bg-gray-200 flex flex-row items-start gap-5">
	<div class="w-2/3">
		<slot />
	</div>
	<div class="w-1/3">
		<slot name="rightComponentCard">
			<div class="w-full h-[600px] rounded-xl bg-white flex items-center justify-center">
				Pokemon Card Details View
			</div>
		</slot>
	</div>
</div>
