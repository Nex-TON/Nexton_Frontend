import MainNavigationBar from "@/components/common/MainNavigationBar";
import StrategyRanking from "@/components/dashboard/StrategyRanking";
import TrendingStrategyChart from "@/components/dashboard/TrendingStrategyChart";
import { useBotPerformanceRank } from "@/hooks/api/dashboard/useBotPerformaceRank";
import { useState } from "react";
import styled from "styled-components";

const Dashboard = () => {
  const [option, setOption] = useState("pnlRate");
  const {data,isLoading}=useBotPerformanceRank(option);
  return (
    <>
      <DashboardWrapper>
        <DashboardContainer.title style={{ marginBottom: "1.9rem" }}>Dashboard</DashboardContainer.title>
        <DashboardContainer.title>Strategy Ranking</DashboardContainer.title>
        <DashboardContainer.section>
          <StrategyRanking isLoading={isLoading} option={option} handleOption={setOption} rankingList={data?.rankingList} rankingTotal={data?.rankingTotal} />
        </DashboardContainer.section>
        <DashboardContainer.subtitle>Real-Time Trending Strategy</DashboardContainer.subtitle>
        <DashboardContainer.section>
          <TrendingStrategyChart chartData={data?.chartData}/>
        </DashboardContainer.section>
      </DashboardWrapper>
      <MainNavigationBar />
    </>
  );
};
export default Dashboard;

const DashboardContainer = {
  section: styled.div`
    width: 100%;
  `,
  title: styled.p`
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
    color: #2c3542;
  `,
  subtitle: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Dashboard_text_1};
    color: #333;
  `,
};

const DashboardWrapper = styled.div`
  padding: 3.4rem 2rem 15.2rem 2rem;
  width: 100%;
  height: auto;
  min-height: 100%;
  background: #f8f8f8;
`;
