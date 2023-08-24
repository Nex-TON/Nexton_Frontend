import { css, styled } from "styled-components";
import NFTOngoing from "../../../assets/image/NftOngoing.png";

const DetailNFTPreview = () => {
  return (
    <DetailNFTPreviewWrapper>
      <NFTImageWrapper>
        <NFTImage
          src={NFTOngoing}
          alt="NFTOngoing"
          style={{ width: "100%", height: "100%" }}
        />
        <NFTDDayText>D-Day</NFTDDayText>
        <NFTExpiredDateText>Expired Date</NFTExpiredDateText>
        <NFTExpiredDateText date>dd.mm.yy</NFTExpiredDateText>
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

  background-color: #1a1b23;
`;

const NFTImageWrapper = styled.div`
  position: relative;

  width: 14.2rem;
  height: 16rem;

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

const NFTExpiredDateText = styled.span<{ date?: boolean }>`
  position: absolute;
  bottom: 2.5rem;
  left: 1.3rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};

  ${({ date }) =>
    date &&
    css`
      bottom: 1rem;
    `}
`;
