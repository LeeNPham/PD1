<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<div class="w-full h-full bg-primary-background">
	<Nav />
	<div class="py-5 max-w-6xl mx-auto flex flex-row items-start gap-10">
		<div class="w-2/3">
			<slot />
		</div>
		<div class="w-1/3">
			<slot name="rightComponentCard">
				<div class="">
					<div class="h-[100px] flex items-end justify-center">image</div>
					<div class="w-full h-[670px] rounded-xl bg-white flex items-center justify-center">
						Pokemon Card Details View
					</div>
				</div>
			</slot>
		</div>
	</div>
</div>
