import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { css, styled } from "styled-components";
import { useMemo } from "react";

import NFTExpired from "@/assets/image/NFT_NEW/NFT_Expired.png";
import NFTOngoing from "@/assets/image/NFT_NEW/NFT_Ongoing.png";
import { imageSizeAtom } from "../../../lib/atom/imageSize";
import { nftInfo } from "../../../types/Nft";
import { getDDayText, getNftState } from "@/utils/getNftState";
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import { limitDecimals } from "@/utils/limitDecimals";

interface NftItemProps {
  item: nftInfo;
}

const NftItem = (props: NftItemProps) => {
  const { item } = props;
  const { nftId, unstakableDate, principal } = item;
  const [, setImageSize] = useRecoilState(imageSizeAtom);
  const { data: coinPrice } = useCoinPrice("TON", "USD");
  const navigate = useNavigate();

  const convertAmount = useMemo(() => {
    return (amount: string | number) => {
      if (coinPrice && amount) {
        return `$${limitDecimals(coinPrice?.rates?.TON?.prices?.USD * Number(amount), 2)}`;
      }
      return "$0.00";
    };
  }, [coinPrice]);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    setImageSize({ width: rect?.width, height: rect?.height });
    navigate(`/myasset/${nftId}`);
  };

  const SwitchDDayNftImage = () => {
    if (getNftState(unstakableDate) === "ongoing") {
      return (
        <NFTImage
          src={NFTOngoing}
          alt="NFTOngoing"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleMouseMove}
          id="nftitem"
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
          id="nftitem"
        />
      );
    }
  };

  return (
    <NFTItemWrapper id="nftitem">
      <NftIdTag>
        ID<span>{nftId}</span>
      </NftIdTag>
      {SwitchDDayNftImage()}
      <NFTBottomINfoWrapper>
        <TopInfo>
          <p>{getDDayText(unstakableDate)}</p> <p>{principal} TON</p>
        </TopInfo>
        <BottomInfo>
          <p>{new Date(unstakableDate).toLocaleDateString()}</p>
          <p>{convertAmount(principal)}</p>
        </BottomInfo>
      </NFTBottomINfoWrapper>
    </NFTItemWrapper>
  );
};

export default NftItem;

const NftIdTag = styled.div`
  position: absolute;
  top: 1.4rem;
  border-radius: 0px 5px 5px 0px;
  background: rgba(0, 0, 0, 0.10);

  gap: 0.5rem;
  padding: 0.2rem 0.6rem 0.2rem 1.2rem;
  display: flex;
  justify-content: flex-end;

  color: rgba(255, 255, 255, 0.4);
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3}

  span {
    color: white;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2}
  }
`;

const BottomInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: white;
  }
`;

const NFTBottomINfoWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: auto;
  width: 100%;
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;

  padding: 1.1rem 1.5rem;
  border-radius: 0 0 1rem 1rem;
`;

const NFTItemWrapper = styled.div`
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  aspect-ratio: 172/213;
`;

const NFTImage = styled.img`
  border-radius: 1rem;
  margin: 0;
`;
