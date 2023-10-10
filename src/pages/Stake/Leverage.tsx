import { styled } from "styled-components";
import Step2 from "../../components/lerverage/Step2";
import Step3 from "../../components/lerverage/Step3";
import FooterButton from "../../components/common/FooterButton";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { stakingAtom } from "../../lib/atom/staking";
import { getLockUpDate } from "../../utils/getLockupDate";
import { getTelegramId } from "../../api/getTelegramId";
import useTonConnect from "../../hooks/contract/useTonConnect";
import { telegramAtom } from "../../lib/atom/telegram";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import ProgressBar from "../../components/common/ProgressBar";

const tele = (window as any).Telegram.WebApp;

const Leverage = () => {
  const { address } = useTonConnect();

  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);

  const [stakingInfo, setStakingInfo] = useRecoilState(stakingAtom);
  const [maxLeverage, setMaxLeverage] = useState(0);
  const [ratio, setRatio] = useState(1.0);

  const navigate = useNavigate();

  const handleGetTelegramId = async (address: string) => {
    if (!address) return;
    const response = await getTelegramId(address);

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
    setStakingInfo((prev) => ({
      ...prev,
      leverage: ratio,
      lockup: getLockUpDate(stakingInfo.principal, ratio),
    }));
    navigate("/stake/preview");
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/stake/nominator");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <LeverageWrapper>
      <ProgressBar />
      <Step2
        input={stakingInfo.principal}
        maxLeverage={maxLeverage}
        setMaxLeverage={setMaxLeverage}
        ratio={ratio}
        setRatio={setRatio}
      />
      <BoderLine />
      <Step3 input={stakingInfo.principal} ratio={ratio} />
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
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  width: 100%;
  height: 100%;

  padding: 1rem 0;
`;

const FooterWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const LeverageBottomTextBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;

  margin-bottom: 0.9rem;

  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};

  text-align: center;
`;

const BoderLine = styled.div`
  width: 100%;
  height: 0.6rem;
  margin: 2.6rem 0;

  background-color: #f1f4f4;
`;
