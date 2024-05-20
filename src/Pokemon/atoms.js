import {atom} from 'jotai'
import { fetchPokemons, fetchPokemonList } from './data';
import { delay } from '../util';

const LIMIT = 50;

export const pokemonIdSetAtom = atom(async ()=>{
    const pokemonIds= await fetchPokemonList(10000, 0);
    const pokemonIdSet = new Set(pokemonIds.map(pokemonId => pokemonId.name.trim()))
    return pokemonIdSet;
})

export const filteredPokemonIdSetAtom = atom(async (get)=> {
    const pokemonIdSet = await get(pokemonIdSetAtom);
    const pokemonQuery = get(pokemonQueryAtom);
    return new Set([...pokemonIdSet].filter(pokemonId => pokemonId.toLowerCase().includes(pokemonQuery.toLowerCase())))
})

const _pokemonAtom = atom(new Map());

export const pokemonAtom = atom(
    (get)=> Array.from(get(_pokemonAtom).values()), 
    async (get, set, newVal) => {
        set(isPokemonFetching, true)
        await delay(500)
        const cachedPokemons = get(_pokemonAtom)
        const  {pokemonFetchId} = await get(isPokemonNextPageAvailableAtom)
        const pokemons = await fetchPokemons(pokemonFetchId)
        set(_pokemonAtom,new Map([...cachedPokemons, ...mapPokemon(pokemons)]))
        set(isPokemonFetching, false)
    }
)

export const _pokemonQueryAtom = atom('');

export const pokemonQueryAtom = atom((get)=> get(_pokemonQueryAtom), (get, set, newVal)=> {
    set(_pokemonQueryAtom, newVal);
    set(_pokemonAtom, new Map())
})

export const isPokemonFetching = atom(false)

export const isPokemonNextPageAvailableAtom = atom(async (get)=>{
    const cachedPokemons = get(_pokemonAtom)
    const pokemonIdSet = await get(filteredPokemonIdSetAtom)
    const cachedPokemonIds = cachedPokemons.keys()
    const pokemonFetchId = Array.from(pokemonIdSet.difference(new Set(cachedPokemonIds))).slice(0, LIMIT)
    return {pokemonFetchId, isNextPageAvailable :  !!pokemonFetchId.length}
})

const mapPokemon = (pokemons)=>{
    const pokemonMap =  new Map();
    pokemons.forEach(pokemon => pokemonMap.set(pokemon.name, pokemon))
    return pokemonMap
}
