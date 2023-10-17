import styled, { css } from "styled-components";
import IcCardDisable from "../../assets/icons/MyAsset/ic_card_disable.svg";
import IcCardActive from "../../assets/icons/MyAsset/ic_card_active.svg";
import IcCardCheckDisable from "../../assets/icons/MyAsset/ic_cardCheck_disable.svg";
import IcCardCheckActive from "../../assets/icons/MyAsset/ic_cardCheck_active.svg";
import IcCoinsDisable from "../../assets/icons/MyAsset/ic_coins_disable.svg";
import IcCoinsActive from "../../assets/icons/MyAsset/ic_coins_active.svg";
import { useLocation, useNavigate } from "react-router-dom";

interface NftHeaderProps {
  myAssetMenu: string;
}

const NftHeader = (props: NftHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { myAssetMenu } = props;
  const { pathname } = location;

  return (
    <NftHeaderWrapper>
      <NFTHeadingItem onClick={() => navigate("/myasset/nftlist")}>
        <NftBox $active={pathname.includes("nftlist") ? true : false}>
          {pathname.includes("nftlist") ? (
            <img src={IcCardActive} alt="card" />
          ) : (
            <img src={IcCardDisable} alt="card" />
          )}
        </NftBox>
        <NFTHeadingItemText>NFT</NFTHeadingItemText>
      </NFTHeadingItem>
      <NFTHeadingItem onClick={() => navigate("/myasset/unstaking")}>
        <UnstakingBox $active={pathname.includes("unstaking") ? true : false}>
          {pathname.includes("unstaking") ? (
            <img src={IcCardCheckActive} alt="cardCheck" />
          ) : (
            <img src={IcCardCheckDisable} alt="cardCheck" />
          )}
        </UnstakingBox>
        <NFTHeadingItemText>Unstaking</NFTHeadingItemText>
      </NFTHeadingItem>
      <NFTHeadingItem>
        <NFTHeadingImageBox>
          {myAssetMenu === "Reward" ? (
            <img src={IcCoinsActive} alt="cardCheck" />
          ) : (
            <img src={IcCoinsDisable} alt="cardCheck" />
          )}
        </NFTHeadingImageBox>
        <NFTHeadingItemText style={{ color: "#90909A" }}>
          Reward
        </NFTHeadingItemText>
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
const NFTHeadingItemText = styled.span`
  color: #333;
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;
