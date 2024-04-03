import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import IcWalletConnect from "../../assets/icons/Landing/ic_wallet_connect.svg";
import IcWalletDisconnect from "../../assets/icons/Landing/ic_wallet_disconnect.svg";

import useTonConnect from "./../../hooks/contract/useTonConnect";

const TonWallet = () => {
  const { connected, tonConnectUI } = useTonConnect();
  const navigate = useNavigate();

  const handleSwitchWalletFunction = () => {
    if (connected) {
      navigate("/stake/amount");
    } else {
      tonConnectUI.connectWallet();
    }
  };

  return (
    <TonWalletWrapper onClick={handleSwitchWalletFunction}>
      <TonConnectStatusBox>
        {connected ? (
          <img src={IcWalletConnect} alt="connect" />
        ) : (
          <img src={IcWalletDisconnect} alt="disconnect" />
        )}
      </TonConnectStatusBox>
      {connected ? (
        <TonConnectCenterBox>Let's stake TON</TonConnectCenterBox>
      ) : (
        <TonConnectCenterBox>Connect wallet</TonConnectCenterBox>
      )}
    </TonWalletWrapper>
  );
};

export default TonWallet;

const TonWalletWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;
  height: 6rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;

  border-radius: 2.4rem;
  background-color: #1f53ff;
  color: #f2f2f7;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium}

  filter: drop-shadow(0px 6px 10px rgba(94, 97, 98, 0.30));
  cursor: pointer;
`;

const TonConnectStatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;

  width: 5rem;
  height: 5rem;

  border-radius: 2rem;
  background-color: #fff;
`;

const TonConnectCenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: #f2f2f7;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;
