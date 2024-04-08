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
    <MainNftViewItemImg src={MainNFTOngoing} onClick={handleMoveNftDetail}>
      <MainNftViewItemDDayText>D-{DDayChange(timeStamp, lockPeriod)}</MainNftViewItemDDayText>
    </MainNftViewItemImg>
  ) : DDayChange(timeStamp, lockPeriod) > 0 ? (
    <MainNftViewItemImg src={MainNFTForthComing} onClick={handleMoveNftDetail}>
      <MainNftViewItemDDayText>D-{DDayChange(timeStamp, lockPeriod)}</MainNftViewItemDDayText>
    </MainNftViewItemImg>
  ) : (
    <MainNftViewItemImg src={MainNftExpired} onClick={handleMoveNftDetail}>
      <MainNftViewItemDDayText>
        {DDayChange(timeStamp, lockPeriod) === 0 ? `D-Day` : `D+${DDayChange(timeStamp, lockPeriod) * -1}`}
      </MainNftViewItemDDayText>
    </MainNftViewItemImg>
  );
};

export default StakeViewNFTsItem;

const MainNftViewItemImg = styled(MainStakeViewBox)<{ src: string }>`
  background: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MainNftViewItemDDayText = styled.span`
  position: absolute;
  top: 1rem;
  left: 1.7rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;
