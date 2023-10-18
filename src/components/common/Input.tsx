import styled from "styled-components";

interface InputProps {
  input: string;
  disableInput?: boolean;
  setInput: (input: string) => void;
}

const Input = (props: InputProps) => {
  const { input, disableInput, setInput } = props;

  return (
    <InputStyle
      inputMode="decimal"
      placeholder="min 0.5"
      value={input}
      disabled={disableInput}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default Input;

const InputStyle = styled.input`
  width: 50%;

  border: none;

  background-color: transparent;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
  color: #45464f;

  &::placeholder {
    color: #e5e5ea;
  }

  outline: none;
`;
