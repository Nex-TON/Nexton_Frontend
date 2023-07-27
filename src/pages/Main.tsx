import styled from "styled-components";
import IcMainIcon from "../assets/icons/ic_mainIcon.svg";
import TonWallet from "../components/main/TonWallet";
import Menu from "../components/main/Menu";

const Main = () => {
  return (
    <MainWrapper>
      <MainIcon src={IcMainIcon} alt="mainIcon" />
      <TonWallet />
      <Menu />
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 4.6rem 2.6rem;
`;

const MainIcon = styled.img``;
