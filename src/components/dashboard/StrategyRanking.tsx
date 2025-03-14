import { useState } from "react";
import styled from "styled-components";
import { MOCK_RANKING } from "@/constants/MOCK/MOCK_ranking";
import stonfi from "@/assets/icons/Dashboard/ic_stonfi_logo.svg";
import binance from "@/assets/icons/Dashboard/ic_binance_logo.svg";
import hyperliquid from "@/assets/icons/Dashboard/ic_hyperliquid_logo.svg";
import stonfi_box from "@/assets/icons/Dashboard/ic_stonfibox_logo.svg";

const ICON = {
  stonfi,
  binance,
  hyperliquid,
};

const StrategyRanking = () => {
  const [option, setOption] = useState("Yield");
  //   mock
  const rankingData = MOCK_RANKING;

  return (
    <>
      <RankingWrapper>
        <RankingTab.wrapper>
          <RankingTab.button
            $option={option}
            $tabName="Yield"
            onClick={() => {
              setOption("Yield");
            }}
          >
            Yield
          </RankingTab.button>
          <RankingTab.button
            $option={option}
            $tabName="Transparency"
            onClick={() => {
              setOption("Transparency");
            }}
          >
            Transparency
          </RankingTab.button>
        </RankingTab.wrapper>
        <RankingContainer.title>
          <p>No.</p>
          <p>Strategy</p>
          <p>APY</p>
          <p>TVL</p>
          <p>Detail</p>
        </RankingContainer.title>
        <RankingContainer.status $active>Running bot</RankingContainer.status>
        <RankingContainer.wrapper $active>
          {rankingData?.rankingList?.map((item, idx) => {
            const strategy1 = item?.strategy1?.[1];
            const strategy2 = item?.strategy2?.[1];
            console.log("test", strategy1, strategy2);
            return (
              <RankingContainer.box $active>
                <RankingContainer.text>{idx + 1}</RankingContainer.text>
                <RankingContainer.strategy>
                  <img src={ICON[strategy1]} alt={strategy1} />
                  <img src={ICON[strategy2]} alt={ICON[strategy2]} />
                </RankingContainer.strategy>
                <RankingContainer.text>{item?.apy}%</RankingContainer.text>
                <RankingContainer.text>{item?.tvl}TON</RankingContainer.text>
                <RankingContainer.button>view</RankingContainer.button>
              </RankingContainer.box>
            );
          })}
        </RankingContainer.wrapper>
        <RankingContainer.status>Upcoming bot</RankingContainer.status>
        <RankingContainer.wrapper>
            <RankingContainer.box>
                <RankingContainer.strategy>
                    <img src={stonfi_box} alt="stonfi box icon"/>
                    <img src={binance} alt="binance icon"/>
                </RankingContainer.strategy>
                <RankingContainer.text>
                    --.--%
                </RankingContainer.text>
                <RankingContainer.text>
                    ---TON
                </RankingContainer.text>
                <RankingContainer.text>
                    -
                </RankingContainer.text>
            </RankingContainer.box>
            <RankingContainer.box>
                <RankingContainer.strategy>
                    <img src={stonfi_box} alt="stonfi box icon"/>
                    <img src={hyperliquid} alt="hyperliquid icon"/>
                </RankingContainer.strategy>
                <RankingContainer.text>
                    --.--%
                </RankingContainer.text>
                <RankingContainer.text>
                    ---TON
                </RankingContainer.text>
                <RankingContainer.text>
                    -
                </RankingContainer.text>
            </RankingContainer.box>
        </RankingContainer.wrapper>
      </RankingWrapper>
    </>
  );
};
export default StrategyRanking;

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
    justify-content: ${({$active})=>$active?"space-between":"space-evenly"};
    align-items: center;

    width: 100%;
    height: fit-content;
    padding: 1.9rem 1.65rem 1.9rem 1.2rem;
    background: ${({ $active }) => ($active ? "#FFF" : "#EFEFEF")};
    border-radius: 1rem;
    margin-bottom: 1rem;
  `,
  wrapper: styled.div<{ $active? }>`
    width: 100%;
    gap: 1rem;
    margin-bottom: ${({ $active }) => ($active ? "1.4rem" : "4rem")};
  `,
  status: styled.div<{ $active? }>`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
    display: flex;
    padding: 4px 18px;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    color: ${({ $active }) => ($active ? "#FFFFFF" : "#2C3542")};
    background: ${({ $active }) => ($active ? "#1F53FF" : "#E1E4E6")};
    margin-bottom: 1rem;
  `,
  title: styled.div`
    width: 100%;
    padding: 4px 10px 4px 8px;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 10.5px;
    p {
      ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2}
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
