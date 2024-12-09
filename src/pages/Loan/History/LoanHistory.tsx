import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RepaysEmpty from "@/assets/image/Loan/RepaysEmpty.png";
import {
  BorrowListItemBox,
  BorrowListWrapper,
  LoanNFTBoxListEmpty,
  LoanNFTBoxListEmptyLink,
} from "@/components/loan/Borrow/BorrowList.styled";
import HistoryListItem from "@/components/loan/History/HistoryListItem";

import { LoanHeaderBox, LoanHeaderBoxTitle, LoanWrapper } from "../Loan.styled";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";
import useTonConnect from "@/hooks/contract/useTonConnect";

const tele = (window as any).Telegram.WebApp;

// const _LoanHistoryMock = [
//   {
//     nftId: 1,
//     amount: 1000,
//     due: "2025-03-01T12:00:00Z",
//   },
//   {
//     nftId: 2,
//     amount: 3000,
//     due: "2025-04-01T12:00:00Z",
//   },
//   {
//     nftId: 3,
//     amount: 3100,
//     due: "2025-06-01T12:00:00Z",
//   },
// ];

// ! Data is currently mocked
const LoanHistory = () => {
  const navigate = useNavigate();
  const {address}=useTonConnect();
  const {borrowList}=useRepayNftList(address);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  return (
    <LoanWrapper>
      <LoanHeaderBox>
        <LoanHeaderBoxTitle>
          <h1>Loan history</h1>
        </LoanHeaderBoxTitle>
      </LoanHeaderBox>

      <BorrowListWrapper>
        {borrowList && borrowList.length > 0 ? (
          <BorrowListItemBox>
            {borrowList
              .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
              .map(item => (
                <HistoryListItem status={item.status} principal={item.principal} interestRate={item.interestRate} ltv={item.loanToValue} loanId={item.loanId} nftId={item.nftId}/>
              ))}
          </BorrowListItemBox>
        ) : (
          <LoanNFTBoxListEmpty>
            <img src={RepaysEmpty} alt="repays_empty" />
            <h2>No results</h2> 
            <LoanNFTBoxListEmptyLink>There are no borrowed records.</LoanNFTBoxListEmptyLink>
          </LoanNFTBoxListEmpty>
        )}
      </BorrowListWrapper>
    </LoanWrapper>
  );
};

export default LoanHistory;
