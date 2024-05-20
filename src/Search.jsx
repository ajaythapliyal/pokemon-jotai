import { useAtom, useSetAtom } from "jotai";
import { TextInput } from "react95";
import styled from "styled-components";
import { pokemonQueryAtom } from "./Pokemon/atoms";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash-es";

const TextInputContainer = styled.div`
    display : flex;
    justify-content : center
`

const SearchInput = styled(TextInput)`
    width : 500px
`

export const Search = ()=>{
    const [query, setSeachQuery] = useState('')
    const  setQuery = useSetAtom(pokemonQueryAtom);

    const handleQueryChange = useCallback(debounce((cb)=>{
        cb()
    }, 1000), [])

    useEffect(()=>{
        handleQueryChange(()=>{
            setQuery(query)
        } )
    }, [query])


    return <TextInputContainer>
            <SearchInput  placeholder="Pikachu" onChange={(e)=>setSeachQuery(e.target.value)} value={query}></SearchInput>
        </TextInputContainer>
    
 }