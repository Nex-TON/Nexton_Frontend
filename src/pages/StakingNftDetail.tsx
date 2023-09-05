import { styled } from "styled-components";
import DetailNFTPreview from "../components/myAsset/detail/DetailNFTPreview";
import DetailNftInfo from "../components/myAsset/detail/DetailNFTInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNFTDetail } from "../api/getNFTDetail";

const tele = (window as any).Telegram.WebApp;

const StakingNftDetail = () => {
  const [stakedNftDetail, setStakedNftDetail] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getStakedNftDetail = async () => {
    const response = await getNFTDetail(Number(id));
    setStakedNftDetail(response);
  };

  const handleMoveUnstaking = () => {
    navigate("/unstaking/1");
  };

  useEffect(() => {
    getStakedNftDetail();
  }, [id]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/myasset");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    stakedNftDetail &&
    stakedNftDetail.length > 0 && (
      <DetailWrapper>
        <DetailHeader>Staking NFT</DetailHeader>
        <DetailNFTPreview item={stakedNftDetail[0]} />
        <DetailNftInfo
          handleMoveUnstaking={handleMoveUnstaking}
          item={stakedNftDetail[0]}
        />
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
