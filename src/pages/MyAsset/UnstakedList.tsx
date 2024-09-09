import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcClaimDisable from "@/assets/icons/MyAsset/ic_claim_disable.svg";
import UnstakedDetailHeader from "@/components/myAsset/Unstaking/UnstakingDetail/UnstakedDetailHeader";
import UnstakedDetailList from "@/components/myAsset/Unstaking/UnstakingDetail/UnstakedDetailList";

const tele = (window as any).Telegram.WebApp;

const UnstakedList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <UnstakedListWrapper>
      <UnstakedDetailHeader UnstakingListLength={4} />

      <UnstakedDetailList />
    </UnstakedListWrapper>
  );
};

export default UnstakedList;

const UnstakedListWrapper = styled.div`
  width: 100%;
  padding: 3rem 2rem;
`;
