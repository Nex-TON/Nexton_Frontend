import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import IcCopy from "@/assets/icons/ic_copy.svg";
import ICQuestionColor from "@/assets/icons/Referral/ic_question_color.svg";
import ReferralGroup from "@/assets/image/ReferralGroup.png";
import Loader from "@/components/common/Loader";
import { NXTPointsModal } from "@/components/referral/Modals/NXTPoints";
import { ReferPointsModal } from "@/components/referral/Modals/ReferPointsModal";
import { useManageReferral } from "@/hooks/api/referral/useManageReferral";
import { useReferralPoints } from "@/hooks/api/referral/useReferralPoints";
import { useReferralStatus } from "@/hooks/api/referral/useReferralStatus";
import { globalError } from "@/lib/atom/globalError";
import { copyText } from "@/utils/copyText";
import { ReferralDateFormatter } from "@/utils/dateChanger";

import "react-toastify/dist/ReactToastify.css";

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

const Referral = () => {
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
        navigate("/");
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
    <>
      {modal.type === "nxt" && modal.toggled && <NXTPointsModal toggleModal={toggleModal} />}
      {modal.type === "refer" && modal.toggled && <ReferPointsModal toggleModal={toggleModal} />}

      <ReferralWrapper>
        <h1>Earn your Point</h1>
        <img width={234} src={ReferralGroup} alt="ReferralGroup" />

        <BottomWrapper>
          <ReferralBoxWrapper>
            <ReferralBox>
              <ReferralBoxTop>
                <h3>NXT Points</h3>
                <img
                  src={ICQuestionColor}
                  alt="QuestionIcon"
                  onClick={() => setModal({ type: "nxt", toggled: true })}
                />
              </ReferralBoxTop>

              {pointsLoading ? <Loader /> : <span>{pointsData?.loyaltyPoints} Points</span>}
            </ReferralBox>
            <ReferralBox>
              <ReferralBoxTop>
                <h3>Refer Points</h3>
                <img
                  src={ICQuestionColor}
                  alt="QuestionIcon"
                  onClick={() => setModal({ type: "refer", toggled: true })}
                />
              </ReferralBoxTop>

              {pointsLoading ? <Loader /> : <span>{pointsData?.referralPoints} Points</span>}
            </ReferralBox>
          </ReferralBoxWrapper>

          <ReferralBox>
            <h3>Your Link</h3>
            <ReferralLink>
              {isMutating ? <Loader /> : <h3>{referralLink}</h3>}

              <CopyIcon $isCopied={isCopied} src={IcCopy} alt="copy" onClick={handleCopyClick} />
            </ReferralLink>
          </ReferralBox>

          <ReferralBox style={{ height: "100%" }}>
            <h3>Referral History</h3>
            <TransactionsWrapper $isEmpty={!referralStatus?.totalReferrals}>
              {statusLoading ? (
                <Loader />
              ) : referralStatus?.referralDetails.length > 0 ? (
                <>
                  {referralStatus?.referralDetails.map((item, idx) => (
                    <TransactionsItem key={idx}>
                      <DateSpan>{ReferralDateFormatter(item.createdAt)}</DateSpan>
                      {item.users.map(user => (
                        <NameItem key={user._id}>
                          <p>{user?.username || user?.userId}</p>
                        </NameItem>
                      ))}
                    </TransactionsItem>
                  ))}
                </>
              ) : (
                <h3>No Transaction Record</h3>
              )}
            </TransactionsWrapper>
          </ReferralBox>
        </BottomWrapper>
      </ReferralWrapper>

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
    </>
  );
};

export default Referral;

const ReferralWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  padding: 2rem;
  gap: 1.6rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  background: linear-gradient(96deg, #c078f9 5.73%, #6047f4 100%);

  h1 {
    color: #fff;
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const ReferralBoxWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ReferralBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 14px 22px;
  border-radius: 20px;

  background-color: #fff;
  text-align: start;

  h3 {
    ${({ theme }) => theme.fonts.Telegram_Body};
    color: #8e8e93;
  }

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
    color: #000;
    text-align: end;
  }
`;

const ReferralBoxTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`;

const ReferralLink = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 14px 12px;
  border-radius: 10px;

  color: #fff;
  background: linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%);

  h3 {
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

const TransactionsWrapper = styled.div<{ $isEmpty?: boolean }>`
  width: 100%;
  min-height: ${({ $isEmpty }) => ($isEmpty ? "200px" : "100%")};
  max-height: 200px;

  display: flex;
  flex-direction: column;

  padding: 1.8rem;
  border-radius: 10px;

  justify-content: ${({ $isEmpty }) => ($isEmpty ? "center" : "flex-start")};
  align-items: ${({ $isEmpty }) => ($isEmpty ? "center" : "flex-start")};

  background: linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%);

  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  h3 {
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;

const TransactionsItem = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
`;

const DateSpan = styled.p`
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
  color: rgba(255, 255, 255, 0.5);

  margin-bottom: 0.6rem;
`;

const NameItem = styled.div`
  width: 100%;
  display: flex;

  padding: 0.6rem 0;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    color: #fff;
  }
`;
