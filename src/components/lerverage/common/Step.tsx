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

  margin-bottom: 1.2rem;
  padding: 0.6rem 1.6rem;

  border: none;
  border-radius: 2rem;
  background-color: #007aff;
  color: #ffffff;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};

  cursor: pointer;
  outline: none;
`;
