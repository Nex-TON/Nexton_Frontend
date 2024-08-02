import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSetRecoilState } from "recoil";

import IcNextonLogo from "@/assets/icons/Dashboard/ic_nexton_logo.svg";
import IcNextonLogoSm from "@/assets/icons/Dashboard/ic_nexton_logo_sm.svg";
import IcStakeLinkArrow from "@/assets/icons/Dashboard/ic_stake_link_arrow.svg";
import IcTonLogo from "@/assets/icons/Dashboard/ic_ton_logo.svg";
import Loader from "@/components/common/Loader";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import { globalError } from "@/lib/atom/globalError";
import { limitDecimals } from "@/utils/limitDecimals";

import {
  ChartHeader,
  ChartHeaderSubtitle,
  ChartHeaderSubtitleBox,
  ChartHeaderTitle,
  ChartTimeFrame,
  ChartTimeFrameItem,
  ChartWrapper,
  DashboardWrapper,
  Divider,
  LoaderWrapper,
  PerformanceItem,
  PerformanceItemBody,
  PerformanceItemBodyBox,
  PerformanceItemFooter,
  PerformanceItemHeader,
  PerformanceItemHeaderLeft,
  PerformanceItemHeaderRight,
  PerformanceWrapper,
  StakeButton,
  TonPriceItem,
  TonPriceItemLeft,
  TonPriceItemRight,
  TonPriceItemRightPercentage,
  TonPriceWrapper,
} from "./Dashboard.styled";

import "./styles/Dashboard.css";

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
        navigate("/");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate, location.state]);

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
    <DashboardWrapper>
      <ChartWrapper>
        <h1>Dashboard</h1>

        <ChartHeader>
          <ChartHeaderTitle>
            <img src={IcNextonLogo} alt="nexton_logo" />
            <h4>Arbitrage Bot</h4>
          </ChartHeaderTitle>

          <ChartHeaderSubtitleBox>
            <ChartHeaderSubtitle>
              <h5>APY</h5>
              <span>{performanceData?.apy ? `${performanceData?.apy.toFixed(2)}%` : "-"}</span>
            </ChartHeaderSubtitle>

            <ChartHeaderSubtitle>
              <h5>Daily PNL</h5>
              <span>
                {chartData?.dailyPnlRate > 0 && "+"} {chartData?.dailyPnlRate}%
              </span>
            </ChartHeaderSubtitle>
          </ChartHeaderSubtitleBox>
        </ChartHeader>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={chartData?.data} margin={{ top: 15, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 0" vertical={false} />
            <XAxis hide />
            <YAxis orientation="right" width={50} unit="%" />
            <Tooltip formatter={(value, name, props) => [`${Number(value).toFixed(2)}%`, "PNL"]} />
            <Line type="monotone" dataKey="pnlRate" stroke="#007AFF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>

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
      </ChartWrapper>

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
              <TonPriceItemRightPercentage>{tonPriceData?.rates?.TON?.diff_24h?.USD}</TonPriceItemRightPercentage>
            </TonPriceItemRight>
          </TonPriceItem>
        </TonPriceWrapper>
      )}

      <PerformanceWrapper>
        <h2>Bot Performance</h2>

        <PerformanceItem>
          <PerformanceItemHeader>
            <PerformanceItemHeaderLeft>
              <img src={IcNextonLogoSm} alt="nexton_logo_sm" />
              <h4>Arbitrage Bot</h4>
            </PerformanceItemHeaderLeft>

            <PerformanceItemHeaderRight>
              <span>PNL</span>
              {limitDecimals(performanceData?.pnlRate, 3)}%
            </PerformanceItemHeaderRight>
          </PerformanceItemHeader>

          <Divider />

          <PerformanceItemBody>
            <PerformanceItemBodyBox>
              <h4>Stakers win rate</h4>
              <p>{performanceData?.pnlWinRate?.toFixed(2)}%</p>
            </PerformanceItemBodyBox>

            <PerformanceItemBodyBox>
              <h4>Stakers</h4>
              <p>{performanceData?.subscribedCount}</p>
            </PerformanceItemBodyBox>
          </PerformanceItemBody>

          <PerformanceItemFooter>
            <StakeButton onClick={() => navigate("/stake/amount")}>
              Stake Now <img src={IcStakeLinkArrow} alt="stake-link-arrow" />
            </StakeButton>
          </PerformanceItemFooter>
        </PerformanceItem>
      </PerformanceWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
