import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcMenuMyAsset from "@/assets/icons/Menu/ic_menu_asset.svg";
import IcMenuDashboard from "@/assets/icons/Menu/ic_menu_dashboard.svg";
import IcMenuStake from "@/assets/icons/Menu/ic_menu_stake.svg";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <TopBarWrapper>
      <TopBarButton onClick={() => navigate("/stake/amount")} id="menu page stake button">
        <img src={IcMenuStake} alt="stake" />
        Stake
      </TopBarButton>
      <TopBarButton onClick={() => navigate("/myasset/nftlist")} id="menu page my asset button">
        <img src={IcMenuMyAsset} alt="asset" />
        My Asset
      </TopBarButton>
      <TopBarButton onClick={() => navigate("/dashboard")} id="menu page dashboard button">
        <img src={IcMenuDashboard} alt="dashboard" />
        Dashboard
      </TopBarButton>
    </TopBarWrapper>
  );
};

export default TopBar;

const TopBarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;

  width: 100%;
  padding: 0 1.5rem;
`;

const TopBarButton = styled.button<{ $inactive?: boolean }>`
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
  background-color: ${({ $inactive }) => ($inactive ? "#E5E5EA" : "#007aff")};
  color: ${({ $inactive }) => ($inactive ? "rgba(170, 174, 175, 1)" : "#fff")};
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};

  cursor: ${({ $inactive }) => ($inactive ? "default" : "pointer")};
`;
