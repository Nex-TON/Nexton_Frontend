import { css, styled } from "styled-components";
import NFTPreview from "../../../assets/image/NftPreview.png";
import { lockUpDateChanger } from "../../../utils/dateChanger";

interface NftPreviewImageProps {
  lockup: number;
}

const NftPreviewImage = (props: NftPreviewImageProps) => {
  const { lockup } = props;

  return (
    <NftPreviewImageWrapper>
      <NFTPreviewImageBox src={NFTPreview} alt="NFTPreview" />
      <NFTPreviewImageText type="top">D-{lockup}</NFTPreviewImageText>
      <NFTPreviewImageText type="bottom">
        Expired Date {lockUpDateChanger(lockup, "expired")}
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
  height: 22rem;

  border-radius: 1rem;
`;

const NFTPreviewImageText = styled.span<{ type: string }>`
  position: absolute;
  ${({ type }) =>
    type === "top"
      ? css`
          top: 2.5rem;
        `
      : css`
          bottom: 2.5rem;
        `}
  left: 2.8rem;

  color: #fff;
  ${({ type }) =>
    type === "top"
      ? css`
          ${({ theme }) => theme.fonts.Nexton_Title_Medium};
        `
      : css`
          ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
        `}
`;
