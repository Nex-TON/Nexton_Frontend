import styled from "styled-components";
import { LineChart, Line } from "recharts";
import IcStonfi from "@/assets/icons/Dashboard/ic_stonfi_letter.svg";
import IcBinance from "@/assets/icons/Dashboard/ic_binance_letter.svg";
import { MOCK_RANKING } from "@/constants/MOCK/MOCK_ranking";

const TrendingStrategyChart = () => {
  const chartData = MOCK_RANKING?.chartData;
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
            <LineChart data={chartData} height={220} >
                <Line type="monotone" dataKey="value" />
            </LineChart>
        </ChartContainer.wrapper>
      </ChartWrapper>
    </>
  );
};
export default TrendingStrategyChart;

const ChartContainer = {
  wrapper: styled.div`
    width: 100%;
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
  `,
};

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;
