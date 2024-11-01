import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import IcCardActive from "@/assets/icons/MyAsset/ic_card_active.svg";
import IcCardDisable from "@/assets/icons/MyAsset/ic_card_disable.svg";
import IcCardCheckActive from "@/assets/icons/MyAsset/ic_cardCheck_active.svg";
import IcCardCheckDisable from "@/assets/icons/MyAsset/ic_cardCheck_disable.svg";
import IcCoinsActive from "@/assets/icons/MyAsset/ic_coins_active.svg";
import IcCoinsDisable from "@/assets/icons/MyAsset/ic_coins_disable.svg";

const NftHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <NftHeaderWrapper>
      <NFTHeadingItem onClick={() => navigate("/myasset/nftlist")} id="myasset page nftlist button">
        <NftBox $active={pathname.includes("nftlist")}>
          {pathname.includes("nftlist") ? (
            <img src={IcCardActive} alt="card_active" />
          ) : (
            <img src={IcCardDisable} alt="card_disable" />
          )}
        </NftBox>
        <NFTHeadingItemText>NFT</NFTHeadingItemText>
      </NFTHeadingItem>

      <NFTHeadingItem onClick={() => navigate("/myasset/unstaked")} id="myasset page unstaked button">
        <UnstakingBox $active={pathname.includes("unstaked")}>
          {pathname.includes("unstaked") ? (
            <img src={IcCardCheckActive} alt="cardCheck_active" />
          ) : (
            <img src={IcCardDisable} alt="card_disable" />
          )}
        </UnstakingBox>
        <NFTHeadingItemText>Unstaked</NFTHeadingItemText>
      </NFTHeadingItem>

      <NFTHeadingItem>
        <NFTHeadingImageBox>
          <img src={IcCoinsDisable} alt="cardCheck" />
        </NFTHeadingImageBox>
        <NFTHeadingItemText $disabled>Reward</NFTHeadingItemText>
      </NFTHeadingItem>
    </NftHeaderWrapper>
  );
};

export default NftHeader;

const NftHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5.4rem;

  width: 100%;
  margin-bottom: 2.4rem;
`;

const NFTHeadingItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  cursor: pointer;
`;

const NFTHeadingImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5rem;
  height: 5rem;

  border: 0.1rem solid #f9f9ff;
  border-radius: 50%;
  background-color: #f2f2f7;
`;

const NftBox = styled(NFTHeadingImageBox)<{ $active: boolean }>`
  border: none;
  background-color: ${({ $active }) => ($active ? `#333` : `#fff`)};
  ${({ $active }) =>
    $active
      ? css`
          filter: drop-shadow(0px 0px 20px rgba(198, 197, 208, 0.3));
        `
      : css`
          box-shadow: 0px 0px 14px 0px rgba(206, 216, 225, 0.8);
        `}
`;

const UnstakingBox = styled(NFTHeadingImageBox)<{ $active: boolean }>`
  border: none;
  background-color: ${({ $active }) => ($active ? `#333` : `#fff`)};
  ${({ $active }) =>
    $active
      ? css`
          filter: drop-shadow(0px 0px 20px rgba(198, 197, 208, 0.3));
        `
      : css`
          box-shadow: 0px 0px 14px 0px rgba(206, 216, 225, 0.8);
        `}
`;
const NFTHeadingItemText = styled.span<{ $disabled?: boolean }>`
  color: ${({ $disabled }) => ($disabled ? `#90909A` : `#333`)};
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;