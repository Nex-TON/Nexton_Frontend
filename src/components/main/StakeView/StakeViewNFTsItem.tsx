import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import MainNftExpired from "@/assets/image/MainNftExpired.png";
import MainNFTForthComing from "@/assets/image/MainNftForthComing.png";
import MainNFTOngoing from "@/assets/image/MainNftOngoing.png";
import { imageSizeAtom } from "@/lib/atom/imageSize";
import { nftInfo } from "@/types/Nft";
import { DDayChange } from "@/utils/dateChanger";

import { MainStakeViewBox } from "./common/StakeView.styled";

interface MainNftViewItemProps {
  nftItem: nftInfo;
}

const StakeViewNFTsItem = (props: MainNftViewItemProps) => {
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
    <MainStakeViewBox onClick={handleMoveNftDetail}>
      <MainNftViewItemImg
        src={MainNFTOngoing}
        alt="MainNFTOngoing"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MainNftViewItemDDayText>D-{DDayChange(timeStamp, lockPeriod)}</MainNftViewItemDDayText>
    </MainStakeViewBox>
  ) : DDayChange(timeStamp, lockPeriod) > 0 ? (
    <MainStakeViewBox onClick={handleMoveNftDetail}>
      <MainNftViewItemImg
        src={MainNFTForthComing}
        alt="NFTForthComing"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MainNftViewItemDDayText>D-{DDayChange(timeStamp, lockPeriod)}</MainNftViewItemDDayText>
    </MainStakeViewBox>
  ) : (
    <MainStakeViewBox onClick={handleMoveNftDetail}>
      <MainNftViewItemImg
        src={MainNftExpired}
        alt="NFTExpired"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MainNftViewItemDDayText>
        {DDayChange(timeStamp, lockPeriod) === 0 ? `D-Day` : `D+${DDayChange(timeStamp, lockPeriod) * -1}`}
      </MainNftViewItemDDayText>
    </MainStakeViewBox>
  );
};

export default StakeViewNFTsItem;

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
