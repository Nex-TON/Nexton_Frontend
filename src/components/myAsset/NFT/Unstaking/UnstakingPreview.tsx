import { styled } from "styled-components";
import NftPreviewExpired from "../../../../assets/image/NftPreviewExpired.png";

const UnstakingPreview = () => {
  return (
    <UnstakingPreviewWrapper>
      <UnstakingPreviewImageWrapper>
        <img src={NftPreviewExpired} alt="expired" />
        <UnstakingPreviewTop>
          <UnstakingPreviewTopTitle>NFT ID 00000</UnstakingPreviewTopTitle>
          <UnstakingPreviewTopDesc>
            Expired Date dd.mm.yy
          </UnstakingPreviewTopDesc>
        </UnstakingPreviewTop>
        <UnstakingPreviewBottom>
          <UnstakingPreviewBottomDesc>
            When the contract receives
          </UnstakingPreviewBottomDesc>
          <UnstakingPreviewBottomDesc>
            Unstaking transaction,
          </UnstakingPreviewBottomDesc>
          <UnstakingPreviewBottomDesc>
            This NFT will be burned.
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

  width: 100%;
`;

const UnstakingPreviewImageWrapper = styled.div`
  position: relative;
`;

const UnstakingPreviewTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.1rem;
  position: absolute;
  top: 2rem;
  left: 2.5rem;
`;

const UnstakingPreviewTopTitle = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Headline};
`;

const UnstakingPreviewTopDesc = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Medium_1};
`;

const UnstakingPreviewBottom = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 2.1rem;
  left: 2.5rem;
`;
const UnstakingPreviewBottomDesc = styled.p`
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1};
`;
