import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { globalError } from "@/lib/atom/globalError";

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

  return (
    <>
      <DashboardWrapper>
        <ChartWrapper>
          <h1>Dashboard</h1>

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

        <PerformanceWrapper></PerformanceWrapper>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  padding: 2rem;
  gap: 1.6rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
`;

const PerformanceWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;
