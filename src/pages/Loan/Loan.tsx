import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IcAlert from "@/assets/icons/Loan/ic_alert.svg";
import IcBars from "@/assets/icons/Loan/ic_bars.svg";
import DropdownMenu from "@/components/common/DropdownMenu";
import BorrowList from "@/components/loan/Borrow/BorrowList";
import RepayList from "@/components/loan/Repay/RepayList";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";

import {
  LoanHeaderBox,
  LoanHeaderBoxButton,
  LoanHeaderBoxTitle,
  LoanNFTBox,
  LoanNFTBoxHeader,
  LoanNFTBoxHeaderLeft,
  LoanNFTBoxHeaderRight,
  LoanSwitcherBox,
  LoanSwitcherBoxItem,
  LoanSwitcherBoxTooltip,
  LoanWrapper,
} from "./Loan.styled";

type LoanView = "borrow" | "repay";
export type FilterNFTs = "Ongoing" | "Forthcoming" | "Expired" | "All";

const tele = (window as any).Telegram.WebApp;

const filters: FilterNFTs[] = ["Ongoing", "Forthcoming", "Expired", "All"];

const Loan = () => {
  const { address } = useTonConnect();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterNFTs>("All");
  const [view, setView] = useState<LoanView>("borrow");
  const { nftList } = useStakeInfo(address);

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

  const handleSortOptionChange = value => {
    setFilter(value);
  };

  return (
    <LoanWrapper>
      <LoanHeaderBox>
        <LoanHeaderBoxTitle>
          <h1>Loan</h1>
        </LoanHeaderBoxTitle>

        <LoanHeaderBoxButton onClick={() => navigate("/loan/history")}>
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
          <LoanNFTBoxHeaderLeft>
            <span>You have</span>
            <h4>0 NFTs</h4>
          </LoanNFTBoxHeaderLeft>

          {view === "borrow" && (
            <LoanNFTBoxHeaderRight>
              <span>Sort by</span>
              <DropdownMenu options={filters} defaultValue={filter} onOptionSelect={handleSortOptionChange} />
            </LoanNFTBoxHeaderRight>
          )}
        </LoanNFTBoxHeader>

        {view === "borrow" && <BorrowList filter={filter} nftList={nftList} />}
        {view === "repay" && <RepayList />}
      </LoanNFTBox>
    </LoanWrapper>
  );
};

export default Loan;
