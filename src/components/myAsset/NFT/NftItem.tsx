import { css, styled } from "styled-components";
import NFTOngoing from "../../../assets/image/MainNftOngoing.png";
import NFTForthComing from "../../../assets/image/MainNftForthComing.png";
import NFTExpired from "../../../assets/image/MainNftExpired.png";
import { useRecoilState } from "recoil";
import { imageSizeAtom } from "../../../lib/atom/imageSize";
import { useNavigate } from "react-router-dom";
import { nftInfo } from "../../../types/Nft";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";

interface NftItemProps {
  item: nftInfo;
  icon?: string;
}

const NftItem = (props: NftItemProps) => {
  const { item, icon } = props;
  const { nftId, timeStamp, lockPeriod } = item;

  const [, setImageSize] = useRecoilState(imageSizeAtom);

  const navigate = useNavigate();

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    setImageSize({ width: rect?.width, height: rect?.height });
    navigate(icon ? `/using/${nftId}` : `/myasset/${nftId}`);
  };

  const SwitchDDayNftImage = () => {
    if (DDayChange(timeStamp, lockPeriod) > 15) {
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
    <NFTItemWrapper>
      {SwitchDDayNftImage()}
      <NFTDDayText>
        {DDayChange(timeStamp, lockPeriod) > 0
          ? `D-${DDayChange(timeStamp, lockPeriod)}`
          : DDayChange(timeStamp, lockPeriod) === 0
          ? `D-Day`
          : `D+${DDayChange(timeStamp, lockPeriod) * -1}`}
      </NFTDDayText>
      {icon && <Icon src={icon} />}
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
  height: 100%;
  aspect-ratio: 1/1.1;

  border-radius: 2rem;
`;

const NFTImage = styled.img`
  border-radius: 2rem;
`;

const NFTDDayText = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.7rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;

const Icon = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  filter: drop-shadow(
    2.2467761039733887px 2.9815726280212402px 7.4666666984558105px
      rgba(18, 33, 34, 0.31)
  );
`;

const NFTExpiredDateText = styled.span<{ $date?: boolean }>`
  position: absolute;
  bottom: 2.7rem;
  left: 1.7rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};

  ${({ $date }) =>
    $date &&
    css`
      bottom: 1.3rem;
    `}
`;
