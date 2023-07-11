export async function load({ params }) {
	const id = params.slug;
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokeman = await res.json();

	return { pokeman: pokeman };
}
