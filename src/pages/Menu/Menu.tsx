import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Header from "@/components/common/Header";
import JoinCommunity from "@/components/main/Menu/JoinCommunity";
import TopBar from "@/components/main/Menu/TopBar";
import UpcomingMenu from "@/components/main/Menu/UpcomingMenu";

const tele = (window as any).Telegram.WebApp;

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);
  return (
    <MenuWrapper>
      <Header isOpen={true} text="NEXTON" backgroundType={true} />
      <TopBar />
      <UpcomingMenu />
      <JoinCommunity />
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  background-color: #f2f2f7;
`;
