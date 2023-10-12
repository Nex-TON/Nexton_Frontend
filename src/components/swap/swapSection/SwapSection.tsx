import { styled } from "styled-components";
import IcSwapArrow from "../../../assets/icons/Swap/ic_swap_arrow.svg";
import { useState } from "react";
import useTonConnect from "../../../hooks/contract/useTonConnect";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import SwapBox from "../common/SwapBox";
import LiquidityBox from "../common/LiquidityBox";
import SwapRatio from "./SwapRatio";

const SwapSection = () => {
  const [switchToken, setSwitchToken] = useState(false);
  const { balance } = useTonConnect();

  const handleSwitchToken = () => {
    setSwitchToken((prev) => !prev);
  };

  return (
    <SwapSectionWrapper>
      <SwapWrapper>
        <SwapArrowBox onClick={handleSwitchToken}>
          <img src={IcSwapArrow} alt="swapArrow" />
        </SwapArrowBox>
        {switchToken ? (
          <>
            <SwapBox
              type="bottom"
              select="swap"
              text="from"
              balance={balance}
            />
            <SwapBox type="top" select="swap" text="to" />
          </>
        ) : (
          <>
            <SwapBox type="top" select="swap" text="from" />
            <SwapBox type="bottom" select="swap" text="to" balance={balance} />
          </>
        )}
      </SwapWrapper>
      <LiquidityBox type="swap" />
      <SwapRatio />
      <MainButton text="Swap" />
      {/* <Button title="Swap" /> */}
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

  width: 100%;
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
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(9, 9, 10, 0.1);
`;
