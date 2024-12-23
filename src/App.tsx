import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import { ErrorModal } from "@/components/common/Modal/ErrorModal";
import Router from "@/components/common/Router";
import { network } from "@/hooks/contract/useTonClient";
import GlobalStyle from "@/styles/globalStyles";
import theme from "@/styles/theme";
import TagManager from "react-gtm-module";
import { TomoProvider, CONNECT_MAP } from "@tomo-inc/tomo-telegram-sdk";
import "@tomo-inc/tomo-telegram-sdk/dist/styles.css";
import { BASE_URL_DEV } from "@tomo-inc/tomo-telegram-sdk/example/baseUrlDev";
import { WalletProvider } from "./context/WalletConnectionProvider";

const tagManagerArgs = {
  gtmId: "GTM-N6BZZ8CX",
};
TagManager.initialize(tagManagerArgs);

console.log(`You're connected to the ${network} network!`);

const App = () => {
  return (
    <TomoProvider
      theme="light"
      supportedProviders={["TON"]}
      supportedConnects={[CONNECT_MAP.TOMO_MINI_APP]}
      manifestUrl={"https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json"}
      tomoOptions={{
        injected: false,
        ...BASE_URL_DEV,
      }}
    >
      <WalletProvider>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <ErrorModal />
            <Analytics />
            <Router />
          </RecoilRoot>
        </ThemeProvider>
      </WalletProvider>
    </TomoProvider>
  );
};
export default App;
