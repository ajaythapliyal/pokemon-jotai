import { useAtom, useAtomValue } from "jotai"
import { Pokemon } from "./Pokemon";
import {  useCallback, useEffect, forwardRef } from "react";
import {   isPokemonNextPageAvailableAtom, pokemonAtom } from "./atoms";
import styled from "styled-components";
import { Loading } from "../Loading";
import { VirtuosoGrid } from "react-virtuoso";

const LoaderContainer = styled.div`
  display : flex;
  justify-content : center;
  width : 100%;
  padding-block : 2rem;
  position : relative;
  background-color : ${props => props.theme.desktopBackground}
`

const ListContent = styled.div`
  display : grid;
  grid-template-columns : repeat(auto-fill, minmax(250px,1fr));
  justify-items : center;
  margin-inline : 1rem;
`

const gridComponents = (loader)=> ({
    List: forwardRef(({ style, children, ...props }, ref) => (
      <ListContent
        ref={ref}
        {...props}
        style={{...style}}
      >
        {children}
      </ListContent>
    )),
    Item: ({ children, ...props }) => <div{...props}>{children}</div>,
    Footer : ()=> loader
  });

export const PokemonList = ()=>{
    const [pokemons, fetchPokemons] = useAtom(pokemonAtom);
    const {isNextPageAvailable} = useAtomValue(isPokemonNextPageAvailableAtom)

    useEffect(()=>{
      if(!pokemons.length){
        fetchPokemons()
      }
    }, [pokemons.length])

    const endReached = useCallback(()=>{
        if(isNextPageAvailable){
          fetchPokemons();
        }
    }, [isNextPageAvailable])

    const loader = isNextPageAvailable ? <LoaderContainer><Loading></Loading></LoaderContainer> : null

    if(pokemons.length === 0){
      return <Loading/>
    }

    return <VirtuosoGrid
        overscan={5}
        useWindowScroll
        endReached={endReached}
        data={pokemons}
        components={gridComponents(loader)}
        itemContent={(index, pokemon)=> <Pokemon name={pokemon.name} url={pokemon.url}></Pokemon>}
    ></VirtuosoGrid>
}