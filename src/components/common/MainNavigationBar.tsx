import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import dashboard_inacticve from "@/assets/icons/Main/dashboard_inactive.svg";
import home_inactive from "@/assets/icons/Main/home_inactive.svg";
import friends_inactive from "@/assets/icons/Main/friends_inactive.svg";
import mypage_inactive from "@/assets/icons/Main/mypage_inactive.svg";
import dashboard_active from "@/assets/icons/Main/dashboard_active.svg";
import home_active from "@/assets/icons/Main/home_active.svg";
import friends_active from "@/assets/icons/Main/friends_active.svg";
import mypage_active from "@/assets/icons/Main/mypage_active.svg";
import { useEffect } from "react";

const tele = (window as any).Telegram.WebApp;

const MainNavigationBar = () => {
  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.expand(); // Expand the app to full screen
      tele.BackButton.hide();
    }
  }, []);

  const { pathname } = useLocation();
  return (
    <Nav>
      <NavButton
        id="nav button main"
        pathname={pathname}
        path={"/main"}
        img_active={home_active}
        img_inactive={home_inactive}
        title="home"
      />
      <NavButton
        id="nav button dashboard"
        pathname={pathname}
        path={"/dashboard"}
        img_active={dashboard_active}
        img_inactive={dashboard_inacticve}
        title="Dashboard"
      />
      <NavButton
        id="nav button friends"
        pathname={pathname}
        path={"/referral"}
        img_active={friends_active}
        img_inactive={friends_inactive}
        title="Friends"
      />
      <NavButton
        id="nav button mypage"
        pathname={pathname}
        path={"/myasset"}
        img_active={mypage_active}
        img_inactive={mypage_inactive}
        title="My"
      />
    </Nav>
  );
};
export default MainNavigationBar;

const NavButton = ({ id, pathname, path, img_inactive, img_active, title }) => {
  const isActive = pathname.includes(path);
  return (
    <NavWrapper id={id}>
      <Link to={path} id={id}>
        {isActive ? (
          <>
            <img src={img_active} alt={title} id={id}/>
            <ActiveNavText id={id}>{title}</ActiveNavText>
          </>
        ) : (
          <>
            <img src={img_inactive} alt={title} id={id}/>
            <NavText id={id}>{title}</NavText>
          </>
        )}
      </Link>
    </NavWrapper>
  );
};

const colorChange = keyframes`
  0% {
    color: #fff;
  }
  100% {
    color: #1f53ff;
  }
`;

const ActiveNavText = styled.div`
  color: #1f53ff;
  text-align: center;
  animation: ${colorChange} 0.2s ease-in-out;

  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.12px;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  a {
    text-decoration: none;
  }
`;

const NavText = styled.div`
  color: #fff;
  text-align: center;

  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.12px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  position: fixed;
  bottom: 0px;

  width: 100%;
  height: 56px;
  max-width: 76.8rem;

  background: #1a1b23;
  border-radius: 10px 10px 0px 0px;
`;
