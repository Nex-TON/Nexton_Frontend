import styled from "styled-components";
import IcMainIcon from "../assets/icons/ic_mainIcon.svg";
import TonWallet from "../components/main/TonWallet";
import Menu from "../components/main/Menu";
import { useRecoilState } from "recoil";
import { chatState } from "../lib/atom/chatState";
import { useEffect, useState } from "react";
import { chatUserId } from "../api/getChatId";

const Main = () => {
  const [chatId, setChatId] = useRecoilState(chatState);
  const [currentId, setcurrentId] = useState(0);

  useEffect(() => {
    const fetchChatId = async () => {
      const res = await chatUserId();
      setTimeout(() => {
        if (currentId === 0) {
          setChatId(res);
        }
      }, 2000);
    };
    fetchChatId();
  }, []);

  console.log(chatId);

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
