import { useState } from "react";
import styled from "styled-components";
// import { MOCK_RANKING } from "@/constants/MOCK/MOCK_ranking";
import stonfi from "@/assets/icons/Dashboard/ic_stonfi_logo.svg";
import binance from "@/assets/icons/Dashboard/ic_binance_logo.svg";
import hyperliquid from "@/assets/icons/Dashboard/ic_hyperliquid_logo.svg";
import stonfi_box from "@/assets/icons/Dashboard/ic_stonfibox_logo.svg";
import IcTooltip from "@/assets/icons/Dashboard/ic_tooltip.svg";
import { limitDecimals } from "@/utils/limitDecimals";
import { useNavigate } from "react-router-dom";

const ICON = {
  stonfi,
  binance,
  hyperliquid,
};

const StrategyRanking = ({ option, handleOption, rankingList, rankingTotal }) => {
  //   mock
  // const rankingData = MOCK_RANKING;
  const navigate = useNavigate();

  return (
    <>
      <RankingWrapper>
        <RankingTab.wrapper>
          <RankingTab.button
            $option={option}
            $tabName="pnlRate"
            onClick={() => {
              handleOption("pnlRate");
            }}
          >
            Yield
          </RankingTab.button>
          <RankingTab.button
            $option={option}
            $tabName="transparency"
            onClick={() => {
              handleOption("transparency");
            }}
          >
            Transparency
          </RankingTab.button>
        </RankingTab.wrapper>
        <RankingContainer.status>
          Running bot <img src={IcTooltip} alt="dashboard tooltip" />
        </RankingContainer.status>
        <RankingContainer.wrapper $active>
          <RankingContainer.title $active>
            <p>No.</p>
            <p>Strategy</p>
            <p>APY</p>
            <p>TVL</p>
            <p>Detail</p>
          </RankingContainer.title>
          {rankingList?.map((item, idx) => {
            const strategy1 = item?.strategyDetails?.strategy1?.strategy;
            const strategy2 = item?.strategyDetails?.strategy2?.strategy;
            console.log("test", strategy1, strategy2);
            return (
              <>
                <RankingContainer.box $active>
                  <RankingContainer.text>{idx + 1}</RankingContainer.text>
                  <RankingContainer.strategy>
                    <img src={ICON[strategy1]} alt={strategy1} />
                    <img src={ICON[strategy2]} alt={ICON[strategy2]} />
                  </RankingContainer.strategy>
                  <RankingContainer.text>{item?.apy}%</RankingContainer.text>
                  <RankingContainer.text>{limitDecimals(item?.tvl, 0)}TON</RankingContainer.text>
                  <RankingContainer.button onClick={() => navigate(`/dashboard/detail/${item?.strategy}`)}>view</RankingContainer.button>
                </RankingContainer.box>
                {idx + 1 < rankingTotal && <DivideLine />}
              </>
            );
          })}
        </RankingContainer.wrapper>
        <RankingContainer.status>Upcoming bot</RankingContainer.status>
        <RankingContainer.wrapper>
          <RankingContainer.title>
            <p>No.</p>
            <p>Strategy</p>
            <p>APY</p>
            <p>TVL</p>
            <p>Detail</p>
          </RankingContainer.title>
          <RankingContainer.box>
            <RankingContainer.text>1</RankingContainer.text>
            <RankingContainer.strategy>
              <img src={stonfi_box} alt="stonfi box icon" />
              <img src={binance} alt="binance icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--.--%</RankingContainer.text>
            <RankingContainer.text>---TON</RankingContainer.text>
            <RankingContainer.text>-</RankingContainer.text>
          </RankingContainer.box>
          <DivideLine />
          <RankingContainer.box>
            <RankingContainer.text>2</RankingContainer.text>
            <RankingContainer.strategy>
              <img src={stonfi_box} alt="stonfi box icon" />
              <img src={hyperliquid} alt="hyperliquid icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--.--%</RankingContainer.text>
            <RankingContainer.text>---TON</RankingContainer.text>
            <RankingContainer.text>-</RankingContainer.text>
          </RankingContainer.box>
          <DivideLine/>
          <RankingContainer.box>
            <RankingContainer.text>3</RankingContainer.text>
            <RankingContainer.strategy>
              <img src={binance} alt="binance icon" />
              <img src={hyperliquid} alt="hyperliquid icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--.--%</RankingContainer.text>
            <RankingContainer.text>---TON</RankingContainer.text>
            <RankingContainer.text>-</RankingContainer.text>
          </RankingContainer.box>
        </RankingContainer.wrapper>
      </RankingWrapper>
    </>
  );
};
export default StrategyRanking;

const DivideLine = styled.div`
  width: 100%;
  height: 1px;
  background: #f1f4f4;
  margin: 14px 0;
`;

const RankingContainer = {
  button: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    color: #1f53ff;
    text-decoration: underline;
  `,
  text: styled.p`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: black;
  `,
  strategy: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
  `,
  box: styled.div<{ $active? }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${({ $active }) => ($active ? "0 20.5px" : "0 21px")};

    width: 100%;
    height: fit-content;
    background: transparent;
    border-radius: 1rem;
  `,
  wrapper: styled.div<{ $active? }>`
    width: 100%;
    gap: 1rem;
    background-color: ${({ $active }) => ($active ? "white" : "#EFEFEF")};
    border-radius: 1rem;
    margin-bottom: ${({ $active }) => ($active ? "1.4rem" : "4rem")};
    padding-bottom: ${({ $active }) => ($active ? "26.75px" : "27px")};
  `,
  status: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Dashboard_text_1};
    gap: 6px;
    color: #333;
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin-bottom: 1rem;
    img {
      width: 16px;
      height: 16px;
    }
  `,
  title: styled.div<{ $active? }>`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 10.5px;
    padding: ${({ $active }) => ($active ? "27.25px 19px 26.75px 19px" : "20px 20px 17px 20px")};
    border-bottom: ${({ $active }) => ($active ? "1px solid #F1F4F4" : "")};
    p {
      ${({ theme }) => theme.fonts.Nexton_Label_Small};
      color: #c6c5d0;
    }
  `,
};

const RankingTab = {
  button: styled.div<{ $option: string; $tabName: string }>`
    ${({ theme }) => theme.fonts.Nexton_Dashboard_text_0};
    color: ${({ $option, $tabName }) => ($option === $tabName ? "#1F53FF" : "#C1C1C1")};
    padding: 0.4rem 1rem;
    border-bottom: ${({ $option, $tabName }) => ($option === $tabName ? "1px solid #1F53FF" : "none")};
  `,
  wrapper: styled.div`
    width: 100%;
    gap: 4px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin-bottom: 1.6rem;
  `,
};
const RankingWrapper = styled.div`
  width: 100%;
  margin-top: 2.4rem;
`;
