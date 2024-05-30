import React from "react";
import ReactDOM from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import App from "./App.tsx";

const manifestUrl = "https://nextonserver.s3.eu-north-1.amazonaws.com/config.json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TonConnectUIProvider
    manifestUrl={manifestUrl}
    actionsConfiguration={{
      twaReturnUrl: "https://t.me/Nexton_tele_bot",
    }}
  >
    <App />
  </TonConnectUIProvider>,
);
