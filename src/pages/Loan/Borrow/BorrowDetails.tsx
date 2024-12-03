import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { z } from "zod";

import IcExclude from "@/assets/icons/Loan/ic_exclude.svg";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import TokenInput from "@/components/stake/common/TokensInput.tsx";
import { useCoinPrice } from "@/hooks/api/useCoinPrice.ts";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import useTonConnect from "@/hooks/contract/useTonConnect.ts";
import { isDevMode } from "@/utils/isDevMode.ts";
import { limitDecimals } from "@/utils/limitDecimals.ts";

import {
  BorrowContentBox,
  BorrowHeaderBox,
  BorrowHeaderBoxTitle,
  BorrowWrapper,
  ExcludeBox,
} from "./BorrowDetails.styled.tsx";

const tele = (window as any).Telegram.WebApp;

const BorrowDetails = () => {
  const { connected, balance } = useTonConnect();
  const navigate = useNavigate();
  const [alwaysVisibleInfo, setAlwaysVisibleInfo] = useState<any>([]);
  const [stakingInfo, setStakingInfo] = useState<any>([{ items: [] }]);
  const { id } = useParams();

  const { nftDetail } = useNFTDetail(Number(id));
  const { data: coinPrice } = useCoinPrice("TON", "USD");

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

  useEffect(() => {
    if (nftDetail) {
      setAlwaysVisibleInfo([
        { label: "NFT ID", value: nftDetail[0].nftId },
        { label: "Network", value: "TON" },
        { label: "LTV", value: "95.0%" },
      ]);

      setStakingInfo([
        {
          header: "Staking info",
          items: [
            { label: "Principal", value: `${nftDetail[0].principal} TON` },
            { label: "Nominator Pool", value: nftDetail[0].nominator },
            { label: "Leveraged", value: `${nftDetail[0].leverage}x` },
            { label: "Lockup period", value: `${nftDetail[0].lockPeriod} days` },
            { label: "Unstakable date", value: new Date(nftDetail[0].unstakableDate).toLocaleDateString() },
            { label: "Protocol Fees", value: "2%" },
            { label: "Staking APR", value: "5%" },
            { label: "Total Amount", value: `${nftDetail[0].totalAmount} TON` },
          ],
        },
      ]);
    }
  }, [nftDetail]);

  // Conversion function
  const convertAmount = useMemo(() => {
    return (amount: string | number) => {
      if (coinPrice && amount) {
        return `$${limitDecimals(coinPrice?.rates?.TON?.prices?.USD * Number(amount), 2)}`;
      }
      return "$0.00";
    };
  }, [coinPrice]);

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
            alwaysVisibleItems={alwaysVisibleInfo}
            stakingInfoItems={stakingInfo}
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
            balance={balance}
            convertAmount={convertAmount}
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
