import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { z } from "zod";

import IcExclude from "@/assets/icons/Loan/ic_exclude.svg";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import TokenInput from "@/components/stake/common/TokensInput.tsx";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import useTonConnect from "@/hooks/contract/useTonConnect.ts";
import { isDevMode } from "@/utils/isDevMode.ts";

import {
  BorrowContentBox,
  BorrowHeaderBox,
  BorrowHeaderBoxTitle,
  BorrowRateBox,
  BorrowRateBoxBottom,
  BorrowRateBoxDivider,
  BorrowRateBoxHeader,
  BorrowRateBoxHeaderLeft,
  BorrowRateBoxHeaderRight,
  BorrowWrapper,
  ExcludeBox,
} from "./BorrowDetails.styled.tsx";

const tele = (window as any).Telegram.WebApp;

const alwaysVisibleItems = [
  { label: "NFT ID", value: "4817sddss863ddddwdwsdwd" },
  { label: "Network", value: "TON" },
  { label: "LTV", value: "50.0%" },
];

const stakingInfoItems = [
  {
    header: "Staking info",
    items: [
      { label: "Principal", value: "10,000 TON" },
      { label: "Nominator Pool", value: "DG Pool #1" },
      { label: "Leveraged", value: "X1.0" },
      { label: "Lockup period", value: "60 days" },
      { label: "Unstakable date", value: "DD.MM.YY" },
      { label: "Protocol Fees", value: "2%" },
      { label: "Staking APR", value: "5%" },
      { label: "Total Amount", value: "10,083 TON" },
    ],
  },
];

// ! Data is currently mocked
const BorrowDetails = () => {
  const { connected } = useTonConnect();
  const navigate = useNavigate();
  const { id } = useParams();

  // const { nftDetail } = useNFTDetail(Number(id));

  const schema = z.object({
    borrowAmount: z
      .string()
      .min(1, "Please enter amount")
      .transform(Number)
      .refine(val => !isNaN(val), "Please enter a valid number")
      .refine(val => val >= 1, "Please stake more than 1 TON"),
  });

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      borrowAmount: "",
    },
  });

  console.log("errors", errors);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan/1");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  useEffect(() => {
    if (!connected) {
      setError("borrowAmount", {
        type: "walletConnect",
        message: "Please connect your wallet first",
      });
    }
  }, [connected, setError]);

  const onSubmit = data => {
    console.log("form data", data);

    navigate(`/loan/${id}/borrow/risk-disclosure`);
  };

  return (
    <BorrowWrapper>
      <BorrowHeaderBox>
        <BorrowHeaderBoxTitle>
          <h1>Loan</h1>
        </BorrowHeaderBoxTitle>
      </BorrowHeaderBox>

      <ProgressBar currentStep={1} />

      <form style={{ width: "100%" }}>
        <BorrowContentBox>
          <StakingInfo
            isExpandable={true}
            theme="black"
            title="Collateralizing NFT info"
            alwaysVisibleItems={alwaysVisibleItems}
            stakingInfoItems={stakingInfoItems}
          />

          <ExcludeBox>
            <img src={IcExclude} alt="exclude_icon" />
          </ExcludeBox>

          {/* @deprecated */}
          {/* <BorrowRateBox>
          <BorrowRateBoxHeader>
            <BorrowRateBoxHeaderLeft>Borrow</BorrowRateBoxHeaderLeft>
            <BorrowRateBoxHeaderRight>1NXT = n TON</BorrowRateBoxHeaderRight>
          </BorrowRateBoxHeader>
          <BorrowRateBoxDivider />
          <BorrowRateBoxBottom>000.00 nxTON</BorrowRateBoxBottom>
        </BorrowRateBox> */}

          <TokenInput
            name="borrowAmount"
            control={control}
            decimalSeparator="."
            decimalScale={3}
            setValue={setValue}
            error={errors.borrowAmount?.message as string}
            disabled={!connected}
            tokenLabel="nxTON"
            placeholder="min 0.5"
            disableMax
          />
        </BorrowContentBox>

        {!isDevMode ? (
          <MainButton text="Next" onClick={handleSubmit(onSubmit)} />
        ) : (
          <button onClick={handleSubmit(onSubmit)}>next</button>
        )}
      </form>
    </BorrowWrapper>
  );
};

export default BorrowDetails;
