import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IcAlert from "@/assets/icons/Loan/ic_alert.svg";
// import DropdownMenu from "@/components/common/DropdownMenu";
import BorrowList from "@/components/loan/Borrow/BorrowList";
import RepayList from "@/components/loan/Repay/RepayList";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import { useWalletData } from "@/context/WalletConnectionProvider";
import IcArrowRight from "@/assets/icons/Loan/ic_arrow_right_black.svg";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";
import useBorrowNftListFilter from "./hook/useBorrowNftListFilter";

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
  const { address } = useWalletData();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterNFTs>("All");
  const [view, setView] = useState<LoanView>("borrow");
  const { nftList } = useStakeInfo(address);
  const { borrowList } = useRepayNftList(address);
  const { handlePrintBorrowListFilter } = useBorrowNftListFilter();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

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

        <LoanHeaderBoxButton onClick={() => navigate("/loan/risk-disclosure")} id="loan page risk icon button">
          <img src={IcAlert} alt="alert_icon" id="loan page risk icon button"/>
        </LoanHeaderBoxButton>
      </LoanHeaderBox>

      <LoanSwitcherBox>
        <LoanSwitcherBoxItem $isActive={view === "borrow"} onClick={() => handleViewChange("borrow")} id="loan page borrow button">
          Borrow
        </LoanSwitcherBoxItem>
        <LoanSwitcherBoxItem $isActive={view === "repay"} onClick={() => handleViewChange("repay")} id="loan page reapy button">
          Repay
        </LoanSwitcherBoxItem>
      </LoanSwitcherBox>

      <LoanNFTBox>
        <LoanNFTBoxHeader>
          <LoanNFTBoxHeaderLeft>
            <span>You have</span>
            {view === "borrow" && <h4>{nftList?.length || 0} NFTs</h4>}
            {view === "repay" && (
              <h4>{handlePrintBorrowListFilter()?.filter(item => item.status == 0).length || 0} Loans</h4>
            )}
          </LoanNFTBoxHeaderLeft>
          <LoanNFTBoxHeaderRight
            onClick={() => {
              navigate("/loan/history");
            }}
            id="go to loan history"
          >
            <h4 id="go to loan history">
              <span>Go to </span>Loan History
            </h4>
            <img src={IcArrowRight} alt="arrow right to loan history" id="go to loan history"/>
            {/* <DropdownMenu options={filters} defaultValue={filter} onOptionSelect={handleSortOptionChange} /> */}
          </LoanNFTBoxHeaderRight>
        </LoanNFTBoxHeader>

        {view === "borrow" && <BorrowList filter={filter} nftList={nftList} />}
        {view === "repay" && <RepayList borrowList={borrowList} />}
      </LoanNFTBox>
    </LoanWrapper>
  );
};

export default Loan;
