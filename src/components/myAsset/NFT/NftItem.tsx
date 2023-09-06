import { css, styled } from "styled-components";
import NFTOngoing from "../../../assets/image/NftOngoing.png";
import NFTForthComing from "../../../assets/image/NftForthComing.png";
import NFTExpired from "../../../assets/image/NftExpired.png";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { imageSizeAtom } from "../../../lib/atom/imageSize";
import { useNavigate } from "react-router-dom";
import { nftInfo } from "../../../types/Nft";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";

interface NftItemProps {
  item: nftInfo;
}

const NftItem = (props: NftItemProps) => {
  const { item } = props;
  const { nftId, timeStamp, lockPeriod } = item;

  const [, setImageSize] = useRecoilState(imageSizeAtom);

  const navigate = useNavigate();

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    setImageSize({ width: rect?.width, height: rect?.height });
  };

  const handleMoveDetail = () => {
    navigate(`/myasset/${nftId}`);
  };

  const SwitchDDayNftImage = () => {
    if (DDayChange(timeStamp, lockPeriod) > 55) {
      return (
        <NFTImage
          src={NFTOngoing}
          alt="NFTOngoing"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleMouseMove}
        />
      );
    } else if (DDayChange(timeStamp, lockPeriod) > 0) {
      return (
        <NFTImage
          src={NFTForthComing}
          alt="NFTForthComing"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleMouseMove}
        />
      );
    } else {
      return (
        <NFTImage
          src={NFTExpired}
          alt="NFTExpired"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleMouseMove}
        />
      );
    }
  };

  return (
    <NFTItemWrapper onClick={handleMoveDetail}>
      {SwitchDDayNftImage()}
      <NFTDDayText>
        {DDayChange(timeStamp, lockPeriod) > 0
          ? `D-${DDayChange(timeStamp, lockPeriod)}`
          : DDayChange(timeStamp, lockPeriod) === 0
          ? `D-Day`
          : `D+${DDayChange(timeStamp, lockPeriod) * -1}`}
      </NFTDDayText>
      <NFTExpiredDateText>Expired Date</NFTExpiredDateText>
      <NFTExpiredDateText $date>
        {expiredDateChanger(timeStamp, lockPeriod)}
      </NFTExpiredDateText>
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
