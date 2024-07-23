import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcAlert from "@/assets/icons/Loan/ic_alert.svg";
import IcArrowRight from "@/assets/icons/Loan/ic_arrow_right.svg";
import IcBars from "@/assets/icons/Loan/ic_bars.svg";
import NFTsEmpty from "@/assets/image/Loan/NFTsEmpty.png";

import LoanHeader from "../../components/loan/common/LoanHeader";
import LoanList from "../../components/loan/LoanList";

import {
  LoanHeaderBox,
  LoanHeaderBoxButton,
  LoanHeaderBoxTitle,
  LoanNFTBox,
  LoanNFTBoxHeader,
  LoanNFTBoxList,
  LoanNFTBoxListEmpty,
  LoanNFTBoxListEmptyLink,
  LoanSwitcherBox,
  LoanSwitcherBoxItem,
  LoanSwitcherBoxTooltip,
  LoanWrapper,
} from "./Loan.styled";

type LoanView = "borrow" | "repay";

const tele = (window as any).Telegram.WebApp;

const Loan = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<LoanView>("borrow");

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  const handleViewChange = (view: LoanView) => {
    setView(view);
  };

  return (
    <LoanWrapper>
      <LoanHeaderBox>
        <LoanHeaderBoxTitle>
          <h1>Loan</h1>
        </LoanHeaderBoxTitle>

        <LoanHeaderBoxButton>
          <img src={IcBars} alt="loan_icon" />
        </LoanHeaderBoxButton>
      </LoanHeaderBox>

      <LoanSwitcherBox>
        <LoanSwitcherBoxItem $isActive={view === "borrow"} onClick={() => handleViewChange("borrow")}>
          Borrow
        </LoanSwitcherBoxItem>
        <LoanSwitcherBoxItem $isActive={view === "repay"} onClick={() => handleViewChange("repay")}>
          Repay
        </LoanSwitcherBoxItem>

        <LoanSwitcherBoxTooltip onClick={() => navigate("/loan/risk-disclosure")}>
          <img src={IcAlert} alt="alert_icon" />
        </LoanSwitcherBoxTooltip>
      </LoanSwitcherBox>

      <LoanNFTBox>
        <LoanNFTBoxHeader>
          <span>You have</span>
          <h4>0 NFTs</h4>
        </LoanNFTBoxHeader>

        <LoanNFTBoxList>
          <LoanNFTBoxListEmpty>
            <img src={NFTsEmpty} alt="nfts_empty" />

            <h2>No results</h2>
            <LoanNFTBoxListEmptyLink>
              Let’s move to staking to get new NFT <img src={IcArrowRight} alt="arrow_right" />
            </LoanNFTBoxListEmptyLink>
          </LoanNFTBoxListEmpty>
        </LoanNFTBoxList>
      </LoanNFTBox>
    </LoanWrapper>
  );
};

export default Loan;

const LoanHeaderTop = styled.div`
  padding-top: 3rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Title_Large};
`;

const LoanHeaderDescBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 1.2rem;
  margin-bottom: 3.3rem;
`;

const LoanHeaderDesc = styled.span`
  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;
