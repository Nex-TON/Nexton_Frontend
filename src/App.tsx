import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import { ErrorModal } from "@/components/common/Modal/ErrorModal";
import Router from "@/components/common/Router";
import { network } from "@/hooks/contract/useTonClient";
import GlobalStyle from "@/styles/globalStyles";
import theme from "@/styles/theme";
import TagManager from "react-gtm-module";
import { TomoProvider, CONNECT_MAP, TomoWalletTgSdkV2 } from "@tomo-inc/tomo-telegram-sdk";
import "@tomo-inc/tomo-telegram-sdk/dist/styles.css";
// import { BASE_URL_DEV } from "@tomo-inc/tomo-telegram-sdk/example/baseUrlDev";
import { WalletProvider } from "./context/WalletConnectionProvider";

const tagManagerArgs = {
  gtmId: "GTM-N6BZZ8CX",
};
TagManager.initialize(tagManagerArgs);

console.log(`You're connected to the ${network} network!`);

const App = () => {
  new TomoWalletTgSdkV2();

  return (
    <TomoProvider
      theme="light"
      supportedProviders={["TON"]}
      supportedConnects={[CONNECT_MAP.TOMO_MINI_APP]}
      tomoOptions={{
        injected: false,
        metaData: {
          icon: "https://nextonserver.s3.eu-north-1.amazonaws.com/ic_nexton_logo.svg",
          name: "Nexton",
        },
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
