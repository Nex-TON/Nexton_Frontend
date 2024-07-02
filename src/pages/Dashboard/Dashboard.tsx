import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useSetRecoilState } from "recoil";

import IcNextonLogo from "@/assets/icons/Dashboard/ic_nexton_logo.svg";
import IcNextonLogoSm from "@/assets/icons/Dashboard/ic_nexton_logo_sm.svg";
import IcStakeLinkArrow from "@/assets/icons/Dashboard/ic_stake_link_arrow.svg";
import Loader from "@/components/common/Loader";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { globalError } from "@/lib/atom/globalError";
import { limitDecimals } from "@/utils/limitDecimals";

import {
  ChartHeader,
  ChartHeaderSubtitle,
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
} from "./Dashboard.styled";

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
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);

  const [userId, setUserId] = useState<number>();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1D");

  const {
    data: performanceData,
    isLoading: performanceLoading,
    error: performanceError,
  } = useBotPerformanceSummary(userId);

  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
  } = useBotPerformanceChart(userId, chartTimeFrameOptions[timeFrame]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/menu");
      });

      const tgUser = tele.initDataUnsafe?.user;
      if (tgUser) {
        setUserId(tgUser?.id);
      } else {
        console.warn("You should launch the app inside the Telegram Mini App.");
      }
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  // Set global error state if there is an error
  useEffect(() => {
    if (performanceError || chartError) {
      setError(performanceError || chartError);
    }
  }, [performanceError, chartError, setError]);

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setTimeFrame(timeFrame);
  };

  if (performanceLoading || chartLoading) {
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

          {/* to-do: get daily pnl from the API */}
          {/* <ChartHeaderSubtitle>
            <h5>Daily PNL</h5>
            <span>+33%</span>
          </ChartHeaderSubtitle> */}
        </ChartHeader>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={chartData?.data} margin={{ top: 15, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 0" vertical={false} />
            <XAxis hide />
            <YAxis hide />
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

      <PerformanceWrapper>
        <h2>Bot Performance</h2>

        <PerformanceItem>
          <PerformanceItemHeader>
            <PerformanceItemHeaderLeft>
              <img src={IcNextonLogoSm} alt="nexton_logo_sm" />
              <h4>Arbitrage Bot</h4>
            </PerformanceItemHeaderLeft>

            <PerformanceItemHeaderRight>{limitDecimals(performanceData?.pnlRate, 3)}%</PerformanceItemHeaderRight>
          </PerformanceItemHeader>

          <Divider />

          <PerformanceItemBody>
            <PerformanceItemBodyBox>
              <h4>Subscriber win rate</h4>
              <p>{performanceData?.pnlWinRate?.toFixed(2)}%</p>
            </PerformanceItemBodyBox>

            <PerformanceItemBodyBox>
              <h4>Subscribed</h4>
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
