import { styled } from "styled-components";
import { nftInfo } from "../../../types/Nft";
import { DDayChange } from "../../../utils/dateChanger";
import MainNFTOngoing from "../../../assets/image/MainNftOngoing.png";
import MainNFTForthComing from "../../../assets/image/MainNftForthComing.png";
import MainNftExpired from "../../../assets/image/MainNftExpired.png";
import { useNavigate } from "react-router-dom";
import { imageSizeAtom } from "../../../lib/atom/imageSize";
import { useRecoilState } from "recoil";

interface MainNftViewItemProps {
  nftItem: nftInfo;
}

const MainNftViewItem = (props: MainNftViewItemProps) => {
  const { nftItem } = props;
  const { timeStamp, lockPeriod, nftId } = nftItem;
  const navigate = useNavigate();
  const [, setImageSize] = useRecoilState(imageSizeAtom);

  const handleMoveNftDetail = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    setImageSize({ width: rect?.width * 1.2, height: rect?.height * 1.3 });
    navigate(`/myasset/${nftId}`);
  };

  return DDayChange(timeStamp, lockPeriod) > 15 ? (
    <MainNftViewItemWrapper onClick={handleMoveNftDetail}>
      <MainNftViewItemImg
        src={MainNFTOngoing}
        alt="MainNFTOngoing"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MainNftViewItemDDayText>
        D-{DDayChange(timeStamp, lockPeriod)}
      </MainNftViewItemDDayText>
    </MainNftViewItemWrapper>
  ) : DDayChange(timeStamp, lockPeriod) > 0 ? (
    <MainNftViewItemWrapper onClick={handleMoveNftDetail}>
      <MainNftViewItemImg
        src={MainNFTForthComing}
        alt="NFTForthComing"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MainNftViewItemDDayText>
        D-{DDayChange(timeStamp, lockPeriod)}
      </MainNftViewItemDDayText>
    </MainNftViewItemWrapper>
  ) : (
    <MainNftViewItemWrapper onClick={handleMoveNftDetail}>
      <MainNftViewItemImg
        src={MainNftExpired}
        alt="NFTExpired"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MainNftViewItemDDayText>
        {DDayChange(timeStamp, lockPeriod) === 0
          ? `D-Day`
          : `D+${DDayChange(timeStamp, lockPeriod) * -1}`}
      </MainNftViewItemDDayText>
    </MainNftViewItemWrapper>
  );
};

export default MainNftViewItem;

const MainNftViewItemWrapper = styled.div`
  position: relative;

  width: 100%;
  border-radius: 2rem;
  aspect-ratio: 1/1.05;
`;

const MainNftViewItemImg = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 2rem;
`;

const MainNftViewItemDDayText = styled.span`
  position: absolute;
  top: 1rem;
  left: 1.7rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;
