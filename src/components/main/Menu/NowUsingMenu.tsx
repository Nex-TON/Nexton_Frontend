import { styled } from "styled-components";
import IcMenuStake from "../../../assets/icons/Menu/ic_menu_stake.svg";
import IcMenuMarket from "../../../assets/icons/Menu/ic_menu_market.svg";
import IcMenuMyAsset from "../../../assets/icons/Menu/ic_menu_asset.svg";
import { useNavigate } from "react-router-dom";

const NowUsingMenu = () => {
  const navigate = useNavigate();

  return (
    <NowUsingMenuWrapper>
      <NowUsingMenuButton onClick={() => navigate("/stake/amount")}>
        <img src={IcMenuStake} alt="stake" />
        Stake
      </NowUsingMenuButton>
      <NowUsingMenuButton>
        <img src={IcMenuMarket} alt="market" />
        Marketplace
      </NowUsingMenuButton>
      <NowUsingMenuButton onClick={() => navigate("/myasset/nftlist")}>
        <img src={IcMenuMyAsset} alt="asset" />
        My Asset
      </NowUsingMenuButton>
    </NowUsingMenuWrapper>
  );
};

export default NowUsingMenu;

const NowUsingMenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;

  width: 100%;
  padding: 0 1.5rem;
`;

const NowUsingMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
  height: 90%;
  padding: 2.2rem 0 1.3rem 0;
  aspect-ratio: 1.1/1;

  border: none;
  border-radius: 2rem;
  background-color: #007aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};

  cursor: pointer;
`;
