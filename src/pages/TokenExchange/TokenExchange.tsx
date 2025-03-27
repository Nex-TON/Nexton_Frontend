import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
import {useSetRecoilState } from "recoil";
import { globalError } from "@/lib/atom/globalError";
import { postExchangeAmount } from "@/api/postExchangeAmount";
import { useExchangeAmount } from "@/hooks/api/exchange/useExchangeAmount";

const tele = (window as any).Telegram.WebApp;

const TokenExchange = () => {
  const navigate = useNavigate();
  const { balance: oldNxTonBalance, refreshData: refreshNxtonData, tokenBurn } = useJettonWallet("oldNxTON");
  const { address } = useTonConnect();
  const [amount, setAmount] = useState(0);
  const [modal, toggleModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: tonPriceData, isLoading: tonPriceLoading, error: tonPriceError } = useCoinPrice("ton", "usd");
  const { data: tokenRate, isLoading, error } = useTokenRate();
  const [usdc, setUsdc] = useState(0);
  const setError = useSetRecoilState(globalError);
  const [inputError, setInputError] = useState(null);
  const {data:statusData}=useExchangeAmount(address);

  useEffect(()=>{
    if (statusData?.status===1||statusData?.status===2){
      setAmount(statusData?.amount);
    }
    else{
      setAmount(Number(oldNxTonBalance))
    }
  })

  const sendSubmit = useCallback(async () => {
    toggleModal(false);
    try {
      const data = () => {
        return {
          value: 0.1,
          amount: oldNxTonBalance,
          response_destination: address,
        };
      };

      await tokenBurn(data());
      await postExchangeAmount({
        address,
        amount: oldNxTonBalance,
      });
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
      const numericAmount =  amount?amount : 0;
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
          <TokenInput.wrapper>
            <TokenInput.subtitle>Your NxTON balance</TokenInput.subtitle>
            <TokenInput.container>
              <TokenInput.token>
                <img src={IcOldNxton} alt="old nxton icon" /> NxTON
              </TokenInput.token>
              <TokenInput.rightitem>
                <TokenInput.input>{amount?limitDecimals(amount,3):"0.000"}</TokenInput.input>
                <TokenInput.convert>${amount?limitDecimals(usdc,2):"0.00"}</TokenInput.convert>
              </TokenInput.rightitem>
            </TokenInput.container>
          </TokenInput.wrapper>
          <ArrowWrapper>
            <img src={IcArrowDown} alt="icon arrow down" />
          </ArrowWrapper>
          <TokenInput.wrapper $new>
            <TokenInput.subtitle>The new NxTON you have received</TokenInput.subtitle>
            <TokenInput.container>
              <TokenInput.token>
                <img src={IcNewNxton} alt="new nxton icon" /> NxTON
              </TokenInput.token>
              <TokenInput.rightitem>
                <TokenInput.calculate $isactive={oldNxTonBalance!="0"||statusData?.status===2}>{amount?limitDecimals(amount,3):"0.000"}</TokenInput.calculate>
                <TokenInput.convert>${amount?limitDecimals(usdc,2):"0.00"}</TokenInput.convert>
              </TokenInput.rightitem>
            </TokenInput.container>
          </TokenInput.wrapper>
          <InfoWrapper>
            * The former NxTON will be burned, and the exchange
            <br /> for the new NxTON may take approximately 24 hours
          </InfoWrapper>
          <ExchangeButton $unactive={oldNxTonBalance==="0"} $status={statusData?.status} onClick={() => (oldNxTonBalance!=="0"&&statusData?.status===0 ? toggleModal(true) : "")}>
            {statusData?.status===1?"In progress...":statusData?.status===2?"NxTON exchange completed":"Request new NxTON"}
          </ExchangeButton>
        </BottomContainer.wrapper>
        {modal && <ExchangeConfirmModal amount={oldNxTonBalance} toggleModal={toggleModal} handleSubmit={sendSubmit} />}
        {success && <ExchangeSuccessModal/>}
      </PageWrapper>
    </>
  );
};
export default TokenExchange;

const InfoWrapper = styled.div`
  margin-top: 2.6rem;
  color: var(--Neutral-variant-Neutral-variant-50, #767680);
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.4px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 6rem;
    height: 6rem;
  }
`;

const TokenInput = {
  subtitle: styled.div`
    display: flex;
    text-align: start;
    width: 100%;

    color: var(--Neutral-variant-Neutral-variant-40, #5d5e67);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
  `,
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
    color: ${({$isactive})=>$isactive?"#1F53FF":"#000"};
  `,
  convert: styled.div`
    text-align: end;
    color: #e5e5ea;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    width: 100px;
    position: absolute;
    top: 3rem;
  `,
  rightitem: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
  `,
  input: styled.div`
    background: transparent;
    outline: none;
    border: none;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
    color: black;
    width: 100px;
    padding: 0;
    text-align: end;
  `,
  token: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    color: black;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
    img {
      width: 31px;
      height: 31px;
    }
  `,
  container: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  wrapper: styled.div<{ $new? }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border: ${({ $new }) => ($new ? "1px solid #1F53FF" : "1px solid #E5E5EA")};

    background: white;
    border-radius: 1.5rem;
    height: 12.1rem;
    width: 100%;
    gap: 1rem;
    padding: 1.7rem 1.4rem 2.3rem 1.4rem;
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

const ExchangeButton = styled.div<{$unactive,$status}>`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 6rem;
  height: auto;
  padding: 17px 0;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  color: ${({$unactive,$status})=>{
    if($unactive||($status===1)){
      return "#B9B9BA"
    }else {
      return "#FFF"
    }
  }};
  background:${({$unactive,$status})=>{
    if($unactive||$status===1){
      return "#E1E4E6";
    }else if($status===2){
      return "#34C759";
    }else{
      return "#1F53FF";
    }
  }};
  border-radius: 1.5rem;
  margin-top: 9.5rem;
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
