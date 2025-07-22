import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { MOCK_RANKING } from "@/constants/MOCK/MOCK_ranking";
import stonfi from "@/assets/icons/Dashboard/ic_stonfi_logo.svg";
import binance from "@/assets/icons/Dashboard/ic_binance_logo.svg";
import hyperliquid from "@/assets/icons/Dashboard/ic_hyperliquid_logo.svg";
import dedust from "@/assets/icons/Dashboard/ic_dedust_logo.svg";
import IcTooltip from "@/assets/icons/Dashboard/ic_tooltip.svg";
import { limitDecimals } from "@/utils/limitDecimals";
import { useNavigate } from "react-router-dom";
import DashboaardRunningBotTooltip from "./DahsboardRunningBotTooltip";

const ICON = {
  stonfi,
  binance,
  hyperliquid,
  dedust,
};

const StrategyRanking = ({ option, handleOption, rankingList, rankingTotal, isLoading, sort }) => {
  //   mock
  // const rankingData = MOCK_RANKING;
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <RankingWrapper ref={tooltipRef}>
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
          Running bot
          <RankingContainer.tooltipwrapper
            onClick={() => setShowTooltip(prev => !prev)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img src={IcTooltip} alt="dashboard tooltip" />
            {showTooltip && <DashboaardRunningBotTooltip sort={sort} />}
          </RankingContainer.tooltipwrapper>
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
                  <RankingContainer.subtext>{idx + 1}</RankingContainer.subtext>
                  <RankingContainer.strategy>
                    <img src={ICON[strategy1]} alt={strategy1} />
                    <img src={ICON[strategy2]} alt={ICON[strategy2]} />
                  </RankingContainer.strategy>
                  <RankingContainer.subtext>{item?.apy}%</RankingContainer.subtext>
                  <RankingContainer.subtext>{limitDecimals(item?.tvl, 0)}TON</RankingContainer.subtext>
                  <RankingContainer.button
                    onClick={() =>
                      navigate(`/dashboard/detail/${item?.strategy}`, {
                        state: {
                          // previousStrategy: item.previousStrategy,
                          // nextStrategy: item.nextStrategy,
                          // rank: item.rank,
                          rankingList,
                        },
                      })
                    }
                  >
                    view
                  </RankingContainer.button>
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
              <img src={binance} alt="binance box icon" />
              <img src={hyperliquid} alt="hyperliquid icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
          </RankingContainer.box>
          <DivideLine />
          <RankingContainer.box>
            <RankingContainer.text>2</RankingContainer.text>
            <RankingContainer.strategy>
              <img src={stonfi} alt="stonfi box icon" />
              <img src={hyperliquid} alt="hyperliquid icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
          </RankingContainer.box>
          <DivideLine />
          <RankingContainer.box>
            <RankingContainer.text>3</RankingContainer.text>
            <RankingContainer.strategy>
              <img src={dedust} alt="dedust icon" />
              <img src={hyperliquid} alt="hyperliquid icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
          </RankingContainer.box>
          <DivideLine />
          <RankingContainer.box>
            <RankingContainer.text>4</RankingContainer.text>
            <RankingContainer.strategy>
              <img src={dedust} alt="dedust icon" />
              <img src={binance} alt="binance icon" />
            </RankingContainer.strategy>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
            <RankingContainer.text>--</RankingContainer.text>
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
  /* margin: 14px 0; */
`;

const RankingContainer = {
  tooltipwrapper: styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
  `,
  button: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    color: #1f53ff;
    text-decoration: underline;
  `,
  subtext: styled.p`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #46494A;
  `,
  text:styled.p`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #C6C5D0;
  `,
  strategy: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
  `,
  box: styled.div<{ $active? }>`
    width: 100%;
    display: grid;
    grid-template-columns: 10% 30% 20% 20% 20%; /* ✅ title과 동일한 컬럼 */
    align-items: center;
    text-align: center;
    padding: ${({ $active }) => ($active ? "15px 19px" : "14px 20px")}; /* ✅ 간격 조정 */
    background: ${({ $active }) => ($active ? "#fff" : "transparent")};
    border-radius: 1rem;

    img {
      width: 32px;
      height: 32px;
    }
  `,
  wrapper: styled.div<{ $active? }>`
    width: 100%;
    gap: 1rem;
    background-color: ${({ $active }) => ($active ? "white" : "#EFEFEF")};
    border-radius: 1rem;
    margin-bottom: ${({ $active }) => ($active ? "1.4rem" : "4rem")};
    padding-bottom: ${({ $active }) => ($active ? "11.75px" : "27px")};
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
    display: grid;
    grid-template-columns: 10% 30% 20% 20% 20%; /* ✅ 컬럼 너비 통일 */
    align-items: center;
    text-align: center;
    padding: ${({ $active }) => ($active ? "27.25px 19px 16px 19px" : "20px 20px 17px 20px")};
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
