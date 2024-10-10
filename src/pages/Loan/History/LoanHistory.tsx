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

const tele = (window as any).Telegram.WebApp;

const _LoanHistoryMock = [
  {
    nftId: 1,
    amount: 1000,
    due: "2025-03-01T12:00:00Z",
  },
  {
    nftId: 2,
    amount: 3000,
    due: "2025-04-01T12:00:00Z",
  },
  {
    nftId: 3,
    amount: 3100,
    due: "2025-06-01T12:00:00Z",
  },
];

// ! Data is currently mocked
const LoanHistory = () => {
  const navigate = useNavigate();

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
        {_LoanHistoryMock && _LoanHistoryMock.length > 0 ? (
          <BorrowListItemBox>
            {_LoanHistoryMock
              .sort((a, b) => Number(b.due) - Number(a.due))
              .map(item => (
                <HistoryListItem />
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
