import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TagManager from "react-gtm-module"; 

import IcWalletConnect from "@/assets/icons/Landing/ic_wallet_connect.svg";
import IcWalletStake from "@/assets/icons/Landing/ic_wallet_stake.svg";
import useTonConnect from "@/hooks/contract/useTonConnect";

const MainButton = ({ style }: { style?: React.CSSProperties }) => {
  const { connected, tonConnectUI } = useTonConnect();
  const navigate = useNavigate();

  const handleSwitchWalletFunction = () => {
    if (connected) {
      navigate("/stake/amount");
    } else {
      const connectWalletTag={
        gtmId:'GTM-N6BZZ8CX',
        dataLayer:{
          event:"connect wallet",
          click_id:"connect wallet"
        },
      };
      TagManager.dataLayer(connectWalletTag);
      tonConnectUI.connectWallet();
    }
  };

  return (
    <TonWalletWrapper onClick={handleSwitchWalletFunction} style={style}>
      {connected ? (
        <TonConnectCenterBox>
          <img src={IcWalletStake} alt="stake" /> Let's stake TON
        </TonConnectCenterBox>
      ) : (
        <TonConnectCenterBox>
          <img src={IcWalletConnect} alt="connect" /> Connect wallet
        </TonConnectCenterBox>
      )}
    </TonWalletWrapper>
  );
};

export default MainButton;

const TonWalletWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;
  margin-bottom: 3.7rem;
  padding: 0.5rem 0;

  border-radius: 42px;
  background-color: #1f53ff;

  cursor: pointer;
`;

const TonConnectCenterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
`;
