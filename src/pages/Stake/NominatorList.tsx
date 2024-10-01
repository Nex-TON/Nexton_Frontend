import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import ProgressBar from "@/components/stake/common/ProgressBar";
import Step from "@/components/stake/common/Step";
import Title from "@/components/stake/common/Title";
import { ConfirmNominatorModal } from "@/components/stake/Nominator/ConfirmNominatorModal";
import NominatorItem from "@/components/stake/Nominator/NominatorItem";
import { useNominatorList } from "@/hooks/api/useNominatorList";
import { stakingAtom } from "@/lib/atom/staking";
import { telegramAtom } from "@/lib/atom/telegram";
import { isDevMode } from "@/utils/isDevMode";

import { useSelectNominator } from "./hooks/useSelectNominator";

const tele = (window as any).Telegram.WebApp;

const NominatorList = () => {
  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const { data: nominatorListData } = useNominatorList(String(telegramId));

  const [confirmModal, setConfirmModal] = useState(false);

  const { selectedNominator, handleSelectNominator } = useSelectNominator(nominatorListData);

  const [, setStakingInfo] = useRecoilState(stakingAtom);

  const navigate = useNavigate();

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

  const toggleModal = () => {
    if (selectedNominator) {
      setConfirmModal(prev => !prev);
    }
  };

  // * temp hardcoded (No info from BE)
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
        {/* Search field is disabled for now */}
        {/* <NominatorSearch onSubmit={handleSearchNominatorPool}>
          <NominatorInput
            type="text"
            placeholder="Which pool would you stake?"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <img src={IcSearch} alt="search" />
        </NominatorSearch> */}
      </NominatorListWrapper>
      <NominatorItemList>
        {nominatorListData && (
          <>
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

            {nominatorListData.some(item => item.type === "bot") && <TitleH3>Bot</TitleH3>}
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

const NominatorSearch = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 1.8rem;

  border-bottom: 0.1rem solid #e1e4e6;
`;

const NominatorInput = styled.input`
  width: 80%;
  padding-bottom: 0.8rem;

  border: none;
  color: #333;
  font-family: Montserrat;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem; /* 138.462% */
  letter-spacing: -0.024rem;

  outline: none;

  &::placeholder {
    color: #333;
  }

  &:focus {
    &::placeholder {
      color: transparent;
    }
  }
`;

const NominatorItemList = styled.div`
  width: 100%;
  margin-top: 3.3rem;
  padding: 0 2rem 1.4rem 2rem;

  background-color: #f2f2f7;
`;

const TitleH3 = styled.h3`
  padding: 1.4rem 0;

  ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
`;
