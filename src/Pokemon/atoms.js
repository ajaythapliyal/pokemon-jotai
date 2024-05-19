import {atom} from 'jotai'
import { fetchPokemons, fetchPokemonList } from './data';
import { delay } from '../util';

const LIMIT = 50;

export const pokemonIdSetAtom = atom(async ()=>{
    const pokemonIds= await fetchPokemonList(10000, 0);
    const pokemonIdSet = new Set(pokemonIds.map(pokemonId => pokemonId.name.trim()))
    return pokemonIdSet;
})

const _pokemonAtom = atom(new Map());

export const isPokemonFetching = atom(false)

export const pokemonAtom = atom(
    (get)=> Array.from(get(_pokemonAtom).values()), 
    async (get, set, newVal) => {
        set(isPokemonFetching, true)
        await delay(500)
        const cachedPokemons = get(_pokemonAtom)
        const pokemonIdSet = await get(pokemonIdSetAtom)
        const cachedPokemonIds = cachedPokemons.keys()
        const pokemonFetchId = Array.from(pokemonIdSet.difference(new Set(cachedPokemonIds))).slice(0, LIMIT)
        const pokemons = await fetchPokemons(pokemonFetchId)
        set(_pokemonAtom,new Map([...cachedPokemons, ...mapPokemon(pokemons)]))
        set(isPokemonFetching, false)
    }
)

const mapPokemon = (pokemons)=>{
    const pokemonMap =  new Map();
    pokemons.forEach(pokemon => pokemonMap.set(pokemon.name, pokemon))
    return pokemonMap
}
