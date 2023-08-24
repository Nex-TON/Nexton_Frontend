import { styled } from "styled-components";
import BackButton from "../../common/BackButton";
import DetailNFTPreview from "./DetailNFTPreview";
import DetailNftInfo from "./DetailNFTInfo";
import { useState } from "react";
import Unstaking from "../unstaking/Unstaking";

const Detail = () => {
  const [isMoveUnstaking, setIsMoveUnstaking] = useState(false);

  const handleMoveUnstaking = () => {
    setIsMoveUnstaking((prev) => !prev);
  };
  return isMoveUnstaking ? (
    <Unstaking handleMoveUnstaking={handleMoveUnstaking} />
  ) : (
    <DetailWrapper>
      <DetailHeader>
        <BackButton />
        Staking NFT
      </DetailHeader>
      <DetailNFTPreview />
      <DetailNftInfo handleMoveUnstaking={handleMoveUnstaking} />
    </DetailWrapper>
  );
};

export default Detail;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding-top: 2.9rem;
  padding-bottom: 1.8rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;
