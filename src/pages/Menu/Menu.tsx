import { styled } from "styled-components";
import Header from "../../components/common/Header";
import NowUsingMenu from "../../components/main/Menu/NowUsingMenu";
import UpcomingMenu from "../../components/main/Menu/UpcomingMenu";
import JoinCommunity from "../../components/main/Menu/JoinCommunity";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <NowUsingMenu />
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
