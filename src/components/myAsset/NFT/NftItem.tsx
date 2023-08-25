import { css, styled } from "styled-components";
import NFTOngoing from "../../../assets/image/NftOngoing.png";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { imageSizeAtom } from "../../../lib/atom/imageSize";

const NftItem = ({ handleMoveDetail }: { handleMoveDetail?: () => void }) => {
  const [imageSize, setImageSize] = useRecoilState(imageSizeAtom);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    setImageSize({ width: rect?.width, height: rect?.height });
  };

  return (
    <NFTItemWrapper onClick={handleMoveDetail}>
      <NFTImage
        src={NFTOngoing}
        alt="NFTOngoing"
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={handleMouseMove}
      />
      <NFTDDayText>D-Day</NFTDDayText>
      <NFTExpiredDateText>Expired Date</NFTExpiredDateText>
      <NFTExpiredDateText date>dd.mm.yy</NFTExpiredDateText>
    </NFTItemWrapper>
  );
};

export default NftItem;

const NFTItemWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1.1;

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
