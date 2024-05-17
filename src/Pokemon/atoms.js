import {atom} from 'jotai'
import { fetchPokemons, fetchPokemonList } from './data';
import { delay } from '../util';

const LIMIT = 50;



const _pokemonAtom = atom([]);

export const isPokemonFetching = atom(false)

export const pokemonAtom = atom(
    (get)=> get(_pokemonAtom), 
    async (get, set, newVal) => {
        set(isPokemonFetching, true)
         await delay(1000)
        const cachedPokemons = get(_pokemonAtom)
        const pokemonList = await fetchPokemonList(LIMIT, cachedPokemons.length);
        const pokemons = await fetchPokemons(pokemonList.map(pokemon => pokemon.name))
        set(_pokemonAtom,[...cachedPokemons, ...pokemons] )
        set(isPokemonFetching, false)
    }
)
