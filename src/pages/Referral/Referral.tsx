import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import IcCopy from "@/assets/icons/ic_copy.svg";
import IcExcliamation from "@/assets/icons/Referral/ic_ exclamation.svg";
import IcNXTPoint from "@/assets/icons/Referral/ic_nxt_points.svg";
import IcRefersPoint from "@/assets/icons/Referral/ic_refer_points.svg";
import FriendsIllust from "@/assets/image/FriendsIllust.svg";
import Loader from "@/components/common/Loader";
import IcMenuIcon from "@/assets/icons/Referral/ic_menu_button_white.svg";
import { NXTPointsModal } from "@/components/referral/Modals/NXTPoints";
import { ReferPointsModal } from "@/components/referral/Modals/ReferPointsModal";
import { useManageReferral } from "@/hooks/api/referral/useManageReferral";
import { useReferralPoints } from "@/hooks/api/referral/useReferralPoints";
import { useReferralStatus } from "@/hooks/api/referral/useReferralStatus";
import { globalError } from "@/lib/atom/globalError";
import { copyText } from "@/utils/copyText";
import { ReferralDateFormatter } from "@/utils/dateChanger";
import useTonConnect from "@/hooks/contract/useTonConnect";

import "react-toastify/dist/ReactToastify.css";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import MainButton from "@/components/main/MainButton";

const tele = (window as any).Telegram.WebApp;

const TMA_URL = "https://t.me/Nexton_tele_bot/nexton";

export interface IUserInfo {
  userId: number;
  username?: string;
}

interface ModalState {
  type: "nxt" | "refer";
  toggled: boolean;
}

const ShareToFriend = ({ link, text }) => {
  const shareToTelegram = () => {
    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
    window.open(telegramLink, "_blank");
  };

  return (
    <ShareToFriendButton>
      <button onClick={shareToTelegram}>Invite a friend</button>
    </ShareToFriendButton>
  );
};

