import { styled } from "styled-components";
import ProgressBar from "../../components/stake/common/ProgressBar";
import Step from "../../components/stake/common/Step";
import Title from "../../components/stake/common/Title";
import useTonConnect from "../../hooks/contract/useTonConnect";
import { numberCutter } from "../../utils/numberCutter";
import LeverageInput from "../../components/stake/Amount/LeverageInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IcError from "../../assets/icons/Stake/ic_error.svg";
import { useRecoilState } from "recoil";
import { stakingAtom } from "../../lib/atom/staking";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useCheckInputRules } from "./hooks/useCheckInputRules";

const tele = (window as any).Telegram.WebApp;

const Amount = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [, setStakingInfo] = useRecoilState(stakingAtom);

  const { isUnderLimitAmount } = useCheckInputRules(input);
  const { address, balance } = useTonConnect();
  const navigate = useNavigate();

  const handleMoveNominator = () => {
    if (input === "") {
      setError(true);
    }
    if (input !== "" && Number(input) >= 0.5) {
      setError(false);
      setStakingInfo((prev) => ({
        ...prev,
        address: address,
        principal: input,
      }));
      navigate("/stake/nominator");
    }
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  useEffect(() => {
    if (input !== "") {
      setError(false);
    }
  }, [input]);

  return (
    <AmontWrapper>
      <ProgressBar />
      <Step title="Step 1" />
      <Title title="Put stake amount" />
      <BalanceWrapper>
        <BalanceText>
          Balance : {balance > 0 ? numberCutter(balance) : `-.---`}
        </BalanceText>
      </BalanceWrapper>
      <LeverageInput input={input} setInput={setInput} error={error} />
      {error && (
        <ErrorBlock>
          <img src={IcError} alt="error" />
          <span>Please enter amount</span>
        </ErrorBlock>
      )}
      {isUnderLimitAmount && (
        <ErrorBlock>
          <img src={IcError} alt="error" />
          <span>Please stake more than 0.5 TON</span>
        </ErrorBlock>
      )}
      <MainButton text="NEXT" onClick={handleMoveNominator} />
      {/* <button onClick={handleMoveNominator}>next</button> */}
    </AmontWrapper>
  );
};

export default Amount;

const AmontWrapper = styled.div`
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
    ${({ theme }) => theme.fonts.Telegram_Caption_1};
  }
`;
