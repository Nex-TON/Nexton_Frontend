import { styled } from "styled-components";
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
import { sendMessageBot } from "../api/sendMessage";
import { chatState } from "../lib/atom/chatState";

const Leverage = () => {
  const { sendMessage } = Contract.useNextonContract();

  const chatId = useRecoilValue(chatState);
  const [stakingInfo, setStakingInfo] = useRecoilState(stakingAtom);
  const [input, setInput] = useState("");
  const [maxLeverage, setMaxLeverage] = useState(0);
  const [ratio, setRatio] = useState(1.0);

  const getDepoist = () => {
    const newDepoist: StakingProps = {
      principal: input,
      leverage: ratio,
      lockup: getLockUpDate(input, ratio),
    };

    setStakingInfo((prev) => [...prev, newDepoist]);
  };

  return (
    <LeverageWrapper>
      <BackImg src={IcBack} onClick={() => window.history.back()} />
      <Step1 input={input} setInput={setInput} />
      <Step2
        input={input}
        maxLeverage={maxLeverage}
        setMaxLeverage={setMaxLeverage}
        ratio={ratio}
        setRatio={setRatio}
      />
      <Step3 input={input} ratio={ratio} />
      <FooterButton
        title="Confirm"
        input={input}
        ratio={ratio}
        onClick={async () => {
          const data = (): UserDeposit => {
            return {
              $$type: "UserDeposit",
              lockPeriod: 0n,
              leverage: 0n,
            };
          };
          sendMessage(data());
          getDepoist();
          sendMessageBot(chatId);
        }}
      />
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

  padding: 4.5rem 1.2rem 1.3rem 1.2rem;
`;

const BackImg = styled.img`
  position: absolute;
  left: 1.5rem;
  top: 4.4rem;

  cursor: pointer;
`;
