import useTonConnect from "@/hooks/contract/useTonConnect";
import useTomoWallet from "@/hooks/useTomo";
import { useTomo } from "@tomo-inc/tomo-telegram-sdk";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

// 지갑 상태의 타입 정의
type WalletTypes = "Tomo" | "TonConnect";

interface Wallet {
  address: string;
  connected: boolean;
  balance: number;
  sender: {
    send: (args: any) => Promise<void>;
  };
  refresh: () => Promise<void>;
}

// Context에서 관리할 상태와 업데이트 함수 타입 정의
interface WalletContextType {
  address: string;
  connected: boolean;
  balance: number;
  sender: {
    send: (args: any) => Promise<void>;
  };
  refresh: () => Promise<void>;
  activeWalletType: WalletTypes | null;
  setActiveWalletType: React.Dispatch<React.SetStateAction<WalletTypes | null>>;
  connect: (walletType: WalletTypes) => void;
}

///TODO :
// 1. auto connect (set active wallet type)
//    when  first opened app.
// 2. _WalletAlreadyConnectedError
// 3. Uncaught TypeError: balance?.toFixed is not a function
//    at MainMyAssetInfo
// Context 생성
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWalletType, setActiveWalletType] = useState<WalletTypes | null>(null);
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null);

  const tonConnect = useTonConnect();
  const tomoWallet = useTomoWallet();

  // activeWalletType 변경에 따라 activeWallet 업데이트

  useEffect(() => {
    console.log(`activeWalletType : ${activeWalletType}, tomoWallet.connected: ${tomoWallet.connected}`);
    if (activeWalletType === "TonConnect") {
      if (!tonConnect.connected) {
        console.error("Tomo Ton provider is not set. Check connection");
        return;
      }
      setActiveWallet({
        address: tonConnect.address,
        connected: tonConnect.connected,
        balance: tonConnect.balance,
        sender: tonConnect.sender,
        refresh: tonConnect.refreshTonData,
      });
    } else if (activeWalletType === "Tomo") {
      if (!tomoWallet) {
        console.error("Tomo Ton provider is not set. Check connection");
        return;
      }
      setActiveWallet(tomoWallet);
    } else {
      setActiveWallet(null);
    }
  }, [activeWalletType, tomoWallet.connected, tonConnect.connected]);

  const disconnect = useCallback(() => {
    //disconnect
  }, [tonConnect, tomoWallet.address]);

  //TODO : connect function?

  const connect = (walletType: WalletTypes) => {
    if (walletType == "TonConnect") {
      tonConnect.tonConnectUI.connectWallet();
    } else if (walletType == "Tomo") {
      tomoWallet.openConnectModal();
    }
  };

  const value = {
    ...activeWallet,
    connected: activeWallet ? activeWallet.connected : false,
    activeWalletType,
    setActiveWalletType,
    connect,
    disconnect,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

// Custom Hook
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
