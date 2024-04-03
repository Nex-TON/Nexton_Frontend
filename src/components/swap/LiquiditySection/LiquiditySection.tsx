import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { styled } from "styled-components";

import useTonConnect from "../../../hooks/contract/useTonConnect";
import LiquidityBox from "../common/LiquidityBox";
import SwapBox from "../common/SwapBox";

import LiquidityPair from "./LiquidityPair";

const LiquiditySection = () => {
  const { balance } = useTonConnect();

  return (
    <LiquiditySectionWrapper>
      <LiquiditytitleBox>Liquidity Pair</LiquiditytitleBox>
      <LiquidityPair />
      <LiquiditytitleBox>Amount</LiquiditytitleBox>
      <SwapBox type="top" />
      <SwapBox type="bottom" balance={balance} />
      <LiquidityBox type="liquidity" />
      <MainButton text="Confirm" />
      {/* <Button title="Confirm" /> */}
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
