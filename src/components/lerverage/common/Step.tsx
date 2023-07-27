import styled, { css } from "styled-components";

interface StepProps {
  title: string;
  step?: string;
}

const Step = (props: StepProps) => {
  const { title, step } = props;
  return <StepWrapper step={step}>{title}</StepWrapper>;
};

export default Step;

const StepWrapper = styled.button<{ step?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 1.6rem;
  padding: 0.6rem 1.6rem;

  border: none;
  border-radius: 2rem;
  background-color: #007aff;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 590;
  line-height: 1.3rem; /* 118.182% */
  letter-spacing: 0.0066rem;

  cursor: pointer;
  outline: none;

  ${({ step }) =>
    step === "Step3" &&
    css`
      margin-bottom: 2.4rem;
    `}
`;
