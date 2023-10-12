import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwapHeader from "../../components/Swap/common/SwapHeader";
import SwapSection from "../../components/Swap/SwapSection/SwapSection";
import LiquiditySection from "../../components/Swap/LiquiditySection/LiquiditySection";

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
        navigate("/");
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
