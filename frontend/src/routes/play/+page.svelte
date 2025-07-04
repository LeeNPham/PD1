<script>
	let count = 0;
</script>

<div class="flex flex-col items-center justify-center text-3xl font-extrabold w-full h-full gap-8">
	<div>Pokéball Clicker!</div>
	<button
		class="bg-red-500 hover:bg-red-700 text-white rounded-full w-32 h-32 flex items-center justify-center shadow-lg text-5xl"
		on:click={() => count++}
	>
		🎮
	</button>
	<div class="text-xl font-bold">Score: {count}</div>
	<p class="text-base font-normal text-gray-600">Click the Pokéball as many times as you can!</p>
</div>
