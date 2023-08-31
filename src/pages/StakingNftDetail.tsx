import { styled } from "styled-components";
import BackButton from "../components/common/BackButton";
import DetailNFTPreview from "../components/myAsset/detail/DetailNFTPreview";
import DetailNftInfo from "../components/myAsset/detail/DetailNFTInfo";
import { useNavigate } from "react-router-dom";

const StakingNftDetail = () => {
  const navigate = useNavigate();

  const handleMoveUnstaking = () => {
    navigate("/unstaking/1");
  };

  return (
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

export default StakingNftDetail;

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
