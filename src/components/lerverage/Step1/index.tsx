import styled from "styled-components";
import Step from "../common/Step";
import Title from "../common/Title";
import LeverageInput from "./LeverageInput";
import useTonConnect from "../../../hooks/useTonConnect";
import { numberCutter } from "../../../utils/numberCutter";
import IcError from "../../../assets/icons/ic_error.svg";
import ProgressBar from "../../common/ProgressBar";

interface Step1Props {
  input: string;
  error: boolean;
  amountError: boolean;
  step1Ref: any;
  setInput: (input: string) => void;
}

const Step1 = (props: Step1Props) => {
  const { input, error, amountError, step1Ref, setInput } = props;
  const { balance } = useTonConnect();

  return (
    <Step1Wrapper ref={step1Ref}>
      <ProgressBar />
      <Step title="Step 1" />
      <Title title="Put stake amount" />
      <BalanceWrapper>
        <BalanceText>
          Balance : {balance > 0 ? numberCutter(balance) : `-.---`}
        </BalanceText>
      </BalanceWrapper>
      <LeverageInput
        input={input}
        setInput={setInput}
        error={error || amountError}
      />
      {error && (
        <ErrorBlock>
          <img src={IcError} alt="error" />
          <span>Please enter amount</span>
        </ErrorBlock>
      )}
      {amountError && (
        <ErrorBlock>
          <img src={IcError} alt="error" />
          <span>Please stake more than 0.5 TON</span>
        </ErrorBlock>
      )}
    </Step1Wrapper>
  );
};

export default Step1;

const Step1Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 0 2rem;
`;

const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  margin-top: 2.6rem;
`;

const BalanceText = styled.span`
  color: #333;
  font-family: Montserrat;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem; /* 138.462% */
  letter-spacing: -0.024rem;
`;

const ErrorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 85%;
  padding-left: 2.3rem;
  margin-top: 1rem;

  span {
    color: #ff7979;
    ${({ theme }) => theme.fonts.Telegram_Caption_3};
  }
`;
