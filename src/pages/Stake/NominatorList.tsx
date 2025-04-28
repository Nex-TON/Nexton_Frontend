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
import IcWarning from "@/assets/icons/Stake/ic_warning_black.svg";
import { useTokenRate } from "@/hooks/api/loan/useTokenRate";

import { useSelectNominator } from "./hooks/useSelectNominator";
import { ListItemSecondaryAction } from "@mui/material";

const tele = (window as any).Telegram.WebApp;

const NominatorList = () => {
  const navigate = useNavigate();

  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const [stakingInfo, setStakingInfo] = useRecoilState(stakingAtom);
  //const [stakingInfo] = useRecoilState(stakingAtom);
  const { data: tokenRate } = useTokenRate();
  const setError = useSetRecoilState(globalError);
  const [confirmModal, setConfirmModal] = useState(false);

  const { data: nominatorListData, isLoading, error } = useNominatorList(String(telegramId));

  const { selectedNominator, handleSelectNominator } = useSelectNominator(nominatorListData);
  const [minimumTonModal, setMinimumTonModal] = useState(false);

  useEffect(() => {
    //console.log("NominatorList",nominatorListData)
    //console.log("principal",Number(stakingInfo.principal))

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
    if (selectedNominator){
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
  const handleConfirmClick = () =>{
    if (selectedNominator?.name === "Evaa Pool" && Number(stakingInfo.principal) < 2){
      setMinimumTonModal(true);
      return;
    }else{
      handleConfirmNominator();
    }
  }

  // * temp. hardcoded (No info from BE -> will be redesigned soon)
  const description =
    selectedNominator?.name === "Bemo pool"
      ? "you will receive an NFT through the Arbitrage Bot."
      : selectedNominator?.name === "Arbitrage Bot 1"
        ? "Arbitrage trading may result in losses due to execution delays, price slippage, fees, and market volatility."
        : selectedNominator?.name === "Arbitrage Bot"
          ? "Centralized exchanges may have security and operational risks."
          : selectedNominator?.name === "Evaa pool"
          ? "you will receive an NFT through the Arbitrage Bot."
          : null;

  const name = (selectedNominator?.name === "Arbitrage Bot" || selectedNominator?.name === "Arbitrage Bot 3") ? "CEX-DEX" : (selectedNominator?.name === "Arbitrage Bot 1" || selectedNominator?.name === "Arbitrage Bot 2") ? "DEX-DEX" : selectedNominator?.name;

  return (
    <>
      {confirmModal && (
        <ConfirmNominatorModal
          toggleModal={toggleModal}
          onConfirm={handleConfirmClick}
          name={name}
          description={description}
          isMinimumTonModal = {minimumTonModal}
        />
      )}


      <NominatorListWrapper>
        <ProgressBar />
        <Step title="Step 2" type="nominator" />
        <Title title="Select Your Strategy" />
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
                    <TitleH3>Strategy</TitleH3>
                    <DashboardLink onClick={() => navigate("/dashboard")} id="nominator list dashboard button">
                      Go to Dashboard <img src={IcArrorRight} alt="arrow_right" />
                    </DashboardLink>
                  </BotTitleWrapper>
                )}
                {nominatorListData
                  .filter(item => item.type === "bot" && (item.name === "Arbitrage Bot 1" || item.name === "Arbitrage Bot"))
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

                {nominatorListData.some(item => item.type === "pool" && (stakingInfo.tokenSort === "TON" || stakingInfo.tokenSort === "USDT")) && <PoolTitle>Pool</PoolTitle>}
                {nominatorListData
                  .filter(item => item.type === "pool" && item.name === "Evaa Pool" && stakingInfo.tokenSort !== "nxTON")
                  .map(item => {
                    //console.log("usdtTonRate", tokenRate?.tonUsdtRate)
                    //console.log("tokenSort", stakingInfo.tokenSort)
                    const tvl = (stakingInfo.tokenSort === "USDT" && tokenRate?.tonUsdtRate) ?  item.tvl/tokenRate?.tonUsdtRate : item.tvl
                    return(
                      <Fragment key={item.id}>
                        <NominatorItem
                          id={item.id}
                          title={item.name}
                          apy={item.apy}
                          profitShare={item.profitShare}
                          tvl={tvl}
                          disabled={item.disabled}
                          selectedNominator={selectedNominator}
                          handleSelectNominator={handleSelectNominator}
                        />
                      </Fragment>
                    )
                  } )}
                {nominatorListData
                  .filter(item => item.type === "pool" && item.name === "Bemo Pool" && stakingInfo.tokenSort === "TON")
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
        <MainButton text="NEXT" onClick={toggleModal} />
      ) : (
        /* Used for testing */
        <button onClick={toggleModal}>Confirm</button>
      )}
    </>
  );
};

export default NominatorList;
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

  margin: 32.5px 0 46px 0;
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