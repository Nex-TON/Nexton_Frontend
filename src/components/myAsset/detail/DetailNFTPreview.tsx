import { css, styled } from "styled-components";
import NFTOngoing from "../../../assets/image/NftOngoing.png";
import { useRecoilValue } from "recoil";
import { imageSizeAtom } from "../../../lib/atom/imageSize";

const DetailNFTPreview = () => {
  const imageSize = useRecoilValue(imageSizeAtom);

  return (
    <DetailNFTPreviewWrapper>
      <NFTImageWrapper>
        <NFTImage
          src={NFTOngoing}
          alt="NFTOngoing"
          style={{
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
          }}
        />
        <NFTDDayText>D-Day</NFTDDayText>
        <NFTExpiredDateText>Expired Date</NFTExpiredDateText>
        <NFTExpiredDateText $date>dd.mm.yy</NFTExpiredDateText>
      </NFTImageWrapper>
    </DetailNFTPreviewWrapper>
  );
};

export default DetailNFTPreview;

const DetailNFTPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem 0;

  @media (max-width: 375px) {
    padding: 2rem 0;
  }

  @media (max-width: 500px) {
    padding: 3rem 0;
  }

  background-color: #1a1b23;
`;

const NFTImageWrapper = styled.div`
  position: relative;

  border-radius: 1rem;
`;

const NFTImage = styled.img`
  border-radius: 1rem;
`;

const NFTDDayText = styled.span`
  position: absolute;
  top: 1.3rem;
  left: 1.3rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
`;

const NFTExpiredDateText = styled.span<{ $date?: boolean }>`
  position: absolute;
  bottom: 2.5rem;
  left: 1.3rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};

  ${({ $date }) =>
    $date &&
    css`
      bottom: 1rem;
    `}
`;
