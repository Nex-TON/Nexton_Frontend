import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IcAlert from "@/assets/icons/Loan/ic_alert.svg";
import IcBars from "@/assets/icons/Loan/ic_bars.svg";
import BorrowList from "@/components/loan/Borrow/BorrowList";

import {
  LoanHeaderBox,
  LoanHeaderBoxButton,
  LoanHeaderBoxTitle,
  LoanNFTBox,
  LoanNFTBoxHeader,
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
  }, [navigate]);

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

        {view === "borrow" && <BorrowList />}
      </LoanNFTBox>
    </LoanWrapper>
  );
};

export default Loan;
