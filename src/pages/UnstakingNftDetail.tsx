import { useEffect, useState } from "react";
import { styled } from "styled-components";
import UnstakingModal from "../components/myAsset/modal/UnstakingModal";
import BackButton from "../components/common/BackButton";
import UnstakingPreview from "../components/myAsset/NFT/Unstaking/UnstakingPreview";
import UnstakingInfo from "../components/myAsset/NFT/Unstaking/UnstakingInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { getNFTDetail } from "../api/getNFTDetail";
import { useRecoilValue } from "recoil";
import { telegramAtom } from "../lib/atom/telegram";
import { UnstakingProps } from "../types/staking";
import useTonConnect from "../hooks/useTonConnect";
import { postUnstake } from "../api/postUnstake";

const tele = (window as any).Telegram.WebApp;

const UnstakingNftDetail = () => {
  const [stakedNftDetail, setStakedNftDetail] = useState([]);
  const telegramId = useRecoilValue(telegramAtom);
  const [toggleModal, setToggleModal] = useState(false);
  const { address } = useTonConnect();

  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };

  const getStakedNftDetail = async () => {
    const response = await getNFTDetail(Number(id));
    setStakedNftDetail(response);
  };

  const postUnstaking = async () => {
    if (address) {
      const newUnstaking: UnstakingProps = {
        telegramId: Number(telegramId),
        nftId: Number(id),
        address,
      };

      const response = await postUnstake(newUnstaking);
      if (response === 200) {
        handleToggleModal();
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
          navigate(`/myasset`);
        });
      }
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  useEffect(() => {
    getStakedNftDetail();
  }, [id]);

  return (
    <>
      {toggleModal && <UnstakingModal handleToggleModal={handleToggleModal} />}
      {stakedNftDetail && stakedNftDetail.length > 0 && (
        <UnstakingWrapper>
          <UnstakingHeader>
            {/* <BackButton /> */}
            Unstaking NFT
          </UnstakingHeader>
          <UnstakingPreview item={stakedNftDetail[0]} />
          <UnstakingInfo item={stakedNftDetail[0]} />
          <UnstakingMessageBox>
            During this period you may not cancel the transaction.
          </UnstakingMessageBox>
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
