import { AppBar, Toolbar,styleReset } from 'react95';
import styled, { createGlobalStyle,  ThemeProvider } from 'styled-components';


import original from 'react95/dist/themes/original';

import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { Outlet } from 'react-router';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const Title = styled.span`
  margin-inline : 0.5rem;
  margin-block : 0.2rem
`

const Main = styled.main`
  background: ${({ theme }) => theme.desktopBackground};
  min-height : 100vh;
`

const PlaceHolder = styled.div`
  height : 43px
`

function App() {
  return (
    <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <div>
      <AppBar>
        <Toolbar>
          <Title>Poke</Title>
        </Toolbar>
      </AppBar>
      <Main>
        <PlaceHolder></PlaceHolder>
        <Outlet></Outlet>
      </Main>
      </div>
    </ThemeProvider>
  </div>
  )
}

export default App
