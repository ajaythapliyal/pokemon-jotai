import { Frame } from "react95";
import styled from "styled-components";

const Image = styled.img`
    width : 200px;
    height : 200px;
`
const FrameContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center
`

const SpacedFrame = styled(Frame)`
    padding : 1rem;
    margin : 1rem
`

export const Pokemon = ({name, url})=> 
<SpacedFrame>
    <FrameContainer>
    <p>{name}</p>
    <Image src={url}></Image>
    </FrameContainer>
</SpacedFrame>