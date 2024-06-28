import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSetRecoilState } from "recoil";

import IcNextonLogo from "@/assets/icons/Dashboard/ic_nexton_logo.svg";
import IcNextonLogoSm from "@/assets/icons/Dashboard/ic_nexton_logo_sm.svg";
import IcStakeLinkArrow from "@/assets/icons/Dashboard/ic_stake_link_arrow.svg";
import Loader from "@/components/common/Loader";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { globalError } from "@/lib/atom/globalError";
import { limitDecimals } from "@/utils/limitDecimals";

import {
  ChartHeader,
  ChartHeaderSubtitle,
  ChartHeaderTitle,
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

export interface IUserInfo {
  userId: number;
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    amt: 2100,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);

  const [userId, setUserId] = useState<number>();

  const {
    data: performanceData,
    isLoading: performanceLoading,
    error: performanceError,
  } = useBotPerformanceSummary(/* userId */ 1); //to-do: remove mock userId
  console.log(performanceData);

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

  if (performanceError) {
    setError(performanceError);
  }

  if (performanceLoading) {
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

          <ChartHeaderSubtitle>
            <h5>Daily PNL</h5>
            <span>+33%</span>
          </ChartHeaderSubtitle>
        </ChartHeader>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      <PerformanceWrapper>
        <h2>Bot Performance</h2>

        <PerformanceItem>
          <PerformanceItemHeader>
            <PerformanceItemHeaderLeft>
              <img src={IcNextonLogoSm} alt="nexton_logo_sm" />
              <h4>Arbitrage Bot</h4>
            </PerformanceItemHeaderLeft>

            <PerformanceItemHeaderRight>{limitDecimals(performanceData.pnlRate, 3)}%</PerformanceItemHeaderRight>
          </PerformanceItemHeader>

          <Divider />

          <PerformanceItemBody>
            <PerformanceItemBodyBox>
              <h4>Subscriber win rate</h4>
              <p>{performanceData.pnlWinRate.toFixed(2)}%</p>
            </PerformanceItemBodyBox>

            <PerformanceItemBodyBox>
              <h4>Subscribed</h4>
              <p>{performanceData.subscribedCount}</p>
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
