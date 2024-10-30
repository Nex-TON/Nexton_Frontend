import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import { ErrorModal } from "@/components/common/Modal/ErrorModal";
import Router from "@/components/common/Router";
import { network } from "@/hooks/contract/useTonClient";
import GlobalStyle from "@/styles/globalStyles";
import theme from "@/styles/theme";
import TagManager from 'react-gtm-module';

const tagManagerArgs={
  gtmId:'GTM-N6BZZ8CX'
}
TagManager.initialize(tagManagerArgs);

console.log(`You're connected to the ${network} network!`);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GlobalStyle />
        <ErrorModal />
        <Analytics />

        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