const Referral = () => {
  const { address, balance, refreshTonData, connected, tonConnectUI } = useTonConnect();
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);
  const { trigger, isMutating } = useManageReferral();

  const [referralLink, setReferralLink] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({ type: "nxt", toggled: false });

  const { data: referralStatus, isLoading: statusLoading, error: errorLoading } = useReferralStatus(userInfo?.userId);

  const { data: pointsData, isLoading: pointsLoading, error: pointsError } = useReferralPoints(userInfo?.userId);

  const toggleModal = () => {
    setModal(prev => ({
      type: prev.type,
      toggled: !prev.toggled,
    }));
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });

      const tgUser = tele.initDataUnsafe?.user;
      if (tgUser) {
        setUserInfo({ userId: tgUser.id, username: tgUser?.username });
      } else {
        console.warn("You should launch the app inside the Telegram Mini App.");
      }
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

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

  return (
    <MainWrapper>
      {modal.type === "nxt" && modal.toggled && <NXTPointsModal toggleModal={toggleModal} />}
      {modal.type === "refer" && modal.toggled && <ReferPointsModal toggleModal={toggleModal} />}
      <ReferralWrapper>
        <ReferralHeader>
          <ReferralHeaderText>Earn your Point</ReferralHeaderText>
          <img src={IcMenuIcon} alt="referral header menu icon" />
        </ReferralHeader>
        <FriendsIllustWrapper>
          <img src={FriendsIllust} alt="Friends illust" />
        </FriendsIllustWrapper>
      </ReferralWrapper>
      <ReferralContainer>
        <ReferralIntroText>
          Invite a friend and earn points
          <br />
          for both you and your friend!
        </ReferralIntroText>
        <ReferralBoxWrapper>
          <ReferralBox>
            <ReferralBoxTop>
              <PointNameWrapper>
                <img src={IcNXTPoint} alt="referral page nxt point icon" />
                <h3>NXT Points</h3>
                <img
                  src={IcExcliamation}
                  alt="QuestionIcon"
                  onClick={() => setModal({ type: "nxt", toggled: true })}
                  id="referral page nxt points"
                />
              </PointNameWrapper>
              <PointValueWrapper>
                <EarnedPoint>
                  10
                  <EarnedPointUnit>%</EarnedPointUnit>
                </EarnedPoint>
              </PointValueWrapper>
            </ReferralBoxTop>
            <PointExplain>
              Users earn Loyalty Points by staking $TON at a fixed hourly rate of 0.1 points per $TON.
            </PointExplain>
          </ReferralBox>
          <ReferralBox>
            <ReferralBoxTop>
              <PointNameWrapper>
                <img src={IcRefersPoint} alt="referral page refers point icon" />
                <h3>Refer Points</h3>
                <img
                  src={IcExcliamation}
                  alt="QuestionIcon"
                  onClick={() => setModal({ type: "refer", toggled: true })}
                  id="referral page refer points"
                />
              </PointNameWrapper>
              <EarnedPoint>
                10 <EarnedPointUnit>Points</EarnedPointUnit>
              </EarnedPoint>{" "}
            </ReferralBoxTop>
            <PointExplain>Users earn 10 points each when friends stake at least 1 $TON via Nexton. </PointExplain>
          </ReferralBox>
        </ReferralBoxWrapper>
        <InviteFriendWrapper>
          <InviteThroughTelegram>
            {connected ? <ShareToFriend link={`${TMA_URL}`} text="test sample text" /> : <MainButton />}
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
        <StaticsWrapper>
          <h3>Your Statistic</h3>
          <StaticsBox>
            <ReferralStaticTitle>Referrals</ReferralStaticTitle>
            <ReferralStatic>{referralStatus ? referralStatus?.referralDetails.length : 0}</ReferralStatic>
          </StaticsBox>
        </StaticsWrapper>
        <EarnedWrapper>
          <h3>Earned</h3>
          <EarnedContainer>
            <EarnedPointWrapper>
              <img src={IcNXTPoint} alt="earned nxt point icon" />
              <EarnedPoint>
                {pointsData ? pointsData?.loyaltyPoints : 0}
                <EarnedPointUnit>NXT Points</EarnedPointUnit>
              </EarnedPoint>
            </EarnedPointWrapper>
            <EarnedDivision />
            <EarnedPointWrapper>
              <img src={IcRefersPoint} alt="earned refers point icon" />
              <EarnedPoint>
                {pointsData ? pointsData?.referralPoints : 0}
                <EarnedPointUnit>Refer Points</EarnedPointUnit>
              </EarnedPoint>
            </EarnedPointWrapper>
          </EarnedContainer>
        </EarnedWrapper>
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

const EarnedDivision = styled.div`
  background: #e5e5ea;
  width: 100%;
  height: 1px;
`;

const EarnedPointUnit = styled.div`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3}
`;

const EarnedPoint = styled.div`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
`;

const EarnedPointWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  img {
    width: 30px;
    height: 30px;
  }
`;

const EarnedContainer = styled.div`
  gap: 2.7rem;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;
  height: 158px;
  padding: 2rem 1.9rem;

  border-radius: 15px;
  background: white;

  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const EarnedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  h3 {
    color: #2f3038;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  }
`;

const ReferralStatic = styled.div`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
`;

const ReferralStaticTitle = styled.div`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3}
`;

const StaticsBox = styled.div`
  display: flex;
  width: 100%;
  height: 76px;
  padding: 25px 19px;
  justify-content: space-between;
  align-items: center;

  border-radius: 15px;
  background: var(--Neutral-Neutural-100, #fff);
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const StaticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  h3 {
    color: #2f3038;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
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

const PointExplain = styled.div`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Label_Small}
`;

const PointNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
`;

const PointValueWrapper = styled.div``;

const ReferralBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReferralBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 113px;

  padding: 14px 22px;
  border-radius: 20px;

  background-color: #fff;
  text-align: start;

  border-radius: 15px;
  background: var(--Neutral-Neutural-100, #fff);

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);

  h3 {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
    color: #303234;
  }

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #76797a;
    text-align: end;
  }
`;

const ReferralBoxTop = styled.div`
  width: 100%;
  display: flex;
  gap: 7px;
  align-items: start;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`;

const ReferralIntroText = styled.div`
  margin-bottom: 24px;
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;

const ReferralContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 155px;
  background-color: white;

  border-radius: 15px 15px 0px 0px;

  width: 100%;
  height: auto;
  padding: 2.8rem 1rem 11.5rem 1rem;
`;

const FriendsIllustWrapper = styled.div`
  padding: 0 1rem 0 1rem;
  display: flex;
  width: 100%;
  justify-content: center;

  position: absolute;
  top: 28px;
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

  padding: 1.9rem 1rem 0 1rem;

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
  height: 180px;
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
