import { styled } from "styled-components";
import Step1 from "../components/lerverage/Step1";
import Step2 from "../components/lerverage/Step2";
import Step3 from "../components/lerverage/Step3";
import FooterButton from "../components/common/FooterButton";
import * as Contract from "./../hooks/useNextonContract";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { stakingAtom } from "../lib/atom/staking";
import { StakingProps } from "../types/staking";
import { getLockUpDate } from "../utils/getLockupDate";

import BorderLine from "../components/lerverage/common/BorderLine";
import NFTPreview from "../components/lerverage/NFTPreview/NFTPreview";
import BackButton from "../components/common/BackButton";
import { getTelegramId } from "../api/getTelegramId";
import useTonConnect from "../hooks/useTonConnect";
import { telegramAtom } from "../lib/atom/telegram";

const tele = (window as any).Telegram.WebApp;

const Leverage = () => {
  const [isMovePreview, setIsMovePreview] = useState(false);
  const { sendMessage } = Contract.useNextonContract();
  const { address } = useTonConnect();

  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const [input, setInput] = useState("");
  const [maxLeverage, setMaxLeverage] = useState(0);
  const [ratio, setRatio] = useState(1.0);

  const handleMovePreview = () => {
    const newDepoist: StakingProps = {
      id: Number(telegramId),
      address,
      principal: input,
      leverage: ratio,
      lockup: getLockUpDate(input, ratio),
    };

    setStakingInfo(newDepoist);
    setIsMovePreview((prev) => !prev);
  };

  const handleGetTelegramId = async (address: string) => {
    const response = await getTelegramId(address);
    setTelegramId(response[0]?._id);
  };

  useEffect(() => {
    handleGetTelegramId(address);
  }, []);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.MainButton.text = "Hello";
      tele.MainButton.show();
      tele.BackButton.show();
    }
  });

  return isMovePreview ? (
    <NFTPreview handleMovePreview={handleMovePreview} />
  ) : (
    <LeverageWrapper>
      <LeverageHeaderBox>
        <BackButton />
      </LeverageHeaderBox>
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

const LeverageHeaderBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;

  width: 100%;
`;
const FooterWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
