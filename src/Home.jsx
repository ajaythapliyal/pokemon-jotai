import styled from "styled-components"
import { PokemonList } from "./Pokemon/PokemonList"
import { Search } from "./Search"

const HomeContainer = styled.div`
    margin-top : 1rem;
`

export const Home = ()=>{
    return (
    <HomeContainer>
        <Search></Search>
        <PokemonList></PokemonList>
    </HomeContainer>
    )
}