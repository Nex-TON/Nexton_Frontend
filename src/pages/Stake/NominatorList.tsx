import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import IcSearch from "@/assets/icons/Stake/ic_search.svg";
import ProgressBar from "@/components/stake/common/ProgressBar";
import Step from "@/components/stake/common/Step";
import Title from "@/components/stake/common/Title";
import { ConfirmNominatorModal } from "@/components/stake/Nominator/ConfirmNominatorModal";
import NominatorItem from "@/components/stake/Nominator/NominatorItem";
import { stakingAtom } from "@/lib/atom/staking";
import { isDevMode } from "@/utils/isDevMode";

import { useSearchNominatorPool } from "./hooks/useSearchNominatorPoo";
import { useSelectNominator } from "./hooks/useSelectNominator";

const tele = (window as any).Telegram.WebApp;

const NominatorList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [modal, setModal] = useState(false);

  const { selectedNominator, handleSelectNominator } = useSelectNominator();
  const { searchNominator, handleSearchNominatorPool } = useSearchNominatorPool(searchInput);

  const [, setStakingInfo] = useRecoilState(stakingAtom);

  const navigate = useNavigate();

  const handleConfirmNominator = () => {
    if (selectedNominator) {
      setStakingInfo(prev => ({
        ...prev,
        nominator: selectedNominator.title,
      }));
      navigate("/stake/leverage");
    }
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/stake/amount");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  const toggleModal = () => {
    setModal(prev => !prev);
  };

  return (
    <>
      {modal && (
        <ConfirmNominatorModal
          toggleModal={toggleModal}
          onConfirm={toggleModal}
          name={selectedNominator.title}
          description={selectedNominator.description}
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
        {searchNominator.map((item, index) => (
          <Fragment key={item.id}>
            {/* // todo: remove hardcoded labels, once API is ready*/}
            {item.type === "pool" && index === 0 && <TitleH3>Pool</TitleH3>}
            {item.type === "bot" && index === 2 && <TitleH3>Bot</TitleH3>}

            <NominatorItem
              id={item.id}
              title={item.title}
              apy={item.apy}
              totalStake={item.totalStake}
              pool={item.pool}
              profit={item.profit}
              check={item.check}
              selectedNominator={selectedNominator}
              handleSelectNominator={handleSelectNominator}
              tag={item.tag}
              description={item.description}
              toggleModal={toggleModal}
            />
          </Fragment>
        ))}
      </NominatorItemList>

      {!isDevMode ? (
        <MainButton text="NEXT" onClick={handleConfirmNominator} />
      ) : (
        /* Used for testing */
        <button onClick={handleConfirmNominator}>Confirm</button>
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
