import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import Loader from "@/components/common/Loader";
import ProgressBar from "@/components/stake/common/ProgressBar";
import { ConfirmNominatorModal } from "@/components/stake/Nominator/ConfirmNominatorModal";
import IcRight from "@/assets/icons/Stake/ic_arrow_right_black.svg"
import { useNominatorList } from "@/hooks/api/useNominatorList";
import { globalError } from "@/lib/atom/globalError";
import { stakingAtom } from "@/lib/atom/staking";
import { telegramAtom } from "@/lib/atom/telegram";
import { isDevMode } from "@/utils/isDevMode";
import IcWarning from "@/assets/icons/Stake/ic_warning_black.svg";

import { useSelectNominator } from "./hooks/useSelectNominator";
import NominatorItem from "@/components/stake/Nominator/NominatorItem";
import { nominatorAtom } from "@/lib/nominator";

const tele = (window as any).Telegram.WebApp;

const MyStrategy = () => {
  const navigate = useNavigate();

  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const [stakingInfo, setStakingInfo] = useRecoilState(stakingAtom);
  const setError = useSetRecoilState(globalError);
  const [confirmModal, setConfirmModal] = useState(false);

  const { data: nominatorListData, isLoading, error } = useNominatorList(String(telegramId));

  const { selectedNominator, handleSelectNominator } = useSelectNominator(nominatorListData);
  const [minimumTonModal, setMinimumTonModal] = useState(false);
  const [nominatorInfo, setNominatorInfo] = useRecoilState(nominatorAtom);
  const [selectedBot, setSelectedBot] = useState<(typeof nominatorListData)[number] | undefined>(undefined);

  useEffect(() => {
    let bot = nominatorInfo.name
      ? nominatorListData?.find(item => item.name === nominatorInfo.name)
      : nominatorListData?.find(item => item.name === "Arbitrage Bot");

    setSelectedBot(bot);

    if (bot?.id) {
      handleSelectNominator(bot.id);
    }
  }, [nominatorInfo, nominatorListData]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.enableClosingConfirmation();
      tele.onEvent("backButtonClicked", () => {
        navigate("/stake/amount");
      });
    }

    const tgId = tele?.initDataUnsafe?.user?.id;
    if (tgId) {
      setTelegramId(tgId);
    } else {
      // Edge case: when user is using Nexton app outside of Telegram
      setTelegramId(0);
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  const handleConfirmNominator = () => {
    if (selectedNominator) {
      setStakingInfo(prev => ({
        ...prev,
        nominator: selectedNominator.name,
        telegramId,
      }));
      navigate("/stake/preview");
    }
  };

  const toggleModal = () => {
    if (selectedNominator) {
      //setConfirmModal(true);
      setMinimumTonModal(false);
      setConfirmModal(prev => !prev);
    }
  };

  // const handleCloseModal = () =>{
  //   setConfirmModal(false);
  //   setMinimumTonModal(false);
  // }

  //만약 100톤 이하면 minimumTonModal 뜨도록
  const handleConfirmClick = () => {
    if (
      selectedNominator.name === "Evaa Pool" &&
      stakingInfo.tokenSort === "TON" &&
      Number(stakingInfo.principal) < 100
    ) {
      setMinimumTonModal(true);
      return;
    } else if (
      selectedNominator?.name === "Evaa Pool" &&
      stakingInfo.tokenSort === "USDT" &&
      Number(stakingInfo.principal) < 100
    ) {
      setMinimumTonModal(true);
      return;
    } else {
      setMinimumTonModal(false);
      handleConfirmNominator();
    }
  };

  // * temp. hardcoded (No info from BE -> will be redesigned soon)
  const description =
    selectedNominator?.name === "Bemo pool"
      ? "you will receive an NFT through the Arbitrage Bot."
      : selectedNominator?.name === "Arbitrage Bot 1" || selectedNominator?.name === "Arbitrage Bot 3"
        ? "Arbitrage trading may result in losses due to execution delays, price slippage, fees, and market volatility."
        : selectedNominator?.name === "Arbitrage Bot" || selectedNominator?.name === "Arbitrage Bot 2"
          ? "Centralized exchanges may have security and operational risks."
          : selectedNominator?.name === "Evaa pool"
            ? "you will receive an NFT through the Arbitrage Bot."
            : null;

  const name =
    selectedNominator?.name === "Arbitrage Bot" || selectedNominator?.name === "Arbitrage Bot 2"
      ? "CEX-DEX"
      : selectedNominator?.name === "Arbitrage Bot 1" || selectedNominator?.name === "Arbitrage Bot 3"
        ? "DEX-DEX"
        : selectedNominator?.name;

  return (
    <>
      {confirmModal && (
        <ConfirmNominatorModal
          toggleModal={toggleModal}
          onConfirm={handleConfirmClick}
          name={name}
          description={description}
          isMinimumTonModal={minimumTonModal}
          tokenSort={stakingInfo.tokenSort}
        />
      )}

      <NominatorListWrapper>
        <ProgressBar />
        <Title>Your Strategy</Title>
      </NominatorListWrapper>
      <NominatorItemList>
        {isLoading ? (
          <LoaderWrapper>
            <Loader height={40} width={40} />
          </LoaderWrapper>
        ) : (
          <NominatorItem
            id={selectedBot?.id}
            title={selectedBot?.name}
            apy={selectedBot?.apy}
            profitShare={selectedBot?.profitShare}
            tvl={selectedBot?.tvl}
            disabled={selectedBot?.disabled}
            selectedNominator={selectedBot}
            handleSelectNominator={handleSelectNominator}
            mystrategy={true}
          />
        )}
        <NominatorRouter onClick={() => navigate("/stake/nominator")}>
          Choose Other Strategies <img src={IcRight} alt="right arrow" />
        </NominatorRouter>
        <WarningWrapper>
          <WarningHeader>
            <img src={IcWarning} />
            Please be cautious before investing!
          </WarningHeader>
          <WarningLetter>
            Centralized exchanges may have security and operational risks. Additionally, due to the nature of arbitrage
            trading, there is a possibility of negative returns depending on market conditions and execution delays.
          </WarningLetter>
        </WarningWrapper>
      </NominatorItemList>

      {!isDevMode ? (
        <MainButton text="Staking Now" onClick={toggleModal} />
      ) : (
        /* Used for testing */
        <button onClick={toggleModal}>Staking Now</button>
      )}
    </>
  );
};

export default MyStrategy;

const NominatorRouter = styled.div`
  margin-top: 4.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3}
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--Neutral-variant-Neutral-variant-30, #333);
  text-align: center;
  font-family: "Montserrat";
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 22px */
  letter-spacing: -0.44px;
`;
const WarningLetter = styled.div`
  color: var(--Neutral-Neutural-50, #76797a);
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.46px;
`;

const WarningHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
  color: var(--Neutral-Neutural-0, #000);
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 16.9px */
  letter-spacing: -0.46px;
`;

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 6.2rem 0 46px 0;
`;

const NominatorListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 0 2rem;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

const NominatorItemList = styled.div`
  width: 100%;
  margin-top: 3.3rem;
  padding: 2rem 2rem 1.4rem 2rem;
`;

const TitleH3 = styled.h3`
  padding: 1.4rem 0;
  color: #333;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 120% */
  letter-spacing: -0.46px;
`;

const PoolTitle = styled(TitleH3)`
  margin-top: 4rem;
`;

const BotTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DashboardLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  cursor: pointer;
  color: #76797a;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 184.615% */
  letter-spacing: -0.46px;
`;
