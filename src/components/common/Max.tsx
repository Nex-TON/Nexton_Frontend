import styled from "styled-components";

import { numberCutter } from "@/utils/numberCutter";

interface MaxProps {
  setInput: (input: string) => void;
  balance: number;
}
const Max = (props: MaxProps) => {
  const { setInput, balance } = props;

  const handleMaxInput = () => {
    setInput(String(numberCutter(balance)));
  };

  return (
    <MaxWrapper disabled={!balance} onClick={handleMaxInput}>
      MAX
    </MaxWrapper>
  );
};

export default Max;

const MaxWrapper = styled.button`
  padding: 0.4rem 0.8rem;

  border: none;
  border-radius: 0.4rem;
  background-color: #ccf3ff;
  ${({ theme }) => theme.fonts.Telegram_Footnote};
  color: #20a9f6;

  outline: none;
  cursor: pointer;
`;
