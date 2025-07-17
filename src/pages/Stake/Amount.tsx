import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { z } from "zod";

import ProgressBar from "@/components/stake/common/ProgressBar";
import TokenInput from "@/components/stake/common/TokensInput";
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import { stakingAtom } from "@/lib/atom/staking";
import { isDevMode } from "@/utils/isDevMode";
import { limitDecimals } from "@/utils/limitDecimals";
import { numberCutter } from "@/utils/numberCutter";
import TokenFilter from "@/components/stake/Filter/TokenFilter";
import { TokenFilterModal } from "@/components/stake/Filter/TokenFilterModal";
import NXTPointImg from "@/assets/image/button.png";
import useJettonWallet from "@/hooks/contract/useJettonWallet";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { useTokenRate } from "@/hooks/api/loan/useTokenRate";
import ExchangePopup from "@/components/stake/common/ExchangePopup";
import IcWallet from "@/assets/icons/Stake/ic_wallet.svg";
import { getLockUpDate } from "@/utils/getLockupDate";

const tele = (window as any).Telegram.WebApp;

const Amount = () => {
  const { address, balance, connected } = useTonConnect();
  const { data: tokenRate } = useTokenRate();
  const navigate = useNavigate();
  const [, setStakingInfo] = useRecoilState(stakingAtom);
  const { data: coinPrice } = useCoinPrice("TON", "USD");
  const [modal, setModal] = useState(false);
  const [tokenSort, setTokenSort] = useState("TON");
  const { balance: nxTonBalance } = useJettonWallet();
  const { balance: usdtBalance } = useJettonWallet("USDT");
  //+bmTON
  const { balance: bmTonBalance } = useJettonWallet("bmTON");

  const [exchangeModal, setExchangeModal] = useState(false);

  const handleTokenSelect = selectedToken => {
    setTokenSort(selectedToken); // Update token selection
    setModal(false); // Close modal
  };

  const mapTokenBalance = (tokenSort: string) => {
    const tokenBalance: Record<string, number> = {
      TON: balance,
      nxTON: Number(nxTonBalance),
      USDT: Number(usdtBalance),
      bmTON: Number(bmTonBalance),
    };
    return tokenBalance[tokenSort] ?? 0;
  };

  const mapTokenMasterAddress = (tokenSort: string) => {
    const tokenAddress: Record<string, string> = {
      bmTON: "EQCSxGZPHqa3TtnODgMan8CEM0jf6HpY-uon_NMeFgjKqkEY",
    };
    return tokenAddress[tokenSort] ?? "";
  };
  const bmTonAddress = mapTokenMasterAddress("bmTON");
  const { data: bmTONPrice } = useCoinPrice(bmTonAddress, "USD");

  const schema = z.object({
    amount: z
      .string()
      .min(1, "Please enter amount")
      .transform(Number)
      .refine(val => !isNaN(val), "Please enter a valid number")
      .refine(val => val >= 1, `Please stake more than 1 ${tokenSort}`)
      .refine(val => val <= mapTokenBalance(tokenSort), "The amount exceeds the balance"),
  });

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
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
      //
      if (coinPrice && amount) {
        if (tokenSort === "TON") return `≈ $${limitDecimals(coinPrice?.rates?.TON?.prices?.USD * Number(amount), 2)}`;
        else if (tokenSort === "nxTON") {
          return `≈ $${limitDecimals(coinPrice?.rates?.TON?.prices?.USD * (Number(amount) / tokenRate?.tonToNextonRate), 2)}`;
        } else if (tokenSort === "bmTON") {
          return `≈ $${limitDecimals(bmTONPrice?.rates?.[bmTonAddress]?.prices?.USD * Number(amount), 2)}`;
        } else {
          return `≈ $${Number(amount)}`;
        }
      }
      return "≈ $0.00";
    };
  }, [coinPrice, tokenSort]);

  const onSubmit = data => {
    setStakingInfo(prev => ({
      ...prev,
      address: address,
      principal: data.amount,
      tokenSort: tokenSort,
      leverage:1,
      lockup: getLockUpDate(data.amount, 1)
    }));
    navigate("/stake/mystrategy");
  };

  return (
    <>
      <AmountWrapper>
        <ProgressBar />
        <BalanceWrapper>
          <TokenFilter
            toggleModal={() => setModal(true)}
            tokenSort={tokenSort} // Pass selection handler
          />
          {tokenSort === "TON" ? (
            <BalanceText>
              <img src={IcWallet} alt="wallet" />
              {mapTokenBalance("TON") === 0
                ? "0.00"
                : mapTokenBalance("TON")
                  ? numberCutter(mapTokenBalance("TON"))
                  : "-.--"}{" "}
              TON
            </BalanceText>
          ) : tokenSort === "nxTON" ? (
            <BalanceText>
              <img src={IcWallet} alt="wallet" />
              {mapTokenBalance("nxTON") === 0
                ? "0.00"
                : mapTokenBalance("nxTON")
                  ? numberCutter(mapTokenBalance("nxTON"))
                  : "-.--"}{" "}
              nxTON
            </BalanceText>
          ) : tokenSort === "USDT" ? (
            <BalanceText>
              <img src={IcWallet} alt="wallet" />
              {mapTokenBalance("USDT") === 0
                ? "0.00"
                : mapTokenBalance("USDT")
                  ? numberCutter(mapTokenBalance("USDT"))
                  : "-.--"}{" "}
              USDT
            </BalanceText>
          ) : (
            <BalanceText>
              <img src={IcWallet} alt="wallet" />
              {mapTokenBalance("bmTON") === 0
                ? "0.00"
                : mapTokenBalance("bmTON")
                  ? numberCutter(mapTokenBalance("bmTON"))
                  : "-.--"}{" "}
              bmTON
            </BalanceText>
          )}
          {/* <MaxButton
            onClick={() => {
              //const maxAmount = tokenSort === "TON" ? balance : nxTonBalance;
              let maxAmount;
              if (tokenSort === "TON") maxAmount = balance;
              else if (tokenSort === "nxTON") maxAmount = nxTonBalance;
              else if (tokenSort === "USDT") maxAmount = usdtBalance;
              else if (tokenSort === "bmTON") maxAmount = bmTonBalance;

              setValue("amount", maxAmount ? limitDecimals(maxAmount, 3) : "0");
            }}
          >
            MAX
          </MaxButton> */}
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
            placeholder={"0"}
            balance={balance}
            convertAmount={convertAmount}
            tokenSort={tokenSort}
            address={address}
          />

          {!isDevMode ? (
            <MainButton text="Continue" onClick={handleSubmit(onSubmit)} disabled={!!errors.amount}/>
          ) : (
            <button onClick={handleSubmit(onSubmit)}>Continue</button>
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
                  Try the newly listed <span>$NxTON</span> now!
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
            <TokenFilterModal
              toggleModal={() => setModal(false)}
              onSelected={handleTokenSelect}
              setExchangeModal={setExchangeModal}
              hasNxTon={nxTonBalance}
              setValue={setValue}
            />
          </ModalWrapper>
        </>
      )}
      {exchangeModal && <ExchangePopup toggleModal={setExchangeModal} />}
    </>
  );
};

export default Amount;

const MaxButton = styled.div`
  width: fit-content;
  height: fit-content;
  text-align: end;
  color: var(--blue, #1f53ff);
  text-align: center;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px; /* 161.538% */
  letter-spacing: -0.052px;
`;

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
  width: 100%;
`;

const BalanceText = styled.span`
  color: #333;
  font-family: Montserrat;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8rem; /* 138.462% */
  letter-spacing: -0.024rem;
  img {
    width: 18px;
    height: 18px;
  }
`;
