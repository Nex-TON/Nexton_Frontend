import { useState } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import styled from "styled-components";
import NFTPreviewInfo from "../NFTPreview/NFTPreviewInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { stakingAtom } from "@/lib/atom/staking";
import { getLockUpDate } from "@/utils/getLockupDate";

import IcDashboard from "@/assets/icons/Stake/ic_dashboard.svg";
import IcRight from "@/assets/icons/Stake/ic_arrow_right.svg";
import { useNavigate } from "react-router-dom";

interface TokenInputProps extends NumericFormatProps {
  name: string;
  setValue: (name: string, value: string) => void;
  control: any;
  balance: number;
  convertAmount: (amount: string | number) => string;
  error?: string;
  disabled?: boolean;
  saveAs?: "floatValue" | "formattedValue";
  disableMax?: boolean;
  tokenSort?: string; // Added tokenSort prop to display the token type
  address: string; // Added address prop to set the staking info
}
const TokenInput = ({
  name,
  setValue,
  control,
  balance,
  convertAmount,
  error,
  disabled,
  saveAs = "formattedValue",
  disableMax = false,
  tokenSort,
  address,
  ...props
}: TokenInputProps) => {
  const [convertedValue, setConvertedValue] = useState<string>("$0.00");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const stakingInfo = useRecoilValue(stakingAtom);
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const [isTouched, setIsTouched] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <LeverageInputWrapper>
        <AmountWrapper>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, ref, value = "", ...rest }}) => (
              <Input
                {...rest}
                {...props}
                id={name}
                onValueChange={e => {
                  const rawValue = e.value;
                  setIsTouched(true);
                  setIsConverting(true);
                  console.log(e[saveAs]);
                  setInputValue(String(e[saveAs]) || "");
                  onChange(e[saveAs]);
                  setConvertedValue(convertAmount(e[saveAs]));
                  setIsConverting(false);
                  setStakingInfo(prev => ({
                    ...prev,
                    address: address,
                    principal: rawValue,
                    tokenSort: tokenSort,
                    leverage: 1,
                    lockup: getLockUpDate(rawValue, 1),
                  }));
                }}
                value={value}
                getInputRef={ref}
                disabled={disabled}
                autoComplete="off"
                $customWidth={inputValue.length || 1}
                $error={Boolean(error) && isTouched}
                />
            )}
          />
          <TokenName $error={Boolean(error) && isTouched }>
            {tokenSort === "nxTON" ? "NxTON" : tokenSort}
          </TokenName>
        </AmountWrapper>
        <ConvertedValue $isZero={convertedValue === "$0.00"}>{isConverting ? "..." : convertedValue}</ConvertedValue>
        <NFTPreviewInfo stakingInfo={stakingInfo} />
        <DashboardRouter onClick={() => navigate("/dashboard")}>
          <img src={IcDashboard} alt="dashboard icon" /> <p>Go to Dashbaord</p> <img src={IcRight} alt="right arrow" />
        </DashboardRouter>
      </LeverageInputWrapper>
    </>
  );
};

export default TokenInput;

const DashboardRouter = styled.div`
  margin-top: -40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  p {
    color: var(--Neutral-Neutural-20, #303234);
    font-family: "Montserrat";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

const TokenName = styled.div<{ $error?: boolean }>`
  color: ${({ $error }) => ($error ? "#FF7979" : "#767680")};
  text-align: center;
  font-family: "Montserrat";
  font-size: 46px;
  font-style: normal;
  font-weight: 500;
  line-height: 46px; /* 56.522% */
  letter-spacing: -0.46px;
`;

const Input = styled(NumericFormat)<{ $customWidth?: number; $error?: boolean }>`
  width: ${({ $customWidth }) => `calc(${$customWidth}ch + 0.5rem)`};
  min-width: 3.1rem;
  max-width: unset;

  height: 100%;
  border: none;
  box-sizing:border-box;
  background-color: transparent;
  color: ${({ $error }) => ($error ? "#FF7979" : "#2F3038")};
  font-family: "Montserrat";
  font-size: 46px;
  font-style: normal;
  font-weight: 500;
  line-height: 46px;
  letter-spacing: -0.46px;
  padding: 0;
  outline: none;
  text-align: center;
  vertical-align:middle;

  display: flex;
  align-items:center;
  justify-content:center;

  &::placeholder {
    color: ${({ $error }) => ($error ? "#FF7979" : "#abaab4")};
    font-family: "Montserrat";
    font-size: 46px;
    line-height:46px;
    text-align: center;
  }

  outline: none;
`;

const LeverageInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: fit-content;
  margin-top: 2.6rem;
  padding: 6.5rem 0 2.9rem 0;

  border-radius: 1.5rem;
  background-color: #f9f9ff;
`;

const ConvertedValue = styled.span<{ $isZero: boolean }>`
  color: ${({ $isZero }) => ($isZero ? "#e5e5ea" : "#8E8E93")};
  font-family: "Montserrat";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-top: 1.5rem;
  line-height: 22px; /* 157.143% */
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1.1rem;
  height: 4.6rem;
  width: 80%;
`;
