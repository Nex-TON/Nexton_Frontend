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
import { TomoWalletTgSdkV2 } from '@tomo-inc/tomo-telegram-sdk';

const tagManagerArgs = {
  gtmId: "GTM-N6BZZ8CX",
};
TagManager.initialize(tagManagerArgs);

new TomoWalletTgSdkV2();

console.log(`You're connected to the ${network} network!`);

const App = () => {
  return (
    <TomoProvider
      
      env="test"
      theme="light"
      supportedProviders={['TON']}
      supportedConnects={[CONNECT_MAP.TOMO_MINI_APP]}
      manifestUrl={"https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json"}
      tomoOptions={{
        connect:"TON",
        injected: true,
        metaData: {
          icon: "NEXTON",
          name: "NEXTON",
          url: location.origin + "/testing",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyle />
          <ErrorModal />
          <Analytics />
          <Router />
        </RecoilRoot>
      </ThemeProvider>
    </TomoProvider>
  );
};
export default App;
