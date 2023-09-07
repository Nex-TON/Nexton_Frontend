import { styled } from "styled-components";
import Step from "../common/Step";
import Title from "../common/Title";
import IcSelectArrow from "../../../assets/icons/Nominator/ic_select_arrow.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nominatorAtom } from "../../../lib/atom/nominator";
import IcError from "../../../assets/icons/ic_error.svg";
interface NominatorProps {
  step2Ref: any;
  nominatorError: boolean;
}

const Nominator = (props: NominatorProps) => {
  const { step2Ref, nominatorError } = props;

  const nominatorName = useRecoilValue(nominatorAtom);
  const navigate = useNavigate();

  return (
    <NominatorWrapper ref={step2Ref}>
      <Step title="Step 2" />
      <Title title="Select Nominator Pool" />
      <NominatorDesc>Which pool would you stake?</NominatorDesc>
      <NominatorInputBox>
        <NominatorInput type={nominatorName !== "" ? true : false}>
          {nominatorName !== "" ? `${nominatorName}` : `Pool`}
        </NominatorInput>
        <NominatorInputButton
          type={nominatorName !== ""}
          onClick={() => navigate("/leverage/nominator")}
        >
          {nominatorName === "" && <span>Select</span>}
          <img src={IcSelectArrow} alt="arrow" />
        </NominatorInputButton>
      </NominatorInputBox>
      {nominatorError && (
        <ErrorBlock>
          <img src={IcError} alt="error" />
          Please select a pool
        </ErrorBlock>
      )}
    </NominatorWrapper>
  );
};

export default Nominator;

const NominatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const NominatorDesc = styled.span`
  margin-top: 0.6rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;

const NominatorInputBox = styled.div`
  display: flex;
  align-items: center;

  width: 90%;
  margin-top: 2.6rem;
  padding: 1.5rem 1.5rem 1.5rem 2.3rem;

  border-radius: 4rem;
  background-color: #fff;
`;

const NominatorInput = styled.span<{ type: boolean }>`
  width: 90%;

  color: ${({ type }) => (type ? `#303234` : `#e5e5ea`)};
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const NominatorInputButton = styled.button<{ type: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: ${({ type }) => type && `3.5rem`};
  height: ${({ type }) => type && `3.5rem`};
  padding: 0.7rem 1.2rem;

  border: none;
  border-radius: ${({ type }) => (type ? `50%` : `2rem`)};
  background-color: #33343e;

  outline: none;
  cursor: pointer;

  span {
    color: #e8e8ee;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
`;

const ErrorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 85%;
  padding-left: 2.3rem;
  margin-top: 1rem;

  color: #ff7979;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;
