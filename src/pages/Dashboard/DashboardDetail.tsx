import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import Loader from "@/components/common/Loader";
import MainButton from "@/components/main/MainButton";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { globalError } from "@/lib/atom/globalError";
import { limitDecimals } from "@/utils/limitDecimals";
import "@/components/common/Header";

import "./styles/Dashboard.css";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import useTonConnect from "@/hooks/contract/useTonConnect";
//asset
import stonfi from "@/assets/icons/Dashboard/ic_stonfi_letter.svg";
import binance from "@/assets/icons/Dashboard/ic_binance_letter.svg";
import hyperliquid from "@/assets/icons/Dashboard/ic_hyperliquid_letter.svg";
import dedust from "@/assets/icons/Dashboard/ic_dedust_letter.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import IcTooltip from "@/assets/icons/Dashboard/ic_tooltip.svg";
import DashboardTvlTooltip from "@/components/dashboard/DashboardTvlTooltip";

const tele = (window as any).Telegram.WebApp;

type TimeFrame = "1D" | "1M" | "3M" | "6M" | "All";

const chartTimeFrameOptions: Record<TimeFrame | "All", number> = {
  "1D": 1,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  All: 0,
};

const DashboardDetail = () => {
  const { connected } = useTonConnect();
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);
  const { strategy } = useParams();

  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1D");
  const [toggled, setToggled] = useState<boolean>(false);
  const [showTvlTooltip, setShowTvlTooltip] = useState(false);

  const { data: performanceData, isLoading: performanceLoading, error: performanceError } = useBotPerformanceSummary();

  //StragyRanking에서 가져온 정보들(DedustBot 포함)
  const location = useLocation();
  const rankingList = location.state?.rankingList || [];
  const currentIndex = rankingList.findIndex(item => item.strategy === strategy);
  const currentStrategy = rankingList[currentIndex];
  const previousStrategy = rankingList[currentIndex - 1]?.strategy || null;
  const nextStrategy = rankingList[currentIndex + 1]?.strategy || null;
  const rank = currentStrategy?.rank;

  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
  } = useBotPerformanceChart(chartTimeFrameOptions[timeFrame], strategy);

  const strategyIcons = {
    stonfi: stonfi,
    binance: binance,
    hyperliquid: hyperliquid, // 추가적인 거래소 여기 추가해줘야됨
    dedust: dedust
  };

  const img1 = strategyIcons[chartData?.strategyDetails?.strategy1?.strategy] || "";
  const img2 = strategyIcons[chartData?.strategyDetails?.strategy2?.strategy] || "";

  useEffect(() => {
    console.log("rankingList",rankingList)
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.enableClosingConfirmation();
      tele.onEvent("backButtonClicked", () => {
        navigate("/dashboard");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  // Set global error state if there is an error
  useEffect(() => {
    if (chartError) {
      setError(chartError);
    }
  }, [chartError, setError]);

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setTimeFrame(timeFrame);
  };

  if (chartLoading) {
    return (
      <LoaderWrapper>
        <Loader height={50} width={50} />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <DashboardWrapper>
        <Title>
          Strategy {rank ?? "?"}
        </Title>
        <ChartNavigator.wrapper>
          <FaChevronLeft
            size={14}
            style={{ margin: "5px" }}
            color={rank === 1 ? "#E1E4E6" : "#2F3038"}
            onClick={() => {
              //console.log("왼쪽 눌림", previousStrategy);
              if (previousStrategy) {
                navigate(`/dashboard/detail/${previousStrategy}`, {
                  state: {rankingList},
                });
              }
              // if (chartData?.strategyDetails?.strategy1?.strategy === "stonfi" && chartData?.strategyDetails?.strategy2?.strategy === "hyperliquid") {
              //   navigate("/dashboard/detail/stonfi-binance");
              // } 
              // else if (chartData?.strategyDetails?.strategy1?.strategy === "dedust" && chartData?.strategyDetails?.strategy2?.strategy === "binance") {
              //   navigate("/dashboard/detail/stonfi-hyperliquid");
              // } else if (chartData?.strategyDetails?.strategy1?.strategy === "dedust" && chartData?.strategyDetails?.strategy2?.strategy === "hyperliquid") {
              //   navigate("/dashboard/detail/dedust-binance");
              // }
            }}
          />
          <ChartNavigator.strategywrapper>
            <ChartNavigator.exchange>{chartData?.strategyDetails?.strategy1?.exchange}</ChartNavigator.exchange>
            <DivideLine />
            <img src={img1} alt="strategy1 logo" style={{ marginRight: "2rem" }} />
            <ChartNavigator.exchange>{chartData?.strategyDetails?.strategy2?.exchange}</ChartNavigator.exchange>
            <DivideLine />
            <img src={img2} alt="strategy2 logo" />
          </ChartNavigator.strategywrapper>
          <FaChevronRight
            size={14}
            style={{ margin: "5px" }}
            color={ rank ===4 ? "#E1E4E6" : "#2F3038"}
            onClick={() => {
              console.log("오른쪽 눌림", nextStrategy);
              if (nextStrategy) {
                navigate(`/dashboard/detail/${nextStrategy}`, {
                  state: {rankingList},
                });
              }
              // if (chartData?.strategyDetails?.strategy1?.strategy === "stonfi" && chartData?.strategyDetails?.strategy2?.strategy === "binance") {
              //   navigate("/dashboard/detail/stonfi-hyperliquid");
              // } 
              // else if (chartData?.strategyDetails?.strategy1?.strategy === "stonfi" && chartData?.strategyDetails?.strategy2?.strategy === "hyperliquid") {
              //   navigate("/dashboard/detail/dedust-binance");
              // } else if (chartData?.strategyDetails?.strategy1?.strategy === "dedust" && chartData?.strategyDetails?.strategy2?.strategy === "binance") {
              //   navigate("/dashboard/detail/dedust-hyperliquid");
              // }
            }}
          />
        </ChartNavigator.wrapper>
        <ChartWrapper>
          <ChartTimeFrame>
            {Object.keys(chartTimeFrameOptions).map(key => (
              <ChartTimeFrameItem
                key={key}
                $active={timeFrame === key}
                onClick={() => handleTimeFrameChange(key as TimeFrame)}
              >
                {key}
              </ChartTimeFrameItem>
            ))}
          </ChartTimeFrame>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={220} data={chartData?.data} margin={{ top: 15, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 2" vertical={false} />
              <XAxis hide />
              <YAxis orientation="right" width={50} unit="%" stroke="0" />
              <Tooltip formatter={(value, name, props) => [`${Number(value).toFixed(2)}%`, "PNL"]} />
              <Line type="monotone" dataKey="pnlRate" stroke="#007AFF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <PerformanceWrapper>
          <h2>Arb Bot statistics</h2>

          <PerformanceItemWrapper>
            <PerformanceItem>
              <h3>APY</h3>
              <p>{chartData?.apy?.toFixed(2)}%</p>
            </PerformanceItem>

            <PerformanceItem>
              <h3>Daily PNL</h3>
              <p>
                {chartData?.dailyPnlRate > 0 ? "+" : ""}
                {chartData?.dailyPnlRate.toFixed(2)}%
              </p>
            </PerformanceItem>
          </PerformanceItemWrapper>
          <PerformanceItemWrapper>
            <PerformanceItem>
              <h3>Stakers Win Rate</h3>
              <p>{chartData?.pnlWinRate?.toFixed(2)}%</p>
            </PerformanceItem>
            <PerformanceItem>
              <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                TVL
                <StTooltipContainer
                  onClick={() => setShowTvlTooltip(true)}
                  onMouseEnter={() => setShowTvlTooltip(true)}
                  onMouseLeave={() => setShowTvlTooltip(false)}
                >
                  {showTvlTooltip && <DashboardTvlTooltip />}
                  <img src={IcTooltip} alt="tooltip icon" />
                </StTooltipContainer>
              </h3>
              <p>{limitDecimals(chartData?.tvl, 3)} TON</p>
            </PerformanceItem>
          </PerformanceItemWrapper>
          <MainButton
            connected={connected}
            toggled={toggled}
            handleToggle={() => setToggled(!toggled)}
            style={{ margin: "6.5rem 0 6.1rem 0" }}
          />
        </PerformanceWrapper>
      </DashboardWrapper>
      <MainNavigationBar />
    </>
  );
};

export default DashboardDetail;

const StTooltipContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const DivideLine = styled.div`
  background: #aaaeaf;
  width: 1.005px;
  height: 9.043px;
  margin: 0 8.04px;
`;

const ChartNavigator = {
  exchange: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #aaaeaf;
  `,
  strategywrapper: styled.div`
    img {
      height: 16px;
      margin-right: 1rem;
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0 0 0;
  `,
};

const Title = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  color: #2c3542;
`;

export const ChartTimeFrame = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  margin-top: 1.6rem;
`;

export const ChartTimeFrameItem = styled.div<{ $active?: boolean }>`
  width: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;

  cursor: pointer;

  border-radius: 30px;
  background: ${({ $active }) => ($active ? "#E1E4E6" : "transparent")};

  color: #000000;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;

  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const DashboardWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  padding: 3.4rem 2rem 15.4rem 2rem;

  display: flex;
  flex-direction: column;
  background-color: white;

  h1 {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
  }
`;

const PerformanceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 4.3rem;

  h2 {
    color: #2c3542;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const PerformanceItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

export const PerformanceItem = styled.div<{ $fullWidth?: boolean }>`
  height: 100px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "50%")};

  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;

  border-radius: 15px;
  background: #fff;
  box-shadow: 4px 4px 16px 0px rgba(206, 216, 225, 0.5);

  padding: 2.2rem;

  h3 {
    color: #76797a;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex- img {
      width: 16px;
      height: 16px;
    }
  }

  p {
    color: #46494a;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 21px */
  }
`;
