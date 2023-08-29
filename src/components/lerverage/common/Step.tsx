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

const StepWrapper = styled.div<{ step?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 1.2rem;
  padding: 0.7rem 1.2rem;

  border: 0.1rem solid #0088cc;
  border-radius: 2rem;
  color: #0088cc;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
`;
