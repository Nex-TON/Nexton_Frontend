import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import useTonConnect from "@/hooks/contract/useTonConnect";
import useTomoWallet from "@/hooks/useTomo";

// 지갑 상태의 타입 정의
type WalletTypes = "Tomo" | "TonConnect";

interface WalletContextType {
  activeWalletType: WalletTypes | null;
  setActiveWalletType: React.Dispatch<React.SetStateAction<WalletTypes | null>>;
  getActiveWallet: () => ReturnType<typeof useTonConnect> | ReturnType<typeof useTomoWallet> | null;
  connect: (type: WalletTypes) => void;
}

// Context 생성
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWalletType, setActiveWalletType] = useState<WalletTypes | null>(null);

  const tonConnect = useTonConnect();
  const tomoWallet = useTomoWallet();

  useEffect(() => {
    if (!activeWalletType) {
      const savedWalletType = localStorage.getItem("walletType") as WalletTypes | null;
      if (savedWalletType) {
        if (isConnectionValid(savedWalletType)) setActiveWalletType(savedWalletType);
        else localStorage.clear();
      }
    }
  }, [activeWalletType]);

  // activeWalletType에 따라 해당 훅 반환
  const getActiveWallet = () => {
    if (activeWalletType === "TonConnect") return tonConnect;
    if (activeWalletType === "Tomo") return tomoWallet;
    return null;
  };

  const connect = (type: WalletTypes) => {
    if (type === "TonConnect") tonConnect.tonConnectUI.openModal();
    if (type === "Tomo") tomoWallet.openConnectModal();
    localStorage.setItem("walletType", type);
  };

  return (
    <WalletContext.Provider value={{ activeWalletType, setActiveWalletType, getActiveWallet, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

const isConnectionValid = (type: WalletTypes): boolean => {
  if (type === "Tomo") {
    if (!localStorage.getItem("tomo-tg-wallet-sdk-lastTime_")) return false;
    if (!localStorage.getItem("tomo-tg-wallet-sdk-account_")) return false;
    if (!localStorage.getItem("tomo-tg-wallet-sdk-accounts_")) return false;
    if (!localStorage.getItem("tomo-tg-wallet-sdk-connect_type_")) return false;
    return true;
  } else if (type === "TonConnect") {
    if (!localStorage.getItem("ton-connect-ui_last-selected-wallet-info")) return false;
    if (!localStorage.getItem("ton-connect-storage_http-bridge-gateway::https://bridge.tonapi.io/bridge")) return false;
    if (!localStorage.getItem("ton-connect-ui_wallet-info")) return false;
    if (!localStorage.getItem("ton-connect-ui_preferred-wallet")) return false;
    return true;
  }
  return false;
};

// Custom Hook
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const useWalletData = () => {
  const { getActiveWallet } = useWallet();
  const activeWallet = getActiveWallet();
  return {
    connected: activeWallet?.connected || false,
    address: activeWallet?.address || null,
    balance: activeWallet?.balance || 0,
    sender: activeWallet?.sender || null,
    refreshTonData: activeWallet?.refreshTonData,
  };
};
