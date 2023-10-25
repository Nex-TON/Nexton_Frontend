import { css, styled } from "styled-components";
import NFTPreview from "../../../assets/image/MainNftOngoing.png";
import { lockUpDateChanger } from "../../../utils/dateChanger";

interface NftPreviewImageProps {
  lockup: number;
}

const NftPreviewImage = (props: NftPreviewImageProps) => {
  const { lockup } = props;

  return (
    <NftPreviewImageWrapper>
      <NFTPreviewImageBoxWrapper>
        <NFTPreviewImageBox src={NFTPreview} alt="NFTPreview" />
        <NFTPreviewImageText>D-{lockup}</NFTPreviewImageText>
        <NFTPreviewTextBottomBox>
          <p>Expired Date</p>
          <p>{lockUpDateChanger(lockup, "expired")}</p>
        </NFTPreviewTextBottomBox>
      </NFTPreviewImageBoxWrapper>
    </NftPreviewImageWrapper>
  );
};

export default NftPreviewImage;

const NftPreviewImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2rem 0;

  background-color: #1a1b23;
`;

const NFTPreviewImageBoxWrapper = styled.div`
  position: relative;
`;

const NFTPreviewImageBox = styled.img`
  width: 15rem;
  height: 16rem;
  border-radius: 2rem;
`;

const NFTPreviewImageText = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.7rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;

const NFTPreviewTextBottomBox = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    color: #fff;
    ${({ theme }) => theme.fonts.Telegram_Caption_2};
  }
`;
