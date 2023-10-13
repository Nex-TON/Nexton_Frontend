import styled from "styled-components";
import useTonConnect from "./../../hooks/contract/useTonConnect";
import { useNavigate } from "react-router-dom";
import IcDoubleArrow from "../../assets/icons/Landing/ic_walletDoubleArrow.svg";
import IcWalletConnect from "../../assets/icons/Landing/ic_wallet_connect.svg";
import IcWalletDisconnect from "../../assets/icons/Landing/ic_wallet_disconnect.svg";

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
        `Let's stake TON`
      ) : (
        <TonConnectCenterBox>
          <span>Connect wallet</span>
          <span>To simply stake</span>
        </TonConnectCenterBox>
      )}
      <img src={IcDoubleArrow} alt="doubleArrow" width={24} height={24} />
    </TonWalletWrapper>
  );
};

export default TonWallet;

const TonWalletWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 1.8rem 0.5rem 0.5rem;

  border-radius: 4rem;
  background-color: #007aff;
  color: #f2f2f7;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium}
`;

const TonConnectStatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 5rem;

  border-radius: 50%;
  background-color: #fff;
`;

const TonConnectCenterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 74%;

  span {
    color: #f2f2f7;
    &:first-child {
      ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
    }

    &:last-child {
      ${({ theme }) => theme.fonts.Nexton_Label_Small};
    }
  }
`;
