import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { getTelegramId } from "../../api/getTelegramId";
import FooterButton from "../../components/common/FooterButton";
import ProgressBar from "../../components/stake/common/ProgressBar";
import Step2 from "../../components/stake/LeverageLockUp/Leverage";
import Step3 from "../../components/stake/LeverageLockUp/Lockup";
import useTonConnect from "../../hooks/contract/useTonConnect";
import { stakingAtom } from "../../lib/atom/staking";
import { telegramAtom } from "../../lib/atom/telegram";
import { getLockUpDate } from "../../utils/getLockupDate";
import { isDevMode } from "../../utils/isDevMode";

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
      <div style={{ width: "100%", padding: "0 2rem" }}>
        <ProgressBar />
      </div>
      <Step2
        input={stakingInfo.principal}
        maxLeverage={maxLeverage}
        setMaxLeverage={setMaxLeverage}
        ratio={ratio}
        setRatio={setRatio}
      />
      <BorderLine />
      <Step3 input={stakingInfo.principal} ratio={ratio} />
      <LeverageBottomTextBox>
        The NFT will contain this information
      </LeverageBottomTextBox>

      {!isDevMode ? (
        <MainButton text="Confirm" onClick={handleMovePreview} />
      ) : (
        /* Used for testing */
        <FooterWrapper>
          <FooterButton
            title="Confirm"
            ratio={ratio}
            onClick={handleMovePreview}
          />
        </FooterWrapper>
      )}
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

const BorderLine = styled.div`
  width: 100%;
  height: 0.6rem;
  margin: 2.6rem 0;

  background-color: #f1f4f4;
`;
