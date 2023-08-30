import { styled } from "styled-components";
import SwapBox from "../common/SwapBox";
import LiquidityPair from "./LiquidityPair";

const LiquiditySection = () => {
  return (
    <LiquiditySectionWrapper>
      <LiquiditytitleBox>Liquidity Pair</LiquiditytitleBox>
      <LiquidityPair />
      <LiquiditytitleBox>Amount</LiquiditytitleBox>
      <SwapBox type="top" />
      <SwapBox type="bottom" />
    </LiquiditySectionWrapper>
  );
};

export default LiquiditySection;

const LiquiditySectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1rem 0;
`;

const LiquiditytitleBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};

  text-align: center;
`;
