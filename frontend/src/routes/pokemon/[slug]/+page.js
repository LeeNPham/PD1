// /** @type {import('./$types').PageLoad} */
// export async function load({ fetch, params }) {
// 	const id = params.slug;
// 	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
// 	const res = await fetch(url);
// 	const pokeman = await res.json();

// 	const genusUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
// 	const gRes = await fetch(genusUrl);
// 	const pokemanGenus = await gRes.json();

// 	return {
// 		pokeman,
// 		pokemanGenus
// 	};
// }
