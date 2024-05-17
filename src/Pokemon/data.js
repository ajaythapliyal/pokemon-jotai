import { chunk } from "lodash-es"

const BASE_URL = "https://pokeapi.co/api/v2"


export const  fetchPokemonList = async (limit = 50, offset = 0)=> {
    const URl = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    const response = await fetch(URl)
    const pokemons = await response.json()
    return pokemons.results;
}

export const fetchPokemons = async (pokemonIds=[]) => {
    const MAX_CONCURRENT_REQUEST = 5
    const chunkedPokemonIds = chunk(pokemonIds,MAX_CONCURRENT_REQUEST);
    const pokemons = []
    for (const singleChunkPokemonIds of chunkedPokemonIds) {
        const pokemonsResponse = await Promise.allSettled(singleChunkPokemonIds.map(id => fetch(`${BASE_URL}/pokemon/${id}`)));
        const parsedPokemonsResponse = await Promise.allSettled(pokemonsResponse.map(pokemonResponse =>  pokemonResponse.value.json()))
        parsedPokemonsResponse.forEach(parsedPokemon => {
            pokemons.push({
                name : parsedPokemon.value.name,
                url : parsedPokemon.value.sprites.other["official-artwork"].front_default
            })
        })
    }
    return pokemons;
}