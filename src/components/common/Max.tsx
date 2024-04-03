import styled from "styled-components";

import useTonConnect from "../../hooks/contract/useTonConnect";
import { numberCutter } from "../../utils/numberCutter";

interface MaxProps {
  setInput: (input: string) => void;
}
const Max = (props: MaxProps) => {
  const { balance } = useTonConnect();
  const { setInput } = props;

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
