import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { z } from "zod";

import ProgressBar from "@/components/stake/common/ProgressBar";
import Step from "@/components/stake/common/Step";
import Title from "@/components/stake/common/Title";
import TokenInput from "@/components/stake/common/TokensInput";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { stakingAtom } from "@/lib/atom/staking";
import { isDevMode } from "@/utils/isDevMode";
import { numberCutter } from "@/utils/numberCutter";

const tele = (window as any).Telegram.WebApp;

const Amount = () => {
  const { address, balance, connected, refreshTonData } = useTonConnect();
  const navigate = useNavigate();
  const [, setStakingInfo] = useRecoilState(stakingAtom);

  const schema = z.object({
    amount: z
      .string()
      .min(1, "Please enter amount")
      .transform(Number)
      .refine(val => !isNaN(val), "Please enter a valid number")
      .refine(val => val >= 1, "Please stake more than 1 TON")
      .refine(val => val <= balance, "The amount exceeds the balance"),
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
      amount: "",
    },
  });

  useEffect(() => {
    async function handleRefreshTonData() {
      await refreshTonData();
    }

    handleRefreshTonData();
  }, [refreshTonData]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => navigate("/"));
      return () => {
        tele.offEvent("backButtonClicked");
      };
    }
  }, [navigate]);

  useEffect(() => {
    if (!connected) {
      setError("amount", {
        type: "walletConnect",
        message: "Please connect your wallet first",
      });
    }
  }, [connected, setError]);

  const onSubmit = data => {
    setStakingInfo(prev => ({
      ...prev,
      address: address,
      principal: data.amount,
    }));
    navigate("/stake/nominator");
  };

  return (
    <AmountWrapper>
      <ProgressBar />
      <Step title="Step 1" />
      <Title title="Put stake amount" />
      <BalanceWrapper>
        <BalanceText>Balance : {balance ? numberCutter(balance) : `-.--`}</BalanceText>
      </BalanceWrapper>

      <form style={{ width: "100%" }}>
        <TokenInput
          name="amount"
          control={control}
          decimalSeparator="."
          decimalScale={3}
          setValue={setValue}
          error={errors.amount?.message as string}
          disabled={!connected}
          tokenLabel="TON"
          placeholder="Stake (min. 1)"
          balance={balance}
        />

        {!isDevMode ? (
          <MainButton text="NEXT" onClick={handleSubmit(onSubmit)} />
        ) : (
          <button onClick={handleSubmit(onSubmit)}>next</button>
        )}
      </form>
    </AmountWrapper>
  );
};

export default Amount;

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 0 2rem;
`;

const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  margin-top: 2.6rem;
`;

const BalanceText = styled.span`
  color: #333;
  font-family: Montserrat;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem; /* 138.462% */
  letter-spacing: -0.024rem;
`;
