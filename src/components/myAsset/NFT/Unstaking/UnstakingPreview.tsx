import { styled } from "styled-components";

import NftPreviewExpired from "../../../../assets/image/NftPreviewExpired.png";
import { nftInfo } from "../../../../types/Nft";
import { expiredDateChanger } from "../../../../utils/dateChanger";

interface UnstakingPreviewProps {
  item: nftInfo;
}

const UnstakingPreview = (props: UnstakingPreviewProps) => {
  const { nftId, timeStamp, lockPeriod } = props.item;

  return (
    <UnstakingPreviewWrapper>
      <UnstakingPreviewImageWrapper>
        <img src={NftPreviewExpired} alt="expired" />
        <UnstakingPreviewTop>
          <UnstakingPreviewTopTitle>
            NFT ID {String(nftId).padStart(5, "0")}
          </UnstakingPreviewTopTitle>
          <UnstakingPreviewTopDesc>
            Expired Date {expiredDateChanger(timeStamp, lockPeriod, "detail")}
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

  width: 100%;

  @media (max-width: 500px) {
    padding: 0 1.7rem;
  }

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
  left: 4.5rem;
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
  left: 4.5rem;
`;
const UnstakingPreviewBottomDesc = styled.p`
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1};
`;
