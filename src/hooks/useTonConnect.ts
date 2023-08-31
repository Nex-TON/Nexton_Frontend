import {
  toUserFriendlyAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { useState, useEffect } from "react";
import { useTonClient } from "./useTonClient";

export default function useTonConnect() {
  const client = useTonClient();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  const getAddress = () => {
    if (wallet?.account.address) {
      const raw = wallet.account.address;
      const realAddress = toUserFriendlyAddress(raw, true);
      setAddress(realAddress);
    }
  };

  const getBalance = async () => {
    if (client && wallet?.account.address) {
      const newBalance = await client.getBalance(
        Address.parse(wallet.account.address)
      );
      const calcBalance = (
        (parseInt(newBalance.toString()) / 10 ** 9) *
        1.0
      ).toString();
      setBalance(parseFloat(calcBalance));
    }
  };

  useEffect(() => {
    getAddress();
    getBalance();
  }, [client, wallet]);

  return {
    tonConnectUI,
    wallet,
    sender: {
      send: async (args: any) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: wallet?.account.address ? true : false,
    address: address,
    pureAddress: wallet?.account.address,
    network: wallet?.account.chain,
    balance,
  };
}
