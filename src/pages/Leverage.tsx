import { css, styled } from "styled-components";
import Step1 from "../components/lerverage/Step1";
import Step2 from "../components/lerverage/Step2";
import Step3 from "../components/lerverage/Step3";
import FooterButton from "../components/common/FooterButton";
import IcBack from "../assets/icons/ic_back.svg";
import * as Contract from "./../hooks/useNextonContract";
import { UserDeposit } from "../hooks/tact_NexTon";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { stakingAtom } from "../lib/atom/staking";
import { StakingProps } from "../types/staking";
import { getLockUpDate } from "../utils/getLockupDate";
import { chatState } from "../lib/atom/chatState";
import useTonConnect from "../hooks/useTonConnect";
import BasicModal from "../components/modals/BasicModal";
import BorderLine from "../components/lerverage/common/BorderLine";
import NFTPreview from "../components/lerverage/NFTPreview/NFTPreview";

const Leverage = () => {
  const [isMovePreview, setIsMovePreview] = useState(false);
  const { sendMessage } = Contract.useNextonContract();

  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const [input, setInput] = useState("");
  const [maxLeverage, setMaxLeverage] = useState(0);
  const [ratio, setRatio] = useState(1.0);

  const handleMovePreview = () => {
    setIsMovePreview((prev) => !prev);
  };

  const getDepoist = () => {
    const newDepoist: StakingProps = {
      principal: input,
      leverage: ratio,
      lockup: getLockUpDate(input, ratio),
    };

    setStakingInfo((prev) => [...prev, newDepoist]);
  };

  return isMovePreview ? (
    <NFTPreview handleMovePreview={handleMovePreview} />
  ) : (
    <LeverageWrapper>
      <BackImg src={IcBack} onClick={() => window.history.back()} />
      <Step1 input={input} setInput={setInput} />
      <BorderLine />
      <Step2
        input={input}
        maxLeverage={maxLeverage}
        setMaxLeverage={setMaxLeverage}
        ratio={ratio}
        setRatio={setRatio}
      />
      <BorderLine />
      <Step3 input={input} ratio={ratio} />
      <FooterWrapper>
        <FooterButton
          title="Confirm"
          input={input}
          ratio={ratio}
          onClick={handleMovePreview}
        />
      </FooterWrapper>
    </LeverageWrapper>
  );
};

export default Leverage;

const LeverageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  padding: 4.5rem 0 1.3rem 0;
`;

const BackImg = styled.img`
  position: absolute;
  left: 1.5rem;
  top: 4.4rem;

  cursor: pointer;
`;

const FooterWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
