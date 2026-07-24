const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao buscar os dados da API");
  }

  return response.json();
}

function formatPokemon(detalhes) {
  return {
    id: detalhes.id,
    name: detalhes.name,
    image:
      detalhes.sprites?.other?.["official-artwork"]?.front_default ||
      detalhes.sprites?.front_default ||
      null,
    type: detalhes.types?.[0]?.type?.name || "desconhecido",
  };
}

export async function getPokemons(limit = 151) {
  const data = await fetchJson(`${BASE_URL}?limit=${limit}`);
  const pokemonsComDetalhes = await Promise.all(
    data.results.map(({ url }) => fetchJson(url)),
  );

  return pokemonsComDetalhes.map(formatPokemon);
}
