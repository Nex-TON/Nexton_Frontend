import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1D");
  const [toggled, setToggled] = useState<boolean>(false);

  const { data: performanceData, isLoading: performanceLoading, error: performanceError } = useBotPerformanceSummary();

  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
  } = useBotPerformanceChart(chartTimeFrameOptions[timeFrame]);

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

  if (performanceLoading || chartLoading) {
    return (
      <LoaderWrapper>
        <Loader height={50} width={50} />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <DashboardWrapper>
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
            <PerformanceItem>
              <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>TVL</h3>
              <p>{limitDecimals(performanceData?.tvl, 3)} TON</p>
            </PerformanceItem>
          </PerformanceItemWrapper>
          <MainButton
            connected={connected}
            toggled={toggled}
            handleToggle={() => setToggled(!toggled)}
            style={{ margin: "1.5rem 0 6.1rem 0" }}
          />
        </PerformanceWrapper>
        <MainNavigationBar />
      </DashboardWrapper>
    </>
  );
};

export default DashboardDetail;

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

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DashboardWrapper = styled.div`
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

export const PerformanceWrapper = styled.div`
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
