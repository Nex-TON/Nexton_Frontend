import styled from "styled-components";
import { mutate } from "swr";
import { useMemo } from "react";

import useTonConnect from "@/hooks/contract/useTonConnect";
import useJettonWallet from "@/hooks/contract/useJettonWallet";
import IcTon from "@/assets/icons/MyAsset/ic_tonSymbol.svg";
import IcnxTon from "@/assets/icons/MyAsset/ic_nxTonSymbol.svg";
import { useEffect, useState } from "react";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";

export const TotalBalance = () => {
  const { address, balance, refreshTonData } = useTonConnect();
  const { balance: nxTonBalance, refreshData: refreshNxtonData } = useJettonWallet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { nftList, isLoading } = useStakeInfo(address);

  const totalStaked = useMemo(() => {
    return tokenSort => {
      return (
        nftList?.reduce((acc, nft) => {
          if (nft.tokenSort === `${tokenSort}`) {
            return acc + nft.principal;
          }
          return acc;
        }, 0) || 0
      );
    };
  }, [nftList]);

  const totalStakedNxTon = useMemo(() => {
    return nftList?.reduce((acc, nft) => acc + nft.principal, 0) || 0;
  }, [nftList]);

  useEffect(() => {
    const initializeData = async () => {
      setIsRefreshing(true);
      try {
        await Promise.all([
          refreshTonData(),
          refreshNxtonData(),
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
  }, [address, refreshTonData, refreshNxtonData]);

  return (
    <TotalBalanceWrapper id="specific-element-total-balance">
      <TotalBalanceHeader>My asset</TotalBalanceHeader>
      <TotalBalanceBoxWrapper>
        <TokenTitle>
          <img src={IcTon} alt="my asset page ton logo" />
          <h2>TON</h2>{" "}
        </TokenTitle>
        <ValueWrapper>
          <SideText>Balance</SideText>
          <Balance>
            {isRefreshing ? (
              <Balance>-.---</Balance>
            ) : (
              <>
                <Balance>
                  <p>{balance === 0 || balance ? balance?.toFixed(3) : "0.000"}</p>
                  <p>TON</p>
                </Balance>
              </>
            )}
          </Balance>
        </ValueWrapper>
        <DivideLine />
        <ValueWrapper>
          <SideText>Staked</SideText>
          <Balance>
            {isLoading ? (
              <Balance>-.---</Balance>
            ) : (
              <>
                <Balance>
                  <p>{totalStaked("TON") === 0 || totalStaked("TON") ? totalStaked("TON")?.toFixed(3) : "0.000"}</p>
                  <p>TON</p>
                </Balance>
              </>
            )}
          </Balance>
        </ValueWrapper>
      </TotalBalanceBoxWrapper>
      <TotalBalanceBoxWrapper>
        <TokenTitle>
          <img src={IcnxTon} alt="my asset page ton logo" />
          <h2>nxTON</h2>
        </TokenTitle>
        <ValueWrapper>
          <SideText>Balance</SideText>
          <Balance>
            {isRefreshing ? (
              <Balance>-.---</Balance>
            ) : (
              <>
                <Balance>
                  <p>
                    {Number(nxTonBalance) === 0 || Number(nxTonBalance) ? Number(nxTonBalance)?.toFixed(3) : "0.000"}
                  </p>
                  <p>nxTON</p>
                </Balance>
              </>
            )}
          </Balance>
        </ValueWrapper>
        <DivideLine />
        <ValueWrapper>
          <SideText>Staked</SideText>
          <Balance>
            <Balance>
              <p>{totalStaked("nxTON") === 0 || totalStaked("nxTON") ? totalStaked("nxTON")?.toFixed(3) : "0.000"}</p>
              <p>nxTON</p>
            </Balance>
          </Balance>
        </ValueWrapper>
      </TotalBalanceBoxWrapper>
    </TotalBalanceWrapper>
  );
};

const ValueWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const TokenTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.1rem;
  h2 {
    color: black;
    ${({ theme }) => theme.fonts.Telegram_Title_3_1}
  }
  img {
    width: 33px;
    height: 33px;
  }
  margin-bottom: 0.2rem;
`;

const DivideLine = styled.div`
  width: 100%;
  height: 1px;
  background: #e5e5ea;
`;

const Balance = styled.div`
  justify-content: row;
  display: flex;
  gap: 0.7rem;
  align-items: center;
  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
  }
`;

const SideText = styled.div`
  color: #c6caca;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const TotalBalanceBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin-bottom: 1rem;

  width: 100%;
  height: auto;
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
  border-radius: 15px;
  padding: 1.8rem 3.4rem 2.2rem 1.9rem;
`;

const TotalBalanceHeader = styled.div`
  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
  margin-bottom: 1.5rem;
`;
const TotalBalanceWrapper = styled.div`
  display: felx;
  flex-direction: column;
  margin-bottom: 3.2rem;
`;
