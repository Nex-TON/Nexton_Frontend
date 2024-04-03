import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import IcError from "../../assets/icons/Stake/ic_error.svg";
import LeverageInput from "../../components/stake/Amount/LeverageInput";
import ProgressBar from "../../components/stake/common/ProgressBar";
import Step from "../../components/stake/common/Step";
import Title from "../../components/stake/common/Title";
import { ERROR } from "../../constants/error";
import useTonConnect from "../../hooks/contract/useTonConnect";
import { stakingAtom } from "../../lib/atom/staking";
import { isDevMode } from "../../utils/isDevMode";
import { numberCutter } from "../../utils/numberCutter";

const tele = (window as any).Telegram.WebApp;

const Amount = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState([false, false, false]);
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const { connected } = useTonConnect();

  const { address, balance } = useTonConnect();
  const navigate = useNavigate();

  const handleMoveNominator = () => {
    if (input === "") {
      setError([true, false, false]);
    }
    if (input !== "" && Number(input) >= 0.5) {
      setError([false, false, false]);
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
    if (!connected) {
      setError([false, false, true]);
    } else {
      if (input !== "" && Number(input) < 0.5) {
        setError([false, true, false]);
      } else {
        setError([false, false, false]);
      }
    }
  }, [input, connected]);

  return (
    <AmountWrapper>
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
        error={error.includes(true)}
        disableInput={error[2]}
      />
      {error.includes(true) && (
        <ErrorBlock>
          <img src={IcError} alt="error" />
          <span>{ERROR[error.indexOf(true)]}</span>
        </ErrorBlock>
      )}

      {!isDevMode ? (
        <MainButton text="NEXT" onClick={handleMoveNominator} />
      ) : (
        /* Used for testing */
        <button onClick={handleMoveNominator}>next</button>
      )}
    </AmountWrapper>
  );
};

export default Amount;

const AmountWrapper = styled.div`
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
