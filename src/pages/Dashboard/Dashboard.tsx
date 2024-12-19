import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { ClickAwayListener } from "@mui/material";
//tooltip name이 겹쳐서 변수명 설정해줌
import { Tooltip as MuiTooltip, tooltipClasses } from "@mui/material";
import { VscInfo } from "react-icons/vsc";
import IcNextonLogo from "@/assets/icons/Dashboard/ic_nexton_logo.svg";
import IcTonLogo from "@/assets/icons/Dashboard/ic_ton_logo.svg";
import Loader from "@/components/common/Loader";
import MainButton from "@/components/main/MainButton";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import { globalError } from "@/lib/atom/globalError";
import { limitDecimals } from "@/utils/limitDecimals";
import IcnxTONLogo from "@/assets/icons/Dashboard/ic_nxTON_logo.svg";
import "@/components/common/Header";

import {
  DashboardHeader,
  ChartHeader,
  ChartHeaderTitle,
  ChartTimeFrame,
  ChartTimeFrameItem,
  ChartWrapper,
  DashboardWrapper,
  LoaderWrapper,
  PerformanceItem,
  PerformanceItemWrapper,
  PerformanceWrapper,
  TonPriceItem,
  TonPriceItemLeft,
  TonPriceItemRight,
  TonPriceItemRightPercentage,
  TonPriceWrapper,
} from "./Dashboard.styled";

import "./styles/Dashboard.css";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import Header from "@/components/common/Header";
import useTonConnect from "@/hooks/contract/useTonConnect";

const tele = (window as any).Telegram.WebApp;

type TimeFrame = "1D" | "1M" | "3M" | "6M" | "All";

const chartTimeFrameOptions: Record<TimeFrame | "All", number> = {
  "1D": 1,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  All: 0,
};

const Dashboard = () => {
  const { connected, tonConnectUI } = useTonConnect();
  const [open, setOpen] = useState(false);

  const handleTooltip = () => {
    setOpen(!open);
  };
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);

  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1D");

  const { data: performanceData, isLoading: performanceLoading, error: performanceError } = useBotPerformanceSummary();

  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
  } = useBotPerformanceChart(chartTimeFrameOptions[timeFrame]);

  const { data: tonPriceData, isLoading: tonPriceLoading, error: tonPriceError } = useCoinPrice("ton", "usd");

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  // Set global error state if there is an error
  useEffect(() => {
    if (performanceError || chartError) {
      setError(performanceError || chartError);
    }
  }, [performanceError, chartError, setError]);

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setTimeFrame(timeFrame);
  };

  if (performanceLoading || chartLoading || tonPriceLoading) {
    return (
      <LoaderWrapper>
        <Loader height={50} width={50} />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <Header
        isOpen={false}
        backgroundType={false}
        text="Dashboard"
        connected={connected}
        tonConnectUI={tonConnectUI}
      />
      <DashboardWrapper>
        <ChartWrapper>
          <ChartHeader>
            <ChartHeaderTitle>
              <img src={IcNextonLogo} alt="nexton_logo" />
              <h4>Arbitrage Bot</h4>
            </ChartHeaderTitle>
          </ChartHeader>
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
            <LineChart width={500} height={300} data={chartData?.data} margin={{ top: 15, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 0" vertical={false} />
              <XAxis hide />
              <YAxis orientation="right" width={50} unit="%" />
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
              <p>{performanceData?.apy?.toFixed(2)}%</p>
            </PerformanceItem>

            <PerformanceItem>
              <h3>Daily PNL</h3>
              <p>
                {chartData?.dailyPnlRate > 0 ? "+" : ""}
                {chartData?.dailyPnlRate}%
              </p>
            </PerformanceItem>
          </PerformanceItemWrapper>
          <PerformanceItemWrapper>
            <PerformanceItem>
              <h3>Stakers Win Rate</h3>
              <p>{performanceData?.pnlWinRate?.toFixed(2)}%</p>
            </PerformanceItem>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <PerformanceItem onClick={handleTooltip}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  TVL
                  <MuiTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltip}
                    open={open}
                    disableTouchListener
                    disableHoverListener // 추가
                    title={
                      <TooltipText>
                        <img src={IcTonLogo} /> TON+
                        <img src={IcnxTONLogo} />
                        nxTON
                      </TooltipText>
                    }
                    placement="top"
                    slotProps={{
                      popper: {
                        sx: {
                          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
                            marginBottom: "5px",
                          },
                        },
                      },
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          padding: "7px 15px",
                          bgcolor: "#000",
                          alignContent: "center",
                          textAlign: "center",
                          width: "152px",
                          height: "42px",
                          transform: "center bottom",
                          border: "none",
                        },
                      },
                      arrow: { sx: { color: "black", border: "none" } },
                    }}
                    arrow
                  >
                    <div>
                      <VscInfo
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "#C6CACA",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      />
                    </div>
                  </MuiTooltip>
                </h3>
                <p>{limitDecimals(performanceData?.tvl, 3)} TON</p>
              </PerformanceItem>
            </ClickAwayListener>
          </PerformanceItemWrapper>
          <MainButton style={{ margin: "1.5rem 0 6.1rem 0" }} />

          {!tonPriceError && (
            <TonPriceWrapper>
              <h2>Current value of TON</h2>
              <TonPriceItem>
                <TonPriceItemLeft>
                  <img src={IcTonLogo} alt="ton_logo" />
                  <p>TON</p>
                </TonPriceItemLeft>

                <TonPriceItemRight>
                  <p>${tonPriceData?.rates?.TON?.prices?.USD.toFixed(2)}</p>
                  <TonPriceItemRightPercentage
                    $positive={tonPriceData?.rates?.TON?.diff_24h?.USD[0] == "+" ? true : false}
                  >
                    {tonPriceData?.rates?.TON?.diff_24h?.USD}
                  </TonPriceItemRightPercentage>
                </TonPriceItemRight>
              </TonPriceItem>
            </TonPriceWrapper>
          )}
        </PerformanceWrapper>
        <MainNavigationBar />
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;

const TooltipText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: var(--Neutral-Neutural-100, #fff);
  text-align: right;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */

  img {
    width: 22px;
    height: 22px;
    margin-right: 0.2rem;
  }
`;
