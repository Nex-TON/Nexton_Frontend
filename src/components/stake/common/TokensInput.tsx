import { Controller } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import styled from "styled-components";

import IcError from "@/assets/icons/Stake/ic_error.svg";
import { numberCutter } from "@/utils/numberCutter";

interface TokenInputProps extends NumericFormatProps {
  name: string;
  setValue: (name: string, value: string) => void;
  tokenLabel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  balance: number;
  error?: string;
  disabled?: boolean;
  saveAs?: "floatValue" | "formattedValue";
}

const TokenInput = ({
  name,
  setValue,
  tokenLabel,
  control,
  balance,
  error,
  disabled,
  saveAs = "formattedValue",
  ...props
}: TokenInputProps) => {
  return (
    <>
      <LeverageInputWrapper $error={Boolean(error)}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, ref, ...rest } }) => (
            <Input
              {...rest}
              {...props}
              id={name}
              onValueChange={e => onChange(e[saveAs])}
              getInputRef={ref}
              disabled={disabled}
              autoComplete="off"
            />
          )}
        />

        <RightSection>
          <MaxWrapper type="button" disabled={!balance} onClick={() => setValue(name, String(numberCutter(balance)))}>
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

const Input = styled(NumericFormat)`
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
