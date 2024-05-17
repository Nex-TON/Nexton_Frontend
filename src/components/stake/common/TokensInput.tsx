import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

import IcError from "@/assets/icons/Stake/ic_error.svg";
import { numberCutter } from "@/utils/numberCutter";

interface TokenInputProps {
  register: UseFormRegisterReturn<string>;
  setValue: (name: string, value: string) => void;
  tokenLabel: string;
  balance: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  [key: string]: unknown;
}

const TokenInput = (props: TokenInputProps) => {
  const { error, disabled, placeholder, register, setValue, tokenLabel, onChange, balance, ...rest } = props;

  return (
    <>
      <LeverageInputWrapper $error={Boolean(error)}>
        <Input
          {...rest}
          {...register}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          autoComplete="off"
        />

        <RightSection>
          <MaxWrapper
            type="button"
            disabled={!balance}
            onClick={() => setValue(register.name, String(numberCutter(balance)))}
          >
            MAX
          </MaxWrapper>
          <TokenLabel>{tokenLabel}</TokenLabel>
        </RightSection>
      </LeverageInputWrapper>

      {error && (
        <ErrorWrapper>
          <img src={IcError} alt="error" />
          <span>{error}</span>
        </ErrorWrapper>
      )}
    </>
  );
};

export default TokenInput;

const Input = styled.input`
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

const LeverageInputWrapper = styled.div<{ $error: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 1.4rem;
  padding: 1.7rem 2.05rem 1.8rem 2rem;

  border: ${({ $error }) => $error && `0.1rem solid #FF7979`};
  border-radius: 2rem;
  background-color: #f9f9ff;
`;

const RightSection = styled.div``;

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

const TokenLabel = styled.span`
  margin-left: 0.7rem;

  color: #0b0b0b;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 85%;
  padding-left: 2.3rem;
  margin-top: 1rem;

  span {
    color: #ff7979;
    ${({ theme }) => theme.fonts.Telegram_Caption_1};
  }
`;
