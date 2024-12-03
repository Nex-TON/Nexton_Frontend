import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import Loader from "@/components/common/Loader";
import UnstakedDetailList from "@/components/unstaking/UnstakedDetailList";
import { useUnstakedList } from "@/hooks/api/unstaking/useUnstakedList";
import { telegramAtom } from "@/lib/atom/telegram";
import UnstakedDetailHeader from "@/components/unstaking/UnstakedDetailHeader";
import { address } from "@ton/core";
import useTonConnect from "@/hooks/contract/useTonConnect";


const tele = (window as any).Telegram.WebApp;

const UnstakedList = () => {
  const { address, balance, refreshTonData, connected, tonConnectUI } = useTonConnect();
  const navigate = useNavigate();
  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);

  const { data, isLoading } = useUnstakedList(address); // ! test ID - 555

  console.log("useUnstakedList: ", data);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });

      const tgId = tele?.initDataUnsafe?.user?.id;
      if (tgId) {
        setTelegramId(tgId);
      } else {
        // Edge case: when user is using Nexton app outside of Telegram
        setTelegramId(0);
      }
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <UnstakedListWrapper id="specific-element">
      <UnstakedDetailHeader unstakedListLength={data?.length}/>
      {isLoading ? (
        <LoaderWrapper>
          <Loader height={100} width={100} />
        </LoaderWrapper>
      ) : (
        <UnstakedDetailList unstakedList={data} />
      )}
    </UnstakedListWrapper>
  );
};

export default UnstakedList;

const UnstakedListWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  padding-bottom: 15.4rem;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
