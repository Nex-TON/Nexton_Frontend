import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { randomAddress } from "@ton/test-utils";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { postUnstake } from "@/api/postUnstake";
// import BasicModal from "@/components/common/Modal/BasicModal";
import UnstakingInfo from "@/components/myAsset/NFT/Unstaking/UnstakingInfo";
import UnstakingPreview from "@/components/myAsset/NFT/Unstaking/UnstakingPreview";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import * as Contract from "@/hooks/contract/useFakeItemContract";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { Transfer } from "@/hooks/contract/wrappers/tact_FakeItem";
import { telegramAtom } from "@/lib/atom/telegram";
import { UnstakingProps } from "@/types/staking";

const tele = (window as any).Telegram.WebApp;

const UnstakingNftDetail = () => {
  const telegramId = useRecoilValue(telegramAtom);
  // const [toggleModal, setToggleModal] = useState(false);
  const { address } = useTonConnect();
  const { sendMessage } = Contract.useFakeItemContract();
  const { id } = useParams();
  const { nftDetail } = useNFTDetail(Number(id));
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  // const handleToggleModal = () => {
  //   setToggleModal(prev => !prev);
  // };

  const postUnstaking = async () => {
    if (address && nftDetail) {
      const newUnstaking: UnstakingProps = {
        telegramId: Number(telegramId),
        nftId: Number(id),
        address,
      };

      const data = (): Transfer => {
        return {
          $$type: "Transfer",
          newOwner: randomAddress(),
        };
      };

      await sendMessage(data(), `${nftDetail[0].amount}`);
      const response = await postUnstake(newUnstaking);
      if (response === 200) {
        // handleToggleModal();
        navigate(`/unstaking/beta`);
      }
    }
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      if (pathname.includes("view")) {
        tele.onEvent("backButtonClicked", () => {
          navigate(`/myasset/unstakingdetail`);
        });
      } else {
        tele.onEvent("backButtonClicked", () => {
          navigate(`/myasset/nftlist`);
        });
      }
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <>
      {nftDetail && (
        <UnstakingWrapper>
          {/* {toggleModal && <BasicModal type="unstaking" toggleModal={handleToggleModal} />} */}
          <UnstakingHeader>Unstaking NFT</UnstakingHeader>
          <UnstakingPreview item={nftDetail[0]} />
          <UnstakingInfo item={nftDetail[0]} />
          <UnstakingMessageBox>During this period you may not cancel the transaction.</UnstakingMessageBox>
          {!pathname.includes("view") && (
            // <UnstakingButtonWrapper>
            //   <UnstakingButton onClick={postUnstaking}>Confirm</UnstakingButton>
            // </UnstakingButtonWrapper>
            <MainButton text="Confirm" onClick={postUnstaking} />
          )}
        </UnstakingWrapper>
      )}
    </>
  );
};

export default UnstakingNftDetail;

const UnstakingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  background-color: #f2f2f7;
`;
const UnstakingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding-top: 2.9rem;
  padding-bottom: 1.8rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const UnstakingMessageBox = styled.div`
  width: 100%;
  margin-top: 12.3rem;
  margin-bottom: 2.4rem;

  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Caption_1};
  text-align: center;
`;

const UnstakingButtonWrapper = styled.div`
  width: 100%;
  padding: 0 1.6rem;
`;
const UnstakingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #007aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
  outline: none;
  cursor: pointer;
`;
