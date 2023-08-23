import styled from "styled-components";
import Input from "../../common/Input";
import Max from "../../common/Max";

interface LeverageInputProps {
  input: string;
  setInput: (input: string) => void;
}

const LeverageInput = (props: LeverageInputProps) => {
  const { input, setInput } = props;

  return (
    <LeverageInputWrapper>
      <Input input={input} setInput={setInput} />
      <RightSection>
        <Max setInput={setInput} />
        <TokenText>TON</TokenText>
      </RightSection>
    </LeverageInputWrapper>
  );
};

export default LeverageInput;

const LeverageInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  margin-top: 3rem;
  padding: 1.9rem 1.4rem 1.6rem 2.3rem;

  border-radius: 1rem;
  background-color: #fff;
`;

const RightSection = styled.div``;

const TokenText = styled.span`
  margin-left: 0.7rem;

  color: #0b0b0b;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
