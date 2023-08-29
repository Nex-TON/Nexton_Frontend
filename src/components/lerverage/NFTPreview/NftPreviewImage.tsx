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
  height: 100%;
`;

const NFTPreviewImageText = styled.span<{ type: string }>`
  position: absolute;
  top: 2.5rem;
  left: 2.8rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Medium_1};
`;
