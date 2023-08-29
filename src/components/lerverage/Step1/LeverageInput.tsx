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
  padding: 1.7rem 2.05rem 1.8rem 2rem;

  border-radius: 4rem;
  background-color: #fff;
`;

const RightSection = styled.div``;

const TokenText = styled.span`
  margin-left: 0.7rem;

  color: #0b0b0b;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
