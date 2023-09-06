import { styled } from "styled-components";
import Step from "../components/lerverage/common/Step";
import Title from "../components/lerverage/common/Title";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NominatorItem from "../components/lerverage/Nominator/NominatorItem";
import { NOMINATOR_LIST } from "../constants/Nominator";
import { useRecoilState } from "recoil";
import { nominatorAtom } from "../lib/atom/nominator";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

const tele = (window as any).Telegram.WebApp;

const NominatorList = () => {
  const [isSelectNominator, setIsSelectNominator] = useState([false, false]);
  const [nominatorName, setNominatorName] = useRecoilState(nominatorAtom);
  const navigate = useNavigate();

  const handleSelectNominator = (index: number) => {
    if (index === 0) {
      setIsSelectNominator([!isSelectNominator[0], false]);
    } else {
      setIsSelectNominator([false, !isSelectNominator[1]]);
    }
  };

  const handleConfirmNominator = () => {
    if (isSelectNominator[0]) {
      setNominatorName(NOMINATOR_LIST[0].title);
      navigate("/leverage");
    } else if (isSelectNominator[1]) {
      setNominatorName(NOMINATOR_LIST[1].title);
      navigate("/leverage");
    } else {
      setNominatorName("");
      navigate("/leverage");
    }
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/leverage");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  useEffect(() => {
    if (nominatorName === "") return;
    if (nominatorName === NOMINATOR_LIST[0].title) {
      setIsSelectNominator([true, false]);
    } else {
      setIsSelectNominator([false, true]);
    }
  }, [nominatorName]);

  return (
    <NominatorListWrapper>
      <Step title="Step 2" />
      <Title title="Select Nominator Pool" />
      <NominatorDesc>Which pool would you stake?</NominatorDesc>
      <NominatorItemList>
        {NOMINATOR_LIST.map((item, index) => (
          <NominatorItem
            key={index}
            index={index}
            title={item.title}
            totalStake={item.totalStake}
            ValidatorStake={item.ValidatorStake}
            NominatorStake={item.NominatorStake}
            type={item.type}
            check={item.check}
            isSelectNominator={isSelectNominator}
            handleSelectNominator={handleSelectNominator}
          />
        ))}
      </NominatorItemList>
      <MainButton text="Confirm" onClick={handleConfirmNominator} />
    </NominatorListWrapper>
  );
};

export default NominatorList;

const NominatorListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2.9rem 1.4rem 2.9rem 1.4rem;
`;

const NominatorDesc = styled.span`
  margin-top: 0.6rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;

const NominatorItemList = styled.div`
  width: 100%;
  margin-top: 3.3rem;
`;
