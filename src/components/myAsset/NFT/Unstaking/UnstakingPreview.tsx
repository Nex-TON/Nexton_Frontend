import { styled } from "styled-components";

import NftPreviewExpired from "@/assets/image/NftPreviewExpired.png";
import { nftInfo } from "@/types/Nft";

const UnstakingPreview = ({ nftDetail }: { nftDetail: nftInfo | undefined }) => {
  return (
    <UnstakingPreviewWrapper>
      <UnstakingPreviewImageWrapper>
        <img src={NftPreviewExpired} alt="expired" />

        <UnstakingPreviewTop>
          <UnstakingPreviewTopTitle>NFT ID {String(nftDetail?.nftId).padStart(5, "0")}</UnstakingPreviewTopTitle>
          <UnstakingPreviewTopDesc>Expired Date {nftDetail?.unstakableDate}</UnstakingPreviewTopDesc>
        </UnstakingPreviewTop>
        <UnstakingPreviewBottom>
          <UnstakingPreviewBottomDesc>
            When the contract receives unstaking transaction, This NFT will be burned.
          </UnstakingPreviewBottomDesc>
        </UnstakingPreviewBottom>
      </UnstakingPreviewImageWrapper>
    </UnstakingPreviewWrapper>
  );
};

export default UnstakingPreview;

const UnstakingPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 2rem;

  width: 100%;
`;

const UnstakingPreviewImageWrapper = styled.div`
  position: relative;

  width: 100%;

  img {
    width: 100%;
  }
`;

const UnstakingPreviewTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.1rem;
  position: absolute;
  top: 3rem;
  left: 3.5rem;
`;

const UnstakingPreviewTopTitle = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
`;

const UnstakingPreviewTopDesc = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
`;

const UnstakingPreviewBottom = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 2.1rem;
  left: 3.5rem;
`;
const UnstakingPreviewBottomDesc = styled.p`
  width: 240px;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;
