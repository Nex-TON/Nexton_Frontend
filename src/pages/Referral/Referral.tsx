import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import IcCopy from "@/assets/icons/ic_copy.svg";
import FriendsIllust from "@/assets/image/FriendsIllust.svg";
import IcMenuIcon from "@/assets/icons/Referral/ic_menu_button_white.svg";
import { useManageReferral } from "@/hooks/api/referral/useManageReferral";
import { useReferralPoints } from "@/hooks/api/referral/useReferralPoints";
import { useReferralStatus } from "@/hooks/api/referral/useReferralStatus";
import { globalError } from "@/lib/atom/globalError";
import { copyText } from "@/utils/copyText";

import "react-toastify/dist/ReactToastify.css";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import { ReferralPointsExplain } from "@/components/referral/ReferralPointsExplain";
import { ReferralStatistic } from "@/components/referral/ReferralStatistic";
import { ReferralEarned } from "@/components/referral/ReferralEarned";
import useTonConnect from "@/hooks/contract/useTonConnect";

const tele = (window as any).Telegram.WebApp;

const TMA_URL = "https://t.me/Nexton_tele_bot/nexton";

export interface IUserInfo {
  userId: number;
  address: string;
  username?: string;
}

interface ModalState {
  type: "nxt" | "refer";
  toggled: boolean;
}

const Referral = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);
  const { trigger, isMutating } = useManageReferral();

  const [referralLink, setReferralLink] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [addLink, setAddLink] = useState<string>("");
  const { address: walletAddress, connected } = useTonConnect();

  const {
    data: referralStatus,
    isLoading: statusLoading,
    error: errorLoading,
  } = useReferralStatus(userInfo?.userId, walletAddress);

  const {
    data: pointsData,
    isLoading: pointsLoading,
    error: pointsError,
  } = useReferralPoints(userInfo?.userId, walletAddress);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });

      const tgUser = tele.initDataUnsafe?.user;
      if (tgUser && connected) {
        setUserInfo({ userId: tgUser.id, address: walletAddress, username: tgUser?.username });
      } else {
        console.warn("You should launch the app inside the Telegram Mini App.");
      }
    }
    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [walletAddress]);

  useEffect(() => {
    function generateReferralLink() {
      if (userInfo) {
        trigger({ ...userInfo, returnCode: true })
          .then(res => {
            setReferralLink(`${TMA_URL}?startapp=${res.data.code}`);
          })
          .catch(err => {
            setError(err);
          });
      }
    }
    generateReferralLink();
  }, [userInfo, trigger, setError]);

  useEffect(() => {
    if (referralLink) {
      setAddLink(new URL(referralLink).search);
    }
  }, [referralLink]);

  const handleCopyClick = async () => {
    copyText(referralLink);

    toast("🚀 Referral link copied!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // reset the state after the animation duration
  };
  const texts = [
    "🔥 NEXTON: High Yields, High Returns, Extra Rewards!",
    "🚀 Unlock High Returns with NEXTON’s Enhanced Strategies!",
    "😄 Stake Smarter with NEXTON – More Yields, More Rewards!",
    "🪙 Boost Your TON with NEXTON: High Yields, Extra Gains!",
    "📤 NEXTON: Superior Returns, Enhanced Rewards, Unmatched Yields!",
  ];
  const randomText = texts[Math.floor(Math.random() * texts.length)];

  const ShareToFriend = ({ link, text }) => {
    const shareToTelegram = () => {
      const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(link)}${addLink}&text=${encodeURIComponent(text)}`;
      window.open(telegramLink, "_blank");
    };

    return (
      <ShareToFriendButton id="referral page share button">
        <button
          onClick={() => {
            shareToTelegram();
          }}
          id="referral page share button"
        >
          Invite a friend
        </button>
      </ShareToFriendButton>
    );
  };

  return (
    <MainWrapper>
      <ReferralWrapper>
        <ReferralHeader>
          <ReferralHeaderText>Earn your Point</ReferralHeaderText>
          <img
            src={IcMenuIcon}
            alt="referral header menu icon"
            onClick={() => navigate("/menu")}
            id="friends page header menu button"
          />
        </ReferralHeader>
        <FriendsIllustWrapper>
          <img src={FriendsIllust} alt="Friends illust" />
        </FriendsIllustWrapper>
      </ReferralWrapper>
      <ReferralContainer>
        <ReferralPointsExplain />
        <InviteFriendWrapper>
          <InviteThroughTelegram>
            <ShareToFriend link={`${TMA_URL}`} text={randomText} />
          </InviteThroughTelegram>
          <InviteClipboard>
            <CopyIcon
              $isCopied={isCopied}
              src={IcCopy}
              alt="copy"
              onClick={handleCopyClick}
              id="referral page link copy"
            />
          </InviteClipboard>
        </InviteFriendWrapper>
        <ReferralStatistic referralNum={referralStatus ? referralStatus.referralDetails.length : 0} />
        <ReferralEarned
          nxtPoints={pointsData ? pointsData?.loyaltyPoints : 0}
          referPoints={pointsData ? pointsData?.referralPoints : 0}
        />
      </ReferralContainer>
      <MainNavigationBar />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        style={{ fontSize: "7rem" }}
      />
    </MainWrapper>
  );
};

export default Referral;

const ShareToFriendButton = styled.div`
  button {
    border-radius: 15px;
    background: #1f53ff;
    border: none;
    width: 100%;
    height: 60px;

    color: white;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
  }
`;

const InviteClipboard = styled.div`
  display: flex;
  align-items: center;

  padding: 1.8rem;

  color: #fff;
  border-radius: 15px;
  background: #1a1b23;
  height: 60px;
  width: 60px;
`;

const CopyIcon = styled.img<{ $isCopied: boolean }>`
  cursor: pointer;
  animation: ${({ $isCopied }) => ($isCopied ? "pop 1s ease" : "none")};

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const InviteThroughTelegram = styled.div`
  height: 18px;
  width: 100%;
`;

const InviteFriendWrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 65px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ReferralContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 18.6rem;
  background-color: white;

  border-radius: 15px 15px 0px 0px;

  width: 100%;
  height: auto;
  padding: 2.8rem 1rem 15.4rem 1rem;
`;

const FriendsIllustWrapper = styled.div`
  padding: 0 1rem 0 1rem;
  display: flex;
  width: 100%;
  justify-content: center;

  position: absolute;
  top: 6.2rem;
`;

const ReferralHeaderText = styled.div`
  color: white;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium}
  text-align: start;
`;

const ReferralHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 2.1rem 2rem 1.5rem;
  height: 7rem;

  img {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
`;

const ReferralWrapper = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 20rem;
  max-width: 76.8rem;

  display: flex;
  flex-direction: column;

  background: linear-gradient(96deg, #c078f9 5.73%, #6047f4 100%);

  h1 {
    color: #fff;
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
  }
`;

const MainWrapper = styled.div`
  position: relative;
`;
