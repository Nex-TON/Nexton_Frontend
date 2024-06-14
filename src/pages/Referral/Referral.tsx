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
import { useGenerateReferralId } from "@/hooks/api/referral/useGenerateReferralId";
import { useReferralStatus } from "@/hooks/api/referral/useReferralStatus";
import { globalError } from "@/lib/atom/globalError";
import { copyText } from "@/utils/copyText";
import { isDevMode } from "@/utils/isDevMode";

import "react-toastify/dist/ReactToastify.css";

const tele = (window as any).Telegram.WebApp;

const TMA_URL = "https://t.me/Nexton_tele_bot/nexton";

const _browserUserMock = { id: 1, username: "testName" };

const _referredUsersMocks = [
  { username: "testName1" },
  { username: "testName2" },
  { username: "testName3" },
  { username: "testName4" },
  { username: "testName5" },
  { username: "testName6" },
  { username: "testName7" },
];

export interface IUserInfo {
  userId: number;
  username: string;
}

interface ModalState {
  type: "nxt" | "refer";
  toggled: boolean;
}

const Referral = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);
  const { trigger, isMutating } = useGenerateReferralId();

  const [referralLink, setReferralLink] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({ type: "nxt", toggled: false });

  const { data, isLoading, error } = useReferralStatus(isDevMode ? _browserUserMock.id : userInfo.userId);

  const toggleModal = () => {
    setModal(prev => ({
      type: prev.type,
      toggled: !prev.toggled,
    }));
  };

  useEffect(() => {
    if (tele || isDevMode) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });

      const tgUser = isDevMode ? _browserUserMock : tele.initDataUnsafe.user;
      if (tgUser) {
        setUserInfo({ userId: tgUser.id, username: tgUser.username });
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
        trigger(userInfo)
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
        <img src={ReferralGroup} alt="ReferralGroup" />
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

              {isLoading ? <Loader /> : <span>0 Points</span>}
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

              {isLoading ? <Loader /> : <span>0 Points</span>}
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
            <TransactionsWrapper $isEmpty={!_referredUsersMocks.length}>
              {isLoading ? (
                <Loader />
              ) : _referredUsersMocks.length > 0 ? (
                <>
                  <DateSpan>02.06.24</DateSpan>
                  {_referredUsersMocks.map((item, idx) => (
                    <TransactionItem key={idx}>
                      <p>{item.username}</p>
                    </TransactionItem>
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

  padding: 2.5rem 1.8rem;
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

const DateSpan = styled.p`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  color: rgba(255, 255, 255, 0.5);

  margin-bottom: 0.6rem;
`;

const TransactionItem = styled.div`
  width: 100%;
  display: flex;

  padding: 0.6rem 0;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    color: #fff;
  }
`;
