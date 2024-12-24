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

  // activeWalletType에 따라 해당 훅 반환
  const getActiveWallet = () => {
    if (activeWalletType === "TonConnect") return tonConnect;
    if (activeWalletType === "Tomo") return tomoWallet;
    return null;
  };

  const connect = (type: WalletTypes) => {
    if (type === "TonConnect") tonConnect.tonConnectUI.openModal();
    if (type === "Tomo") tomoWallet.openConnectModal();
  };

  return (
    <WalletContext.Provider value={{ activeWalletType, setActiveWalletType, getActiveWallet, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom Hook
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
