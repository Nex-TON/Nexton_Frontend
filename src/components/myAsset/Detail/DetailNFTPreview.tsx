import { css, styled } from "styled-components";
import NFTOngoing from "../../../assets/image/MainNftOngoing.png";
import NFTForthComing from "../../../assets/image/MainNftForthComing.png";
import NFTExpired from "../../../assets/image/MainNftExpired.png";
import { useRecoilValue } from "recoil";
import { imageSizeAtom } from "../../../lib/atom/imageSize";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";
import { nftInfo } from "../../../types/Nft";

interface DetailNFTPreviewProps {
  item: nftInfo;
}

const DetailNFTPreview = (props: DetailNFTPreviewProps) => {
  const { item } = props;
  const { timeStamp, lockPeriod } = item;
  const imageSize = useRecoilValue(imageSizeAtom);

  const SwitchDDayNftImage = () => {
    if (DDayChange(timeStamp, lockPeriod) > 15) {
      return (
        <NFTImage
          src={NFTOngoing}
          alt="NFTOngoing"
          // style={{
          //   width: `${imageSize.width}px`,
          //   height: `${imageSize.height}px`,
          // }}
        />
      );
    } else if (DDayChange(timeStamp, lockPeriod) > 0) {
      return (
        <NFTImage
          src={NFTForthComing}
          alt="NFTForthComing"
          // style={{
          //   width: `${imageSize.width}px`,
          //   height: `${imageSize.height}px`,
          // }}
        />
      );
    } else {
      return (
        <NFTImage
          src={NFTExpired}
          alt="NFTExpired"
          // style={{
          //   width: `${imageSize.width}px`,
          //   height: `${imageSize.height}px`,
          // }}
        />
      );
    }
  };

  return (
    <DetailNFTPreviewWrapper>
      <NFTImageWrapper>
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

  border-radius: 2rem;
`;

const NFTImage = styled.img`
  border-radius: 2rem;
  width: 15rem;
  height: 16rem;
`;

const NFTDDayText = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;

const NFTExpiredDateText = styled.span<{ $date?: boolean }>`
  position: absolute;
  bottom: 2.5rem;
  left: 1.5rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};

  ${({ $date }) =>
    $date &&
    css`
      bottom: 1rem;
    `}
`;
