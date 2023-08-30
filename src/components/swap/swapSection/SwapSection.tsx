import { styled } from "styled-components";
import SwapBox from "../common/SwapBox";
import IcSwapArrow from "../../../assets/icons/Swap/ic_swap_arrow.svg";
import LiquidityBox from "../common/LiquidityBox";
import SwapRatio from "./SwapRatio";

const SwapSection = () => {
  return (
    <SwapSectionWrapper>
      <SwapWrapper>
        <SwapArrowBox>
          <img src={IcSwapArrow} alt="swapArrow" />
        </SwapArrowBox>
        <SwapBox type="top" select="swap" />
        <SwapBox type="bottom" select="swap" />
      </SwapWrapper>
      <LiquidityBox />
      <SwapRatio />
      <SwapButton>Swap</SwapButton>
    </SwapSectionWrapper>
  );
};

export default SwapSection;

const SwapSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1rem 0;
`;

const SwapWrapper = styled.div`
  position: relative;
`;

const SwapArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 3.7rem;
  height: 3.7rem;

  border-radius: 50%;
  background-color: #f9f9ff;
  box-shadow: 0px 0px 20px rgba(9, 9, 10, 0.1);
`;

const SwapButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem 0;
  margin-top: 1.4rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #008aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);

  outline: none;
  cursor: pointer;
`;
