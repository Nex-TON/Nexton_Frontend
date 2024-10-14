import { styled } from "styled-components";

import NftPreviewExpired from "@/assets/image/NftPreviewExpired.png";
import { IUnstakingDetailData } from "@/hooks/api/unstaking/useUnstakingDetail";

const UnstakingPreview = ({ unstakingDetail }: { unstakingDetail?: IUnstakingDetailData }) => {
  return (
    <UnstakingPreviewWrapper>
      <UnstakingPreviewImageWrapper>
        <img src={NftPreviewExpired} alt="expired" />

        <UnstakingPreviewTop>
          <UnstakingPreviewTopDateWrapper>
            <UnstakingPreviewTopDate>
              Expiry {new Date(unstakingDetail?.unstakableDate).toLocaleDateString()}
            </UnstakingPreviewTopDate>
          </UnstakingPreviewTopDateWrapper>
        </UnstakingPreviewTop>
        <UnstakingPreviewBottom>
          <UnstakingPreviewBottomTitle>
            NFT ID {String(unstakingDetail?.nftId).padStart(5, "0")}
          </UnstakingPreviewBottomTitle>
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
    border-radius: 2rem;
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

const UnstakingPreviewBottomTitle = styled.span`
  color: #1b1e1f;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};

  margin-bottom: 2rem;
`;

const UnstakingPreviewTopDateWrapper = styled.div`
  position: relative;
  left: -10px;
  padding: 8px 18px 7px 14px;
  align-items: center;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%), rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
`;

const UnstakingPreviewTopDate = styled.span`
  color: #2f3038;
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
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;
