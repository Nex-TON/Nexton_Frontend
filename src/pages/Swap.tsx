import { styled } from "styled-components";
import SwapHeader from "../components/swap/common/SwapHeader";
import { useState } from "react";
import SwapSection from "../components/swap/swapSection/SwapSection";
import LiquiditySection from "../components/swap/LiquiditySection/LiquiditySection";

const Swap = () => {
  const [isClick, setIsClick] = useState([true, false]);

  const handleSwitchNav = (idx: number) => {
    if (idx === 0) {
      setIsClick([true, false]);
    } else {
      setIsClick([false, true]);
    }
  };

  return (
    <SwapWrapper>
      <SwapHeader isClick={isClick} handleSwitchNav={handleSwitchNav} />
      {isClick[0] ? <SwapSection /> : <LiquiditySection />}
    </SwapWrapper>
  );
};

export default Swap;

const SwapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2.9rem 1.2rem 2.9rem 1.2rem;
`;
