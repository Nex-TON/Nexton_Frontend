import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import IcClaimDisable from "@/assets/icons/MyAsset/ic_claim_disable.svg";
import UnstakedDetailHeader from "@/components/myAsset/Unstaking/UnstakingDetail/UnstakedDetailHeader";
import UnstakedDetailList from "@/components/myAsset/Unstaking/UnstakingDetail/UnstakedDetailList";
import { useUnstakedList } from "@/hooks/api/unstaking/useUnstakedList";
import { telegramAtom } from "@/lib/atom/telegram";

const tele = (window as any).Telegram.WebApp;

const UnstakedList = () => {
  const navigate = useNavigate();
  const [telegramId, setTelegramId] = useRecoilState(telegramAtom);
  const { data } = useUnstakedList(telegramId);

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
    <UnstakedListWrapper>
      <UnstakedDetailHeader unstakedListLength={data?.length} />

      <UnstakedDetailList unstakedList={data} />
    </UnstakedListWrapper>
  );
};

export default UnstakedList;

const UnstakedListWrapper = styled.div`
  width: 100%;
  padding: 3rem 2rem;
`;
