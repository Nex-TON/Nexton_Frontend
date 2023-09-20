import styled from "styled-components";
import Input from "../../common/Input";
import Max from "../../common/Max";

interface LeverageInputProps {
  input: string;
  error: boolean;
  setInput: (input: string) => void;
}

const LeverageInput = (props: LeverageInputProps) => {
  const { input, error, setInput } = props;

  return (
    <LeverageInputWrapper error={error}>
      <Input input={input} setInput={setInput} />
      <RightSection>
        <Max setInput={setInput} />
        <TokenText>TON</TokenText>
      </RightSection>
    </LeverageInputWrapper>
  );
};

export default LeverageInput;

const LeverageInputWrapper = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 1.4rem;
  padding: 1.7rem 2.05rem 1.8rem 2rem;

  border: ${({ error }) => error && `0.1rem solid #FF7979`};
  border-radius: 2rem;
  background-color: #f9f9ff;
`;

const RightSection = styled.div``;

const TokenText = styled.span`
  margin-left: 0.7rem;

  color: #0b0b0b;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
