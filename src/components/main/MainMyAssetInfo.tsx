import { css, styled } from "styled-components";
import IcWallet from "../../assets/icons/Landing/ic_wallet.svg";
import TonWallet from "./TonWallet";
import useTonConnect from "../../hooks/contract/useTonConnect";
import Modal from "./Modal/Modal";
import { useState } from "react";

const MainMyAssetInfo = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { connected, balance } = useTonConnect();

  const handleModalState = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      {isOpenModal && <Modal handleModalState={handleModalState} />}
      <MainMyAssetInfoWraper>
        <MainMyAssetInfoInnerBox>
          <MainMyAssetInfoInnerTopBox>
            My Asset.
            <MainMyAssetInfoInnerTopWalletBox
              disabled={!connected}
              connected={connected}
              onClick={handleModalState}
            >
              <img src={IcWallet} alt="wallet" width={16} height={16} />
            </MainMyAssetInfoInnerTopWalletBox>
          </MainMyAssetInfoInnerTopBox>
          <MainMyAssetInfoInnerBottomBox>
            <MainMyAssetInfoInnerBottomTitleBox>
              Balance
            </MainMyAssetInfoInnerBottomTitleBox>
            <MainMyAssetInfoInnerBottomValue>
              {balance.toFixed(2)} TON
            </MainMyAssetInfoInnerBottomValue>
          </MainMyAssetInfoInnerBottomBox>
          <MainMyAssetInfoInnerBottomBox>
            <MainMyAssetInfoInnerBottomTitleBox>
              Staked
            </MainMyAssetInfoInnerBottomTitleBox>
            <MainMyAssetInfoInnerBottomValue>
              0.00 TON
            </MainMyAssetInfoInnerBottomValue>
          </MainMyAssetInfoInnerBottomBox>
        </MainMyAssetInfoInnerBox>
        <TonWallet />
      </MainMyAssetInfoWraper>
    </>
  );
};

export default MainMyAssetInfo;

const MainMyAssetInfoWraper = styled.div`
  width: 100%;
  padding: 0 0.6rem 1rem 0.6rem;

  background-color: #fff;
`;

const MainMyAssetInfoInnerBox = styled.div`
  width: 100%;
  padding: 3.3rem 2.5rem;

  border-radius: 3.2rem;
  background: linear-gradient(66deg, #2f3038 6.49%, #253a4e 91.79%);
`;

const MainMyAssetInfoInnerTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 4.6rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;

const MainMyAssetInfoInnerTopWalletBox = styled.button<{ connected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.2rem;
  height: 4.2rem;

  border: none;
  border-radius: 50%;

  ${({ connected }) =>
    connected
      ? css`
          background: linear-gradient(134deg, #6bd3ff 7.39%, #3461ff 97.6%);
        `
      : css`
          background: linear-gradient(
            270deg,
            #002639 0%,
            #001b29 28.13%,
            #000 100%
          );
        `}
  box-shadow: 0px 0px 24px 0px rgba(198, 202, 202, 0.08);

  cursor: pointer;
`;

const MainMyAssetInfoInnerBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 2rem;
  }
`;

const MainMyAssetInfoInnerBottomTitleBox = styled.div`
  display: flex;
  align-items: center;

  padding: 0.8rem 1.6rem;

  border-radius: 4rem;
  border: 0.1rem solid #5d5e67;

  color: #f2f2f7;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

const MainMyAssetInfoInnerBottomValue = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_2};
`;
