import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import IcArrorRight from "@/assets/icons/Stake/ic_arrow_right.svg";
import Loader from "@/components/common/Loader";
import ProgressBar from "@/components/stake/common/ProgressBar";
import Step from "@/components/stake/common/Step";
import Title from "@/components/stake/common/Title";
import { ConfirmNominatorModal } from "@/components/stake/Nominator/ConfirmNominatorModal";
import NominatorItem from "@/components/stake/Nominator/NominatorItem";
import { useNominatorList } from "@/hooks/api/useNominatorList";
import { globalError } from "@/lib/atom/globalError";
import { stakingAtom } from "@/lib/atom/staking";
import { telegramAtom } from "@/lib/atom/telegram";
import { isDevMode } from "@/utils/isDevMode";

import { useSelectNominator } from "./hooks/useSelectNominator";

const tele = (window as any).Telegram.WebApp;

const NominatorList = () => {
  const navigate = useNavigate();

  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const setError = useSetRecoilState(globalError);
  const [confirmModal, setConfirmModal] = useState(false);

  const { data: nominatorListData, isLoading, error } = useNominatorList(String(telegramId));

  const { selectedNominator, handleSelectNominator } = useSelectNominator(nominatorListData);

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
      navigate("/stake/leverage");
    }
  };

  const toggleModal = () => {
    if (selectedNominator) {
      setConfirmModal(prev => !prev);
    }
  };

  // * temp. hardcoded (No info from BE -> will be redesigned soon)
  const description =
    selectedNominator?.name === "Bemo pool"
      ? "you will receive an NFT through the Arbitrage Bot."
      : selectedNominator?.name === "Arbitrage Bot"
        ? "you can directly invest in the Arbitrage Bot."
        : selectedNominator?.name === "Nominator Pool"
          ? "you will receive an NFT through the Arbitrage Bot."
          : null;

  return (
    <>
      {confirmModal && (
        <ConfirmNominatorModal
          toggleModal={toggleModal}
          onConfirm={handleConfirmNominator}
          name={selectedNominator.name}
          description={description}
        />
      )}

      <NominatorListWrapper>
        <ProgressBar />
        <Step title="Step 2" type="nominator" />
        <Title title="Select Your Pool or Bot" />
      </NominatorListWrapper>
      <NominatorItemList>
        {isLoading ? (
          <LoaderWrapper>
            <Loader height={40} width={40} />
          </LoaderWrapper>
        ) : (
          <>
            {nominatorListData && (
              <>
                {nominatorListData.some(item => item.type === "bot") && (
                  <BotTitleWrapper>
                    <TitleH3>Bot</TitleH3>
                    <DashboardLink onClick={() => navigate("/dashboard")} id="nominator list dashboard button">
                      Go to Dashboard <img src={IcArrorRight} alt="arrow_right" />
                    </DashboardLink>
                  </BotTitleWrapper>
                )}
                {nominatorListData
                  .filter(item => item.type === "bot")
                  .map(item => (
                    <Fragment key={item.id}>
                      <NominatorItem
                        id={item.id}
                        title={item.name}
                        apy={item.apy}
                        profitShare={item.profitShare}
                        tvl={item.tvl}
                        disabled={item.disabled}
                        selectedNominator={selectedNominator}
                        handleSelectNominator={handleSelectNominator}
                      />
                    </Fragment>
                  ))}

                {nominatorListData.some(item => item.type === "pool") && <TitleH3>Pool</TitleH3>}
                {nominatorListData
                  .filter(item => item.type === "pool")
                  .map(item => (
                    <Fragment key={item.id}>
                      <NominatorItem
                        id={item.id}
                        title={item.name}
                        apy={item.apy}
                        profitShare={item.profitShare}
                        tvl={item.tvl}
                        disabled={item.disabled}
                        selectedNominator={selectedNominator}
                        handleSelectNominator={handleSelectNominator}
                      />
                    </Fragment>
                  ))}
              </>
            )}
          </>
        )}
      </NominatorItemList>

      {!isDevMode ? (
        <MainButton text="NEXT" onClick={toggleModal} />
      ) : (
        /* Used for testing */
        <button onClick={toggleModal}>Confirm</button>
      )}
    </>
  );
};

export default NominatorList;

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
  padding: 0 2rem 1.4rem 2rem;

  background-color: #f2f2f7;
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
