import { Hourglass } from "react95"
import styled from "styled-components"

const CenterHourGlass = styled(Hourglass)`
    position : absolute;
    left : 50%;
    top : 50%
`

export const Loading = ()=>{
    return <CenterHourGlass/>
}