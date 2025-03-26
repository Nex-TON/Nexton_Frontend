import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { NumericFormat } from "react-number-format";

import IcError from "@/assets/icons/Stake/ic_error.svg";
import IcOldNxton from "@/assets/icons/Main/ic_old_nxTon.svg";
import IcNewNxton from "@/assets/icons/Main/ic_new_nxTon.svg";
import { FaArrowRight } from "react-icons/fa6";
import IcArrowDown from "@/assets/icons/Exchange/IcArrowDown.svg";
import useJettonWallet from "@/hooks/contract/useJettonWallet";
import ExchangeConfirmModal from "@/components/exchange/ExchangeConfirmModal";
import ExchangeSuccessModal from "@/components/exchange/ExchangeSuccessModal";

import { useTokenRate } from "@/hooks/api/loan/useTokenRate";
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import { limitDecimals } from "@/utils/limitDecimals";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { globalError } from "@/lib/atom/globalError";
import { postExchangeAmount } from "@/api/postExchangeAmount";
import { telegramAtom } from "@/lib/atom/telegram";

const tele = (window as any).Telegram.WebApp;

const TokenExchange = () => {
  const navigate = useNavigate();
  const { balance: nxTonBalance, refreshData: refreshNxtonData, tokenBurn } = useJettonWallet("oldNxTON");
  const { address } = useTonConnect();
  const [amount, setAmount] = useState("");
  const [modal, toggleModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: tonPriceData, isLoading: tonPriceLoading, error: tonPriceError } = useCoinPrice("ton", "usd");
  const { data: tokenRate, isLoading, error } = useTokenRate();
  const [usdc, setUsdc] = useState(0);
  const setError = useSetRecoilState(globalError);
  const [inputError, setInputError] = useState(null);
  const telegramId = useRecoilValue(telegramAtom);
  
  const onChange = e => {
    setAmount(e.target.value);
  };

  const sendSubmit = useCallback(async () => {
    toggleModal(false);
    try {
      const data = () => {
        return {
          value: 0.1,
          amount: amount,
          response_destination: address,
        };
      };

      await tokenBurn(data());
      await postExchangeAmount({
        telegramId,
        address,
        amount,
      })
      setSuccess(true);
    } catch (error) {
      console.log("token exchange failed", error);
      setError(error);
    }
  }, [amount, tokenBurn]);

  useEffect(() => {
    const refresh = async () => {
      await refreshNxtonData();
    };
    refresh();
  }, [refreshNxtonData]);

  useEffect(() => {
    if (tokenRate && tonPriceData) {
      const numericAmount = amount ? Number(amount) : 0;
      setUsdc(numericAmount * tokenRate.nxtonToTonRate * tonPriceData.rates.TON.prices.USD);
    }
  }, [amount, tokenRate, tonPriceData]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.enableClosingConfirmation();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });
    }
    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);
  useEffect(() => {
    if (Number(amount) > Number(nxTonBalance)) {
      setInputError("The amount exceeds the balance");
    } else {
      setInputError(null);
    }
  }, [amount, nxTonBalance]);

  return (
    <>
      <PageWrapper>
        <TopContainer.wrapper>
          <TopContainer.title>Exchange NxTON!</TopContainer.title>
          <TopContainer.imgwrapper>
            <img src={IcOldNxton} alt="old nxTON icon" />
            <FaArrowRight color="#FFF" size={18} />
            <img src={IcNewNxton} alt="new nxTON icon" />
          </TopContainer.imgwrapper>
        </TopContainer.wrapper>
        <BottomContainer.wrapper>
          <BottomContainer.text>
            Please exchange your <br /> existing NxTON for a <span>new one!</span>
          </BottomContainer.text>
          <BottomContainer.amount>
            <BottomContainer.balance>{`Balance:${nxTonBalance ? limitDecimals(nxTonBalance, 3) : "-.---"} NxTON`}</BottomContainer.balance>
            <BottomContainer.maxbutton
              onClick={() => {
                setAmount(limitDecimals(nxTonBalance, 3));
              }}
            >
              MAX
            </BottomContainer.maxbutton>
          </BottomContainer.amount>
          <TokenInput.wrapper>
            <TokenInput.token>
              <img src={IcOldNxton} alt="old nxton icon" /> NxTON
            </TokenInput.token>
            <TokenInput.rightitem>
              <TokenInput.input placeholder="0.00" value={amount} onChange={onChange} />
              <TokenInput.convert>${limitDecimals(usdc, 2)}</TokenInput.convert>
            </TokenInput.rightitem>
          </TokenInput.wrapper>
          <ArrowWrapper>
            <img src={IcArrowDown} alt="icon arrow down" />
          </ArrowWrapper>
          <TokenInput.wrapper>
            <TokenInput.token>
              <img src={IcNewNxton} alt="new nxton icon" /> NxTON
            </TokenInput.token>
            <TokenInput.rightitem>
              <TokenInput.calculate $isactive={amount}>{amount || "0.00"}</TokenInput.calculate>
              <TokenInput.convert>${limitDecimals(usdc, 2)}</TokenInput.convert>
            </TokenInput.rightitem>
          </TokenInput.wrapper>
          {inputError && (
            <TokenInput.error>
              <img src={IcError} alt="error" />
              {inputError}
            </TokenInput.error>
          )}
          <ExchangeButton onClick={() => (amount && !inputError ? toggleModal(true) : "")}>
            Get the New NxTON!
          </ExchangeButton>
        </BottomContainer.wrapper>
        {modal && <ExchangeConfirmModal amount={amount} toggleModal={toggleModal} handleSubmit={sendSubmit} />}
        {success && <ExchangeSuccessModal transaction={""} />}
      </PageWrapper>
    </>
  );
};
export default TokenExchange;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
  img {
    width: 6rem;
    height: 6rem;
  }
