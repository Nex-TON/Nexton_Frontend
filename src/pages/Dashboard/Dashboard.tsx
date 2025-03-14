import MainNavigationBar from "@/components/common/MainNavigationBar";
import StrategyRanking from "@/components/dashboard/StrategyRanking";
import TonValue from "@/components/dashboard/TonValue";
import TrendingStrategyChart from "@/components/dashboard/TrendingStrategyChart";
import styled from "styled-components";
const Dashboard = () => {
  return (
    <>
      <DashboardWrapper>
        <DashboardContainer.title>Strategy Ranking</DashboardContainer.title>
        <DashboardContainer.section>
          <StrategyRanking />
        </DashboardContainer.section>
        <DashboardContainer.title>Real-Time Trending Strategy</DashboardContainer.title>
        <DashboardContainer.section><TrendingStrategyChart/></DashboardContainer.section>
        <DashboardContainer.title>Current value of TON</DashboardContainer.title>
        <DashboardContainer.section>
          <TonValue />
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
};

const DashboardWrapper = styled.div`
  padding: 3.4rem 2rem 12.7rem 2rem;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
`;
