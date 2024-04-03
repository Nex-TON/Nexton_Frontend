import { useState } from "react";
import { styled } from "styled-components";

import IcCheckGray from "../../../assets/icons/Stake/ic_check_gray.svg";
import IcCheckWhite from "../../../assets/icons/Stake/ic_check_white.svg";
import { useSelectNominator } from "../../../pages/Stake/hooks/useSelectNominator";

interface NominatorItemProps {
  title: string;
  totalStake: number;
  ValidatorStake: number;
  NominatorStake: number;
  type: string;
  check: boolean;
  index: number;
  isSelectNominator: boolean[];
  handleSelectNominator: (index: number) => void;
}

const NominatorItem = (props: NominatorItemProps) => {
  const {
    title,
    totalStake,
    ValidatorStake,
    NominatorStake,
    index,
    isSelectNominator,
    handleSelectNominator,
  } = props;
  return (
    <NominatorItemWrapper>
      <NominatorItemTop>
        <NominatorItemTopLeft>
          <LabelMedium>{title}</LabelMedium>
          <Caption3>
            Profit Share <LabelMedium>60%</LabelMedium>
          </Caption3>
        </NominatorItemTopLeft>
        <NominatorItemTopRight>
          <NominatorProfitButton profit={totalStake > 900.0 ? true : false}>
            {totalStake > 900.0 ? (
              <LabelMedium>Non-Profitable</LabelMedium>
            ) : (
              <LabelMedium>Profitable</LabelMedium>
            )}
          </NominatorProfitButton>
          <NominatorCheckButton
            onClick={() => handleSelectNominator(index)}
            check={isSelectNominator[index]}
          >
            {isSelectNominator[index] ? (
              <img src={IcCheckWhite} alt="check" />
            ) : (
              <img src={IcCheckGray} alt="check" />
            )}
          </NominatorCheckButton>
        </NominatorItemTopRight>
      </NominatorItemTop>
      <NominatorItemBottom>
        <NominatorItemBottomTextBottom>
          <Caption3>Total stake</Caption3>
          <LabelMedium>{totalStake} TON</LabelMedium>
        </NominatorItemBottomTextBottom>
        <NominatorItemBottomTextBottom>
          <Caption3>Validator stake</Caption3>
          <LabelMedium>{ValidatorStake} TON</LabelMedium>
        </NominatorItemBottomTextBottom>
        <NominatorItemBottomTextBottom>
          <Caption3>Nominator</Caption3>
          <LabelMedium>{NominatorStake} TON</LabelMedium>
        </NominatorItemBottomTextBottom>
      </NominatorItemBottom>
    </NominatorItemWrapper>
  );
};

export default NominatorItem;

const NominatorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  border-radius: 2rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.14);
  & + & {
    margin-top: 1rem;
  }
`;

const NominatorItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.6rem;

  width: 100%;
  padding: 1.8rem 2.4rem;

  border-radius: 2rem 2rem 0 0;
  background-color: #fff;
`;

const NominatorItemTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
`;

const NominatorItemTopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const NominatorProfitButton = styled.div<{ profit: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.7rem 1.2rem;

  border-radius: 2rem;
  color: ${({ profit }) => (profit ? `#e8e8ee` : `#fff`)};
  background-color: ${({ profit }) => (profit ? `#3e404c` : `#0088cc`)};
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;

const NominatorCheckButton = styled.button<{ check: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;

  border: none;
  border-radius: 50%;
  background-color: ${({ check }) => (check ? `#2f3038` : `#e5e5ea`)};

  outline: none;
  cursor: pointer;
`;
const NominatorItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem 2.4rem;

  border-radius: 0 0 2rem 2rem;
  background-color: #fff;
`;

const NominatorItemBottomTextBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
`;

const Caption3 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const LabelMedium = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;
