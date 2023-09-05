import { css, styled } from "styled-components";
import BorrowList from "./borrow/BorrowList";
import useTonConnect from "../../hooks/useTonConnect";
import { useEffect, useState } from "react";
import { getAllStakeInfo } from "../../api/getAllStakeInfo";

const LoanList = () => {
  const { address } = useTonConnect();
  const [stakedInfo, setStakedInfo] = useState([]);

  const handleGetStakedInfo = async (address: string) => {
    const response = await getAllStakeInfo(address);
    setStakedInfo(response);
  };

  useEffect(() => {
    if (address) {
      handleGetStakedInfo(address);
    }
  }, [address]);

  return (
    <LoanListWrapper>
      <LoanNav>
        <LoanNavButton>Borrowing</LoanNavButton>
        <LoanNavButton disabled type="repay">
          NFTs to repay
        </LoanNavButton>
      </LoanNav>
      {stakedInfo && stakedInfo.length > 0 ? (
        stakedInfo
          .sort((a, b) => b.timeStamp - a.timeStamp)
          .map((item) => <BorrowList key={item.nftId} item={item} />)
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
  background-color: #f9f9ff;
  color: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};
  box-shadow: 0px 4px 4px 0px rgba(225, 228, 230, 0.5);

  ${({ type }) =>
    type === "repay" &&
    css`
      color: #76797a;
    `}

  cursor: pointer;
  outline: none;
`;

const EmptyText = styled.span`
  margin-top: 5rem;

  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
