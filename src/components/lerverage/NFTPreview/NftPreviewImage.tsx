import { css, styled } from "styled-components";
import NFTPreview from "../../../assets/image/NftPreview.png";

const NftPreviewImage = () => {
  return (
    <NftPreviewImageWrapper>
      <NFTPreviewImageBox src={NFTPreview} alt="NFTPreview" />
      <NFTPreviewImageText type="top">D-Day</NFTPreviewImageText>
      <NFTPreviewImageText type="bottom">
        Expired Date dd.mm.yy
      </NFTPreviewImageText>
    </NftPreviewImageWrapper>
  );
};

export default NftPreviewImage;

const NftPreviewImageWrapper = styled.div`
  position: relative;

  width: 100%;
`;

const NFTPreviewImageBox = styled.img`
  width: 100%;
  height: 100%;
`;

const NFTPreviewImageText = styled.span<{ type: string }>`
  position: absolute;
  color: #fff;

  ${({ type }) =>
    type === "top"
      ? css`
          top: 2.1rem;
          left: 2.8rem;
          ${({ theme }) => theme.fonts.Telegram_SemiBold};
        `
      : css`
          top: 6.1rem;
          left: 2.8rem;
          ${({ theme }) => theme.fonts.Telegram_Medium_1};
        `}
`;
