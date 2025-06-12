import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mutate } from "swr";

import arrow from "@/assets/icons/MyAsset/ic_arrow_Icon.png";
import IcnxTon from "@/assets/icons/MyAsset/ic_nxTonSymbol.svg";
import IcTon from "@/assets/icons/MyAsset/ic_tonSymbol.svg";
import nxtIcon from "@/assets/icons/Stake/Staking_nxTON.png";
import IcUSDT from "@/assets/icons/Stake/Staking_USDT.png";
import IcBmTon from "@/assets/icons/Stake/Staking_BmTON2.svg";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useJettonWallet from "@/hooks/contract/useJettonWallet";
import useTonConnect from "@/hooks/contract/useTonConnect";

export const TotalBalance = () => {

  const { address, balance } = useTonConnect();
  const { balance: nxTonBalance } = useJettonWallet();
  const { balance: oldNxTonBalance } = useJettonWallet("oldNxTON");
  const { balance: usdtBalance } = useJettonWallet("USDT");
  const { balance: bmTonBalance } = useJettonWallet("bmTON");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const { nftList, isLoading } = useStakeInfo(address);
  const { borrowList } = useRepayNftList(address);
  const navigate = useNavigate();

  //console.log("nftList",nftList);
  //nft list 에서 TON, NxTON staked된거 총량 가져옴
  const totalStaked = useMemo(() => {
    return tokenSort => {
      const nftTotal =
        nftList?.reduce((acc, nft) => {
          if (nft.tokenSort === `${tokenSort}`) {
            return acc + nft.principal;
          }
          return acc;
        }, 0) || 0;
      // const borrowTotal =
      //   borrowList?.reduce((acc, borrow) => {
      //     if (borrow.tokenSort === `${tokenSort}` && borrow.status === 0) {
      //       return acc + borrow.principal / borrow.loanToValue;
      //     }
      //     return acc;
      //   }, 0) || 0;
      // return nftTotal + borrowTotal;
      return nftTotal;
    };
  }, [nftList]);

  useEffect(() => {
    const initializeData = async () => {
      setIsRefreshing(true);
      try {
        await Promise.all([
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
  }, [address]);


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
          <img src={IcUSDT} alt="new usdt logo" />
          <h2>USDT (Tether)</h2>{" "}
        </TokenTitle>
        <ValueWrapper>
          <SideText>Balance</SideText>
          <Balance>
            {isRefreshing ? (
              <Balance>-.---</Balance>
            ) : (
              <>
                <Balance>
                  <p>{Number(usdtBalance) === 0 || Number(usdtBalance) ? Number(usdtBalance)?.toFixed(3) : "0.000"} </p>
                  <p>USDT</p>
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
                  <p>{totalStaked("USDT") === 0 || totalStaked("USDT") ? totalStaked("USDT")?.toFixed(3) : "0.000"}</p>
                  <p>USDT</p>
                </Balance>
              </>
            )}
          </Balance>
        </ValueWrapper>
      </TotalBalanceBoxWrapper>
      {/* bmTON */}
      <TotalBalanceBoxWrapper>
        <TokenTitle>
          <img src={IcBmTon} alt="new bmTON logo" />
          <h2>bmTON</h2>{" "}
        </TokenTitle>
        <ValueWrapper>
          <SideText>Balance</SideText>
          <Balance>
            {isRefreshing ? (
              <Balance>-.---</Balance>
            ) : (
              <>
                <Balance>
                  <p>{Number(bmTonBalance) === 0 || Number(bmTonBalance) ? Number(bmTonBalance)?.toFixed(3) : "0.000"} </p>
                  <p>bmTON</p>
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
                  <p>{totalStaked("bmTON") === 0 || totalStaked("bmTON") ? totalStaked("bmTON")?.toFixed(3) : "0.000"}</p>
                  <p>bmTON</p>
                </Balance>
              </>
            )}
          </Balance>
        </ValueWrapper>
      </TotalBalanceBoxWrapper>
      <TotalBalanceBoxWrapper>
        <TokenTitle>
          <img src={nxtIcon} alt="new nxton icon"></img>
          <h2>NxTON</h2>
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
                    {Number(nxTonBalance) === 0 || Number(nxTonBalance) ? Number(nxTonBalance)?.toFixed(3) : "0.000"}{" "}
                  </p>
                  <p>NxTON</p>
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
              <p>NxTON</p>
            </Balance>
          </Balance>
        </ValueWrapper>
        <DivideLine />
        <ValueWrapper>
          <SideText>
            <img src={IcnxTon} alt="my asset page ton logo" />
            Former NxTON
          </SideText>
          <Balance>
            <Balance>
              <p>
                {Number(oldNxTonBalance) === 0 || Number(oldNxTonBalance)
                  ? Number(oldNxTonBalance)?.toFixed(3)
                  : "0.000"}
              </p>
              <p>NxTON</p>
            </Balance>
          </Balance>
        </ValueWrapper>
        <GoExchange>
          <div onClick={() => navigate("/exchange")}>
            <p>Go to Exchange</p>
            <img src={arrow}></img>
          </div>
        </GoExchange>
      </TotalBalanceBoxWrapper>
    </TotalBalanceWrapper>
  );
};

const GoExchange = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;

  p {
    color: #1f53ff;
    line-height: 1.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }

  img {
    width: 1rem;
    height: 1rem;
  }

  div {
    display: flex;
    cursor: pointer;
    align-items: center;
  }
`;

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
  display: flex;
  gap: 0.3rem;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
  }
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
