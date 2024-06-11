import { styled } from "styled-components";

import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";

import BorrowList from "./Borrow/BorrowList";

const LoanList = () => {
  const { address } = useTonConnect();
  const { nftList } = useStakeInfo(address);

  return (
    <LoanListWrapper>
      <LoanNav>
        <LoanNavButton>Borrowing</LoanNavButton>
        <LoanNavButton disabled type="repay">
          NFTs to repay
        </LoanNavButton>
      </LoanNav>
      {nftList && nftList.length > 0 ? (
        nftList
          .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
          .map(item => <BorrowList key={item.nftId} item={item} />)
      ) : (
        <EmptyText>You need a staked NFT to borrow NXT</EmptyText>
      )}
    </LoanListWrapper>
  );
};

export default LoanList;

const LoanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const LoanNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
  margin-bottom: 1.8rem;
`;

const LoanNavButton = styled.button<{ type?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0.8rem 1rem;

  border: none;
  border-radius: 3rem;
  background-color: ${({ type }) => (type === "repay" ? "#F9F9FF" : "#fff")};
  color: ${({ type }) => (type === "repay" ? "#76797a" : "#007aff")};
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};
  box-shadow: 0px 4px 4px 0px rgba(225, 228, 230, 0.5);

  cursor: pointer;
  outline: none;
`;

const EmptyText = styled.span`
  margin-top: 5rem;

  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
