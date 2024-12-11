import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcMenuStake from "@/assets/icons/Menu/ic_menu_stake.svg";
import IcMenuDashboard from "@/assets/icons/Menu/ic_menu_dashboard.svg";
import IcMenuMyActivity from "@/assets/icons/Menu/ic_menu_myactivity.svg";
import IcMenuFriends from "@/assets/icons/Menu/ic_menu_friends.svg";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <TopBarWrapper>
      <TopBarButton onClick={() => navigate("/stake/amount")} id="menu page stake button">
        <img src={IcMenuStake} alt="stake" id="menu page stake button" />
        Stake
      </TopBarButton>
      <TopBarButton onClick={() => navigate("/dashboard",{state:"/menu"})} id="menu page dashboard button">
        <img src={IcMenuDashboard} alt="asset" id="menu page dashboard button" />
        Dashboard
      </TopBarButton>
      <TopBarButton onClick={() => navigate("/myasset")} id="menu page my activity button">
        <img src={IcMenuMyActivity} alt="dashboard" id="menu page my activity button" />
        My Activity
      </TopBarButton>
      <TopBarButton onClick={() => navigate("/referral")} id="menu page friends button">
        <img src={IcMenuFriends} alt="friends" id="menu page friends button" />
        Friends
      </TopBarButton>
    </TopBarWrapper>
  );
};

export default TopBar;

const TopBarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 12px;

  width: 100%;
  padding: 0 10px;
`;

const TopBarButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 15px 47px;
  aspect-ratio: 2.1/1;

  border: none;
  background-color: #ffffff;
  border-radius: 15px;
  background: var(--Neutral-Neutural-100, #fff);
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};

  color: var(--Neutral-Neutural-20, #303234);
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;
