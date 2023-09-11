import { styled } from "styled-components";
import Step1 from "../components/lerverage/Step1";
import Step2 from "../components/lerverage/Step2";
import Step3 from "../components/lerverage/Step3";
import FooterButton from "../components/common/FooterButton";
import * as Contract from "./../hooks/useNextonContract";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { stakingAtom, stakingInputAtom } from "../lib/atom/staking";
import { StakingProps } from "../types/staking";
import { getLockUpDate } from "../utils/getLockupDate";

import BorderLine from "../components/lerverage/common/BorderLine";
import { getTelegramId } from "../api/getTelegramId";
import useTonConnect from "../hooks/useTonConnect";
import { telegramAtom } from "../lib/atom/telegram";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import Nominator from "../components/lerverage/Nominator";
import { nominatorAtom } from "../lib/atom/nominator";

const tele = (window as any).Telegram.WebApp;

const Leverage = () => {
  const { sendMessage } = Contract.useNextonContract();
  const { address } = useTonConnect();
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);

  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const [error, setError] = useState(false);
  const [amountError, setAmoutError] = useState(false);
  const [nominatorError, setNominatorError] = useState(false);
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const [input, setInput] = useRecoilState(stakingInputAtom);
  const [maxLeverage, setMaxLeverage] = useState(0);
  const [ratio, setRatio] = useState(1.0);
  const nominatorName = useRecoilValue(nominatorAtom);

  const navigate = useNavigate();

  const handleGetTelegramId = async (address: string) => {
    if (!address) return;
    const response = await getTelegramId("1");

    if (response?.length === 0) {
      setTelegramId(0);
    } else {
      setTelegramId(response[0]?._id);
    }
  };

  useEffect(() => {
    handleGetTelegramId(address);
  });

  const handleMovePreview = () => {
    if (input === "") {
      setError(true);
      step1Ref.current?.scrollIntoView({ behavior: "smooth" });
    } else if (Number(input) < 0.5) {
      setAmoutError(true);
      step1Ref.current?.scrollIntoView({ behavior: "smooth" });
    } else if (Number(input) >= 0.5 && nominatorName === "") {
      setNominatorError(true);
      step2Ref.current?.scrollIntoView({ behavior: "smooth" });
    } else if (Number(input) >= 0.5 && nominatorName !== "") {
      setError(false);
      const newDepoist: StakingProps = {
        id: Number(telegramId),
        address,
        principal: input,
        leverage: ratio,
        lockup: getLockUpDate(input, ratio),
        nominator: nominatorName,
      };

      setStakingInfo(newDepoist);
      navigate("/leverage/preview");
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

  useEffect(() => {
    if (input !== "") {
      setError(false);
      return;
    }
  }, [input]);

  useEffect(() => {
    if (input !== "" && Number(input) < 0.5) {
      setAmoutError(true);
      return;
    } else {
      setAmoutError(false);
    }
  }, [input]);

  useEffect(() => {
    if (nominatorName !== "") {
      setNominatorError(false);
      return;
    }
  }, [nominatorName]);

  return (
    <LeverageWrapper>
      <Step1
        input={input}
        setInput={setInput}
        error={error}
        amountError={amountError}
        step1Ref={step1Ref}
      />
      <BorderLine />
      <Nominator step2Ref={step2Ref} nominatorError={nominatorError} />
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
      <LeverageBottomTextBox>
        The NFT will contain this information
      </LeverageBottomTextBox>
      {/* <FooterWrapper>
        <FooterButton
          title="Confirm"
          ratio={ratio}
          onClick={handleMovePreview}
        />
      </FooterWrapper> */}
      <MainButton text="Confirm" onClick={handleMovePreview} />
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

const FooterWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const LeverageBottomTextBox = styled.div`
  width: 100%;
  margin-bottom: 0.9rem;

  color: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Footnote_1};

  text-align: center;
`;
