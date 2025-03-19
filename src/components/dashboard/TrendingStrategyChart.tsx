import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import IcStonfi from "@/assets/icons/Dashboard/ic_stonfi_letter.svg";
import IcBinance from "@/assets/icons/Dashboard/ic_binance_letter.svg";
import { useBotPerformanceRank } from "@/hooks/api/dashboard/useBotPerformaceRank";

const formatXAxis = (dateString: string, index: number): string => {
  // X-axis 순서대로 시간 설정 (24h, 18h, 12h, 6h, Now)
  const totalHours = 24;
  const hoursRemaining = totalHours - index;  // X축 왼쪽에서부터 시간 설정

  if (index === 0) {
    return "24h";
  } else if (hoursRemaining === 6) {
    return "6h";
  } else if (hoursRemaining === 12) {
    return "12h";
  } else if (hoursRemaining === 18) {
    return "18h";
  }else if (index==24){
    return "Now";
  } else {
    return ""; // 나머지 시간은 빈 값으로 처리
  }
};

const TrendingStrategyChart = ({chartData}) => {
  // const chartData = MOCK_RANKING?.chartData;
  return (
    <>
      <ChartWrapper>
        <Strategy.wrapper>
          <Strategy.exchange>CEX</Strategy.exchange>
          <DivideLine />
          <img src={IcBinance} alt="binance letter logo" />
          <Strategy.exchange>DEX</Strategy.exchange>
          <DivideLine />
          <img src={IcStonfi} alt="stonfi letter logo" />
        </Strategy.wrapper>
        <ChartContainer.wrapper>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} height={220} width={900}>
              <Line type="monotone" dataKey="pnlRate" stroke="#007AFF" dot={false} />
              <CartesianGrid strokeDasharray="3 2" vertical={false} />
              <XAxis tickLine={false}  stroke="#303234" strokeDasharray="1 0" dataKey="createdAt"  tickFormatter={(value, index) => formatXAxis(value, index)}  allowDataOverflow={false}  tickCount={24} />
              <YAxis  orientation="right" unit="%" axisLine={false} margin-left={6} stroke="0"/>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer.wrapper>
        <InformationBox>
          * This graph is updated in real-time, <br />
          ranking returns in descending order on a daily basis.
        </InformationBox>
      </ChartWrapper>
    </>
  );
};
export default TrendingStrategyChart;

const InformationBox = styled.div`
  width: 100%;
  height: auto;
  text-align: start;
  color: #767680;
  ${({ theme }) => theme.fonts.Nexton_Dashboard_text_2};
`;

const ChartContainer = {
  wrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const DivideLine = styled.div`
  background: #aaaeaf;
  width: 1.005px;
  height: 9.043px;
  margin: 0 8.04px;
`;

const Strategy = {
  exchange: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #aaaeaf;
  `,
  wrapper: styled.div`
    img {
      height: 16px;
      margin-right: 1rem;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 15px 0 21.92px 0;
  `,
};

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
