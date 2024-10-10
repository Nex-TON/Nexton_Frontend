import { styled } from "styled-components";

import NFTPreview from "@/assets/image/NftPreviewOngoing.png";
import { lockUpDateChanger } from "@/utils/dateChanger";

interface NftPreviewImageProps {
  lockup: number;
}

const NftPreviewImage = (props: NftPreviewImageProps) => {
  const { lockup } = props;

  return (
    <NftPreviewImageWrapper>
      <NFTPreviewImageBoxWrapper>
        <NFTPreviewImageBox src={NFTPreview} alt="NFTPreview" />

        <NFTPreviewTextBottomBox>
          <NFTPreviewImageText>D-{lockup}</NFTPreviewImageText>
          <div>
            <p>Expired Date</p>
            <p>{lockUpDateChanger(lockup, "expired")}</p>
          </div>
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
  width: 34rem;
  height: 22rem;
  border-radius: 2rem;
`;

const NFTPreviewImageText = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};

  margin-bottom: 0.5rem;
`;

const NFTPreviewTextBottomBox = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    color: #fff;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 183.333% */
  }
`;
