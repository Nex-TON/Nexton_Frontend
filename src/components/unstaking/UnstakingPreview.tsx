import { styled } from "styled-components";

import NftPreviewExpired from "@/assets/image/NftPreviewExpired.png";
import { IUnstakingDetailData } from "@/hooks/api/unstaking/useUnstakingDetail";

const UnstakingPreview = ({ unstakingDetail }: { unstakingDetail?: IUnstakingDetailData }) => {
  return (
    <UnstakingPreviewWrapper>
      <UnstakingPreviewImageWrapper>
        <img src={NftPreviewExpired} alt="expired" />

        <UnstakingPreviewTop>
          <UnstakingPreviewTopTitle>
            NFT ID {String(unstakingDetail?.nftId).padStart(5, "0")}
          </UnstakingPreviewTopTitle>
          <UnstakingPreviewTopDateWrapper>
            <UnstakingPreviewTopDate>
              Expired date {new Date(unstakingDetail?.unstakableDate).toLocaleDateString()}
            </UnstakingPreviewTopDate>
          </UnstakingPreviewTopDateWrapper>
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
    border-radius: 1.5rem;
  }
`;

const UnstakingPreviewTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 3rem;
  left: 3.5rem;
`;

const UnstakingPreviewTopTitle = styled.span`
  color: #FFF;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};

  margin-bottom: 7px;
`;

const UnstakingPreviewTopDateWrapper = styled.div`
  position: relative;
`;

const UnstakingPreviewTopDate = styled.span`
  color: #FFF;
  /* body text/small2 */
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 161.538% */
  letter-spacing: -0.052px;
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
  color: #FFF;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;