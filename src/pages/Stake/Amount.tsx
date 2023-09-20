import { styled } from "styled-components";
import ProgressBar from "../../components/common/ProgressBar";
import Step from "../../components/lerverage/common/Step";
import Title from "../../components/lerverage/common/Title";
import useTonConnect from "../../hooks/useTonConnect";
import { numberCutter } from "../../utils/numberCutter";
import LeverageInput from "../../components/lerverage/Step1/LeverageInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IcError from "../../assets/icons/ic_error.svg";
import { useRecoilState } from "recoil";
import { stakingAtom } from "../../lib/atom/staking";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

const Amount = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [stakingInfo, setStakingInfo] = useRecoilState(stakingAtom);

  const { address, balance } = useTonConnect();
  const navigate = useNavigate();

  const handleMoveNominator = () => {
    if (Number(input) < 0.5) {
      setError(true);
      return;
    }
    setStakingInfo((prev) => ({
      ...prev,
      address: address,
      principal: input,
    }));
    navigate("/stake/nominator");
  };

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
    ${({ theme }) => theme.fonts.Telegram_Caption_3};
  }
`;