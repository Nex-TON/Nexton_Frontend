import { styled } from "styled-components";
import Step from "../../components/lerverage/common/Step";
import Title from "../../components/lerverage/common/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NominatorItem from "../../components/lerverage/Nominator/NominatorItem";
import { NOMINATOR_LIST } from "../../constants/Nominator";
import { useRecoilState } from "recoil";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import ProgressBar from "../../components/lerverage/common/ProgressBar";
import { stakingAtom } from "../../lib/atom/staking";
import IcSearch from "../../assets/icons/Stake/ic_search.svg";
import { useSearchNominatorPool } from "./hooks/useSearchNominatorPoo";
import { useSelectNominator } from "./hooks/useSelectNominator";

const tele = (window as any).Telegram.WebApp;

const NominatorList = () => {
  const [searchInput, setSearchInput] = useState("");
  const { isSelectedNominator, handleSelectNominator } = useSelectNominator();
  const { searchNominator, handleSearchNominatorPool } =
    useSearchNominatorPool(searchInput);
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const navigate = useNavigate();

  const handleConfirmNominator = () => {
    const selectedNominator = isSelectedNominator.findIndex(
      (isSelected) => isSelected
    );

    if (selectedNominator !== -1) {
      setStakingInfo((prev) => ({
        ...prev,
        nominator: NOMINATOR_LIST[selectedNominator].title,
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

  return (
    <>
      <NominatorListWrapper>
        <ProgressBar />
        <Step title="Step 2" type="nominator" />
        <Title title="Select Nominator Pool" />
        <NominatorSearch onSubmit={handleSearchNominatorPool}>
          <NominatorInput
            type="text"
            placeholder="Which pool would you stake?"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <img src={IcSearch} alt="search" />
        </NominatorSearch>
      </NominatorListWrapper>
      <NominatorItemList>
        {searchNominator.map((item, index) => (
          <NominatorItem
            key={index}
            index={index}
            title={item.title}
            totalStake={item.totalStake}
            ValidatorStake={item.ValidatorStake}
            NominatorStake={item.NominatorStake}
            type={item.type}
            check={item.check}
            isSelectNominator={isSelectedNominator}
            handleSelectNominator={handleSelectNominator}
          />
        ))}
      </NominatorItemList>
      {/* <button onClick={handleConfirmNominator}>Confirm</button> */}
      <MainButton text="NEXT" onClick={handleConfirmNominator} />
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
  height: 80%;
  margin-top: 3.3rem;
  padding: 1.4rem 2rem;

  background-color: #f2f2f7;
`;
