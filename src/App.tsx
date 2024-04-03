import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import Router from "./components/common/Router";
import GlobalStyle from "./styles/globalStyles";
import theme from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
