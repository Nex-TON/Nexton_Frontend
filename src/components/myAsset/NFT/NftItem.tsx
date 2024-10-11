import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { css, styled } from "styled-components";

import NFTExpired from "@/assets/image/MainNftExpired.png";
import NFTForthComing from "@/assets/image/MainNftForthComing.png";
import NFTOngoing from "@/assets/image/MainNftOngoing.png";
import { globalError } from "@/lib/atom/globalError";
import { imageSizeAtom } from "@/lib/atom/imageSize";
import { nftInfo } from "@/types/Nft";
import { getDDayText, getNftState } from "@/utils/getNftState";

interface NftItemProps {
  item: nftInfo;
}

const NftItem = ({ item }: NftItemProps) => {
  const { nftId, unstakableDate } = item;

  const [, setImageSize] = useRecoilState(imageSizeAtom);
  const setError = useSetRecoilState(globalError);
  const navigate = useNavigate();

  useEffect(() => {
    if (!unstakableDate || !nftId) {
      setError(new Error("Error occurred while fetching NFT data"));
    }
  }, [unstakableDate, nftId, setError]);

  const handleImageClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const rect = (event.target as HTMLImageElement).getBoundingClientRect();
      setImageSize({ width: rect?.width, height: rect?.height });
      navigate(`/myasset/${nftId}`);
    },
    [setImageSize, navigate, nftId],
  );

  const SwitchDDayNftImage = useMemo(() => {
    const nftState = getNftState(unstakableDate);
    const imageSrc = nftState === "ongoing" ? NFTOngoing : nftState === "forthcoming" ? NFTForthComing : NFTExpired;
    const altText = `NFT${nftState.charAt(0).toUpperCase() + nftState.slice(1)}`;

    return (
      <NFTImage src={imageSrc} alt={altText} style={{ width: "100%", height: "100%" }} onClick={handleImageClick} />
    );
  }, [unstakableDate, handleImageClick]);

  return (
    <NFTItemWrapper>
      {SwitchDDayNftImage}
      <NFTDayText>{getDDayText(unstakableDate)}</NFTDayText>
      <NFTExpiredDateText>Expired Date</NFTExpiredDateText>
      <NFTExpiredDateText $date>{new Date(unstakableDate).toLocaleDateString()}</NFTExpiredDateText>
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

const NFTDayText = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.7rem;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
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
