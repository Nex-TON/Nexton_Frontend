import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { useGenerateReferralId } from "@/api/referral/postClaim";
import IcCopy from "@/assets/icons/ic_copy.svg";
import ReferralGroup from "@/assets/image/ReferralGroup.png";
import Loader from "@/components/common/Loader";
import { useReferralStatus } from "@/hooks/api/referral/useReferralStatus";
import { globalError } from "@/lib/atom/globalError";
import { copyText } from "@/utils/copyText";

import "react-toastify/dist/ReactToastify.css";

const tele = (window as any).Telegram.WebApp;

const TMA_URL = "https://t.me/Nexton_tele_bot/nexton";

const Referral = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(globalError);
  const { trigger, isMutating } = useGenerateReferralId();

  const [referralLink, setReferralLink] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { data, isLoading, error } = useReferralStatus(userId);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });

      const tgUser = tele.initDataUnsafe.user;
      if (tgUser) {
        setUserId(tgUser.id);
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
      if (userId) {
        trigger({ userId: String(userId) })
          .then(res => {
            setReferralLink(`${TMA_URL}?startapp=${res.data.code}`);
          })
          .catch(err => {
            setError(err);
          });
      }
    }
    generateReferralLink();
  }, [userId, trigger, setError]);

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
      <ReferralWrapper>
        <h1>Referral</h1>
        <img src={ReferralGroup} alt="ReferralGroup" />
        <BottomWrapper>
          <ReferralBoxWrapper>
            <ReferralBox>
              <h3>Your Reward</h3>
              {isLoading ? <Loader /> : <span>{data?.totalRewards}</span>}
            </ReferralBox>
            <ReferralBox>
              <h3>Your Friends</h3>
              {isLoading ? <Loader /> : <span>{data?.totalReferrals}</span>}
            </ReferralBox>
          </ReferralBoxWrapper>

          <ReferralBox>
            <ReferralLink>
              {isMutating ? <Loader /> : <h3>{referralLink}</h3>}

              <CopyIcon $isCopied={isCopied} src={IcCopy} alt="copy" onClick={handleCopyClick} />
            </ReferralLink>
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

  padding: 14px 22px;
  border-radius: 20px;

  background-color: #fff;
  color: #000;
  text-align: start;

  h3 {
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }

  span {
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
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
  background: linear-gradient(134deg, #6bd3ff 7.39%, #3461ff 97.6%);

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
