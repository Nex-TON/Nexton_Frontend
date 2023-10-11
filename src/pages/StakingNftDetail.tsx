import { styled } from "styled-components";
import DetailNFTPreview from "../components/myAsset/detail/DetailNFTPreview";
import DetailNftInfo from "../components/myAsset/detail/DetailNFTInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNFTDetail } from "../hooks/api/useNFTDetail";

const tele = (window as any).Telegram.WebApp;

const StakingNftDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { nftDetail } = useNFTDetail(Number(id));

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/myasset/nftlist");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    nftDetail &&
    nftDetail.length > 0 && (
      <DetailWrapper>
        <DetailHeader>Staking NFT</DetailHeader>
        <DetailNFTPreview item={nftDetail[0]} />
        <DetailNftInfo item={nftDetail[0]} />
      </DetailWrapper>
    )
  );
};

export default StakingNftDetail;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #f2f2f7;
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
