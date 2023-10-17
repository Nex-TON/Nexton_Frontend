import { css, styled } from "styled-components";
import TonWallet from "./TonWallet";
import useTonConnect from "../../hooks/contract/useTonConnect";

const MainMyAssetInfo = () => {
  const { balance } = useTonConnect();

  return (
    <MainMyAssetInfoWraper>
      <MainMyAssetInfoInnerBox>
        <MainMyAssetInfoInnerTopBox>My Asset</MainMyAssetInfoInnerTopBox>
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
  padding: 2.3rem 2.1rem 2.7rem 2.3rem;

  border-radius: 3.2rem;
  background: linear-gradient(66deg, #2f3038 6.49%, #253a4e 91.79%);
`;

const MainMyAssetInfoInnerTopBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2.4rem;

  color: #c6c5d0;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
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

  padding: 0.6rem 1.8rem;

  border-radius: 4rem;
  border: 0.1rem solid #5d5e67;

  color: #c6c5d0;

  font-size: 1.1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.2rem;
`;

const MainMyAssetInfoInnerBottomValue = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_2};
`;
