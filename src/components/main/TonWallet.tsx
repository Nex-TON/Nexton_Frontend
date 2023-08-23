import styled from "styled-components";
import useTonConnect from "./../../hooks/useTonConnect";
import IcWallet from "../../assets/icons/Landing/ic_wallet.svg";
import IcWalletDoubleArrow from "../../assets/icons/Landing/ic_walletDoubleArrow.svg";
import IcTonKeeper from "../../assets/icons/Landing/ic_tonKeeper.svg";

const TonWallet = () => {
  const { address, connected, tonConnectUI } = useTonConnect();

  return (
    <TonWalletWrapper>
      {connected ? (
        <TonWalletBox>
          <TonWalletLeftBox>
            <img src={IcWallet} alt="wallet" width={24} height={24} />
            {address.slice(0, 20)}
          </TonWalletLeftBox>
          <TonKeeperBox>
            <img src={IcTonKeeper} alt="tonKeeper" />
          </TonKeeperBox>
        </TonWalletBox>
      ) : (
        <ConnectBtn
          onClick={() => {
            tonConnectUI.connectWallet();
          }}
        >
          <ConnectBtnLeft>
            <img src={IcWallet} alt="wallet" width={24} height={24} />
            Connect Wallet
          </ConnectBtnLeft>
          <img
            src={IcWalletDoubleArrow}
            alt="walletDoubleArrow"
            width={22}
            height={22}
          />
        </ConnectBtn>
      )}
    </TonWalletWrapper>
  );
};

export default TonWallet;

const ConnectBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  padding: 1.8rem;

  border-radius: 1.4rem;
  background: linear-gradient(94deg, #6bd3ff 0%, #3461ff 100%);
  border: none;

  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);

  cursor: pointer;
`;

const ConnectBtnLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #fff;
`;

const TonWalletWrapper = styled.div`
  width: 100%;
  margin: 1.4rem 0 4.4rem 0;
`;

const TonWalletBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.3rem 1.3rem 1.3rem 1.9rem;

  border-radius: 1.4rem;
  background: #007aff;

  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);
`;

const TonWalletLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.fonts.Telegram_Medium_1};
  color: #fff;
`;

const TonKeeperBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.4rem;
  height: 3.4rem;

  border-radius: 50%;
  background-color: #46494a;
`;
