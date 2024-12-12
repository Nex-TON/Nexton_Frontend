import { useEffect, useMemo, useState } from "react";
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
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { stakingAtom } from "@/lib/atom/staking";
import { isDevMode } from "@/utils/isDevMode";
import { limitDecimals } from "@/utils/limitDecimals";
import { numberCutter } from "@/utils/numberCutter";
import TokenFilter from "@/components/stake/Filter/TokenFilter";
import { TokenFilterModal } from "@/components/stake/Filter/TokenFilterModal";
import NXTPointImg from "@/assets/image/NXTPoint.png";
import useJettonWallet from "@/hooks/contract/useJettonWallet";

const tele = (window as any).Telegram.WebApp;

const Amount = () => {
  const { address, balance, connected, refreshTonData } = useTonConnect();
  const navigate = useNavigate();
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const { data: coinPrice } = useCoinPrice("TON", "USD");
  const [modal, setModal] = useState(false);
  const [tokenSort, setTokenSort] = useState("TON");
  const { balance: nxTonBalance, refreshData: refreshNxtonData } = useJettonWallet();

  const handleTokenSelect = selectedToken => {
    setTokenSort(selectedToken); // Update token selection
    setModal(false); // Close modal
  };

  const schema = z.object({
    amount: z
      .string()
      .min(1, "Please enter amount")
      .transform(Number)
      .refine(val => !isNaN(val), "Please enter a valid number")
      .refine(val => val >= 1, "Please stake more than 1 TON")
      .refine(val => val <= (tokenSort==="TON"?balance:Number(nxTonBalance)), "The amount exceeds the balance"),
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
      await refreshNxtonData();
    }

    handleRefreshTonData();
  }, [refreshTonData,tokenSort,refreshNxtonData]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.enableClosingConfirmation();
      tele.onEvent("backButtonClicked", () => navigate("/main"));

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
    setStakingInfo(prev => ({
      ...prev,
      address: address,
      principal: data.amount,
      asset: tokenSort,
    }));
    navigate("/stake/nominator");
  };

  return (
    <>
      <AmountWrapper>
        <ProgressBar />
        <Step title="Step 1" />
        <Title title="Put stake amount" />
        <BalanceWrapper>
          {tokenSort==="TON"?
                    <BalanceText>Balance : {balance ? numberCutter(balance) : `-.--`}</BalanceText>:
                    <BalanceText>Balance : {nxTonBalance ? numberCutter(Number(nxTonBalance)) : `-.--`}</BalanceText>
          }
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
            tokenLabel={
              <TokenFilter
                toggleModal={() => setModal(true)}
                tokenSort={tokenSort} // Pass selection handler
              />
            }
            placeholder={tokenSort === "TON" ? "min 1TON" : "min 1nxTON"}
            balance={balance}
            convertAmount={convertAmount}
          />

          {!isDevMode ? (
            <MainButton text="NEXT" onClick={handleSubmit(onSubmit)} />
          ) : (
            <button onClick={handleSubmit(onSubmit)}>next</button>
          )}
        </form>
        {tokenSort === "nxTON" && (
          <>
            <BonusPointWrapper>
              <img src={NXTPointImg} />
              <TextWrapper>
                <h2>Bonus NXT Point!</h2>
                <p>
                  Earn bonus NXT points by staking!
                  <br />
                  Try the newly listed <span>$nxTON</span> now!
                </p>
              </TextWrapper>
            </BonusPointWrapper>
          </>
        )}
      </AmountWrapper>
      {modal && (
        <>
          <Overlay onClick={() => setModal(false)} />
          <ModalWrapper>
            <TokenFilterModal toggleModal={() => setModal(false)} onSelected={handleTokenSelect} />
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default Amount;

const TextWrapper = styled.div`
  h2 {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  }
  p {
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
    span {
      ${({ theme }) => theme.fonts.Nexton_Label_Large};
    }
  }
`;

const BonusPointWrapper = styled.div`
  margin-top: 1.8rem;
  gap: 1.6rem;
  padding: 21px 42px 21px 20px;
  align-items: center;
  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 16px 0px rgba(206, 216, 225, 0.5);
  width: 100%;
  height: 106px;

  display: flex;
  flex-direction: row;
  img {
    width: 49px;
    height: 49px;
    flex-shrink: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
`;

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