import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import useTonConnect from "../../../hooks/contract/useTonConnect";
import { stakingAtom } from "../../../lib/atom/staking";
import { numberCutter } from "../../../utils/numberCutter";

interface StepProps {
  title: string;
  step?: string;
  type?: string;
}

const Step = (props: StepProps) => {
  const { title, step, type } = props;
  const { principal, nominator } = useRecoilValue(stakingAtom);

  return (
    <StepWrapper step={step}>
      <StepNumber>{title}</StepNumber>
      {type === "nominator" ? (
        <StepNumber>
          Stake amount {numberCutter(Number(principal))} TON
        </StepNumber>
      ) : (
        type === "leverage" && (
          <StepNumber>
            {numberCutter(Number(principal))} TON / {nominator}
          </StepNumber>
        )
      )}
    </StepWrapper>
  );
};

export default Step;

const StepWrapper = styled.div<{ step?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 2rem;
`;

const StepNumber = styled.div`
  padding: 0.7rem 1.2rem;

  border: 0.1rem solid #d0d0e2;
  border-radius: 2rem;
  color: #333;
  font-family: Montserrat;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4rem; /* 127.273% */
  letter-spacing: 0.0066rem;
`;

const StepAmount = styled.div``;
