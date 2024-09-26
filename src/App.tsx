import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import { ErrorModal } from "@/components/common/Modal/ErrorModal";
import Router from "@/components/common/Router";
import { network } from "@/hooks/contract/useTonClient";
import GlobalStyle from "@/styles/globalStyles";
import theme from "@/styles/theme";

console.log(`You're connected to the ${network} network!`);

const tele = (window as any).Telegram.WebApp;

if (tele) {
  tele.ready();
  tele.enableClosingConfirmation();
}

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
