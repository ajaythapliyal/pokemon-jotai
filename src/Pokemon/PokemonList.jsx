import { useAtom, useAtomValue } from "jotai"
import { Pokemon } from "./Pokemon";
import {  Suspense, useEffect } from "react";
import {  isPokemonFetching, pokemonAtom } from "./atoms";
import styled from "styled-components";
import { Hourglass } from "react95";
import { Loading } from "../Loading";

const Grid = styled.div`
    display : grid;
    grid-template-columns : repeat(auto-fill, minmax(250px,1fr));
`

export const PokemonList = ()=>{
    const [pokemons, fetchPokemons] = useAtom(pokemonAtom);
    const isPokemonFetchingStatus = useAtomValue(isPokemonFetching)

    useEffect(()=>{
        fetchPokemons()
    }, [])

    if(isPokemonFetchingStatus){
        return <Loading/>
    }

    return (
    <Grid>
    {pokemons.map(pokemon => {
        return <Pokemon key={pokemon.name} name={pokemon.name} url={pokemon.url}></Pokemon>
    })}
    </Grid>
    )
}