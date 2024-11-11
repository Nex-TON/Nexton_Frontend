import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import dashboard_inacticve from "@/assets/icons/Main/dashboard_inactive.svg";
import home_inactive from "@/assets/icons/Main/home_inactive.svg";
import friends_inactive from "@/assets/icons/Main/friends_inactive.svg";
import mypage_inactive from "@/assets/icons/Main/mypage_inactive.svg";
import dashboard_active from "@/assets/icons/Main/dashboard_active.svg";
import home_active from "@/assets/icons/Main/home_active.svg";
import friends_active from "@/assets/icons/Main/friends_active.svg";
import mypage_active from "@/assets/icons/Main/mypage_active.svg";

const MainNavigationBar = () => {
  const { pathname } = useLocation();
  return (
    <Nav>
      <NavButton pathname={pathname} path={"/main"} img_active={home_active} img_inactive={home_inactive} title="home"/>
      <NavButton pathname={pathname} path={"/dashboard"} img_active={dashboard_active} img_inactive={dashboard_inacticve} title="Dashboard"/>
      <NavButton pathname={pathname} path={"/referral"} img_active={friends_active} img_inactive={friends_inactive} title="Friends"/>
      <NavButton pathname={pathname} path={"/myasset"} img_active={mypage_active} img_inactive={mypage_inactive} title="My"/>
    </Nav>
  );
};
export default MainNavigationBar;

const NavButton= ({ pathname, path, img_inactive, img_active, title }) => {
    return (
      <NavWrapper>
        <NavLink to={path}>
          {pathname === path ? (
            <>
              <img src={img_active} alt={title} />
              <ActiveNavText>{title}</ActiveNavText>
            </>
          ) : (
            <>
              <img src={img_inactive} alt={title} />
              <NavText>{title}</NavText>
            </>
          )}
        </NavLink>
      </NavWrapper>
    );
  };
  

const ActiveNavText = styled.div`
  color: #1f53ff;
  text-align: center;

  /* Labal/small */
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NavText = styled.div`
  color: #fff;
  text-align: center;

  /* Labal/small */
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
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

  background: #1a1b23;
  border-radius: 10px 10px 0px 0px;
`;