`;

const TokenInput = {
  error: styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;

    width: 85%;
    padding-left: 2.3rem;
    margin-top: 1rem;

    color: #ff7979;
    ${({ theme }) => theme.fonts.Telegram_Caption_1};
  `,
  calculate: styled.div<{ $isactive? }>`
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
    width: 100px;
    text-align: end;
    color: ${({ $isactive }) => ($isactive ? "#000" : "#e5e5ea")};
  `,
  convert: styled.div`
    text-align: end;
    color: #e5e5ea;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    width: 100px;
    position: absolute;
    top: 2.5rem;
  `,
  rightitem: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
  `,
  input: styled(NumericFormat)`
    background: transparent;
    outline: none;
    border: none;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
    color: black;
    width: 100px;
    padding: 0;
    text-align: end;
    &::placeholder {
      padding: 0;
      color: #e5e5ea;
      ${({ theme }) => theme.fonts.Nexton_Title_Medium};
    }
  `,
  token: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    color: black;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  `,
  wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.7rem 2.8rem 1.7rem 1.4rem;

    background: #f9f9ff;
    border-radius: 1.5rem;
    height: 8.2rem;
    width: 100%;
  `,
};

const BottomContainer = {
  maxbutton: styled.div`
    color: #1f53ff;
    ${({ theme }) => theme.fonts.Nexton_Exchange_text_2};
  `,
  balance: styled.div`
    color: var(--Neutral-variant-Neutral-variant-30, #333);
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  `,
  amount: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 9px;
  `,
  text: styled.div`
    text-align: center;
    color: var(--Neutral-Neutural-20, #303234);
    ${({ theme }) => theme.fonts.Nexton_Exchange_text_0};
    margin-bottom: 31px;
    span {
      ${({ theme }) => theme.fonts.Nexton_Exchange_text_1};
    }
  `,
  wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem 6.7rem 2rem;
    width: 100%;
  `,
};

const ExchangeButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 6rem;
  height: auto;
  padding: 17px 0;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  color: white;
  background: #1f53ff;
  border-radius: 1.5rem;
  margin-top: 122px;
`;

const TopContainer = {
  imgwrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.4rem;
    img {
      width: 50px;
      height: 50px;
    }
  `,
  title: styled.div`
    color: white;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
  `,
  wrapper: styled.div`
    background: #000000;
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 17px 89px 0 89px;
    gap: 1.4rem;
  `,
};

const PageWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;
