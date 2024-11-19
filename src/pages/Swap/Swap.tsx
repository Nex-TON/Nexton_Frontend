import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import SwapHeader from "../../components/swap/common/SwapHeader";
import LiquiditySection from "../../components/swap/LiquiditySection/LiquiditySection";
import SwapSection from "../../components/swap/SwapSection/SwapSection";

const tele = (window as any).Telegram.WebApp;

const Swap = () => {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState([true, false]);

  const handleSwitchNav = (idx: number) => {
    if (idx === 0) {
      setIsClick([true, false]);
    } else {
      setIsClick([false, true]);
    }
  };

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
