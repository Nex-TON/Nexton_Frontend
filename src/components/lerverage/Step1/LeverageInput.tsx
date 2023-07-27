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
  padding: 2rem 1.7rem 2rem 2.3rem;

  border-radius: 1rem;
  background-color: #f2f2f7;
`;

const RightSection = styled.div``;

const TokenText = styled.span`
  margin-left: 0.7rem;

  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.8rem; /* 128.571% */
  letter-spacing: -0.0154rem;
  color: #0b0b0b;
`;
