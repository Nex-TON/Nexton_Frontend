import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { styled } from "styled-components";
import { mutate } from "swr";

import IcRefresh from "@/assets/icons/MyAsset/ic_refresh.svg";

import TonWallet from "./TonWallet";

const Loader = () => {
  return (
    <TailSpin
      visible={true}
      height="30"
      width="30"
      color="#007aff"
      ariaLabel="tail-spin-loading"
      radius="4"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

const MainMyAssetInfo = ({
  address,
  balance,
  refreshTonData,
  totalStaked,
  isLoading,
  isError,
}: {
  address: string;
  balance: number;
  refreshTonData: () => Promise<void>;
  totalStaked: number;
  isLoading: boolean;
  isError: boolean;
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await Promise.all([refreshTonData(), mutate(`/data/getAllStakeInfoByAddress?address=${address}`)]);
    } catch (error) {
      console.error("An error occurred during the refresh operation:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <MainMyAssetInfoWrapper>
      <MainMyAssetInfoInnerBox>
        <MainMyAssetInfoInnerTopBox>
          My Asset
          <MainMyAssetInfoInnerTopBoxIcon>
            {address && <img src={IcRefresh} alt="icon_refresh" onClick={handleRefresh} />}
          </MainMyAssetInfoInnerTopBoxIcon>
        </MainMyAssetInfoInnerTopBox>
        <MainMyAssetInfoInnerBottomBox>
          <MainMyAssetInfoInnerBottomTitleBox>Balance</MainMyAssetInfoInnerBottomTitleBox>
          <MainMyAssetInfoInnerBottomValue>
            {isRefreshing ? <Loader /> : `${balance ? balance.toFixed(2) : "-.--"} TON`}
          </MainMyAssetInfoInnerBottomValue>
        </MainMyAssetInfoInnerBottomBox>
        <MainMyAssetInfoInnerBottomBox>
          <MainMyAssetInfoInnerBottomTitleBox>Staked</MainMyAssetInfoInnerBottomTitleBox>
          <MainMyAssetInfoInnerBottomValue>
            {isError ? "-.--" : isLoading || isRefreshing ? <Loader /> : `${totalStaked.toFixed(2)} TON`}
          </MainMyAssetInfoInnerBottomValue>
        </MainMyAssetInfoInnerBottomBox>
      </MainMyAssetInfoInnerBox>
      <TonWallet />
    </MainMyAssetInfoWrapper>
  );
};

export default MainMyAssetInfo;

const MainMyAssetInfoWrapper = styled.div`
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2.4rem;

  color: #c6c5d0;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const MainMyAssetInfoInnerTopBoxIcon = styled.div<{ $isRefreshing?: boolean }>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
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
  width: 77px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.8rem 1.6rem;

  border-radius: 4rem;
  border: 0.1rem solid #5d5e67;

  color: #c6c5d0;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

const MainMyAssetInfoInnerBottomValue = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_2};
`;
