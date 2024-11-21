import styled from "styled-components";
import { mutate } from "swr";

import useTonConnect from "@/hooks/contract/useTonConnect";
import IcTon from "@/assets/icons/MyAsset/ic_tonSymbol.svg";
import { numberCutter } from "@/utils/numberCutter";
import { useEffect, useState } from "react";

export const TotalBalance = () => {
  const { address, balance, connected, refreshTonData } = useTonConnect();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      setIsRefreshing(true);
      try {
        await Promise.all([
          refreshTonData(),
          mutate(`/data/getAllStakeInfoByAddress?address=${address}`),
          mutate(`/data/getEarningsbyAddress/${address}`),
        ]);
      } catch (error) {
        console.error("An error occurred during the initial data load:", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    initializeData();
  }, [address, refreshTonData]);

  return (
    <TotalBalanceWrapper>
      <TotalBalanceHeader>Total Balance</TotalBalanceHeader>
      <TotalBalanceBoxWrapper>
        <img src={IcTon} alt="my asset page ton logo" />
        <TotalBalanceText>
          <SideText>Balance</SideText>
          <Balance>
            {isRefreshing ? (
              <Balance>-.---</Balance>
            ) : (
              <>
                <Balance>{balance === 0 || balance ? balance?.toFixed(3) : "0.000"}TON</Balance>
              </>
            )}
          </Balance>
        </TotalBalanceText>
      </TotalBalanceBoxWrapper>
    </TotalBalanceWrapper>
  );
};

const Balance = styled.div`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
`;

const SideText = styled.div`
  color: #c6caca;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const TotalBalanceText = styled.div`
  gap: 0.6rem;
  display: flex;
  flex-direction: column;
`;

const TotalBalanceBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.7rem;
  align-items: center;

  margin-bottom: 5.5rem;
  width: 100%;
  height: 8.5rem;
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
  border-radius: 15px;
  padding: 2rem;
  img {
    width: 43px;
    height: 43px;
  }
`;

const TotalBalanceHeader = styled.div`
  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
  margin-bottom: 1.5rem;
`;
const TotalBalanceWrapper = styled.div`
  display: felx;
  flex-direction: column;
`;
