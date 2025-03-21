import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import axios from "axios";
import { useSetRecoilState } from "recoil";

import BasicModal from "@/components/common/Modal/BasicModal";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal";
import StakingInfo from "@/components/loan/common/StakingInfo";
import { ConfirmRepaymentModal } from "@/components/loan/Repay/ConfirmRepaymentModal";
import { isDevMode } from "@/utils/isDevMode.ts";
import * as Contract from "@/hooks/contract/repay";
import { useRepayNftDetail } from "@/hooks/api/loan/useReapyNftDetail";
import { toNano } from "@ton/core";
import { limitDecimals } from "@/utils/limitDecimals";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import { globalError } from "@/lib/atom/globalError";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { postRepayInfo } from "@/api/postRepayInfo";
import { useTokenRate } from "@/hooks/api/loan/useTokenRate";

import {
  RepaymentContentBox,
  RepaymentHeaderBox,
  RepaymentHeaderBoxTitle,
  RepaymentWrapper,
  RepayRateBox,
  RepayRateBoxBottom,
  RepayRateBoxDivider,
  RepayRateBoxHeader,
} from "./RepaymentDetails.styled";
import { transformNominatorName } from "@/utils/nominator";

interface ModalState {
  type: "repay" | "confirmRepay";
  toggled: boolean;
}

const tele = (window as any).Telegram?.WebApp;

// ! Data is currently mocked
const RepaymentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sendMessage, refresh, isLoading: contractLoading } = Contract.repay(id);
  const { nftDetail } = useNFTDetail(Number(id));
  const { address } = useTonConnect();
  const [isLoading, setIsLoading] = useState(false);
  const setError = useSetRecoilState(globalError);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const location = useLocation();
  const { loanId } = location.state || {};
  const { data: borrowDetail } = useRepayNftDetail(loanId, address);
  const { data: tokenRate } = useTokenRate();

  const alwaysVisibleItems = [
    { label: "Borrowed NxTON", value: `${limitDecimals(borrowDetail?.repayAmount, 3)} NxTON` },
    {
      label: "Principal",
      value: `${limitDecimals(borrowDetail?.principal, 3)} ${nftDetail && nftDetail[0]?.tokenSort == "nxTON" ? "NxTON" : nftDetail && nftDetail[0]?.tokenSort}`,
    },

    { label: "LTV", value: `${limitDecimals(borrowDetail?.loanToValue * 100, 2)}%` },
    { label: "Interest rate", value: `${limitDecimals(borrowDetail?.interestRate * 100, 2)}%` },
  ];
  const stakingInfoItems = nftDetail && [
    {
      header: "Collateralizing NFT info",
      items: [
        { label: "NFT ID", value: `${borrowDetail?.nftId}` },
        { label: "Network", value: "TON" },
      ],
    },
    {
      header: "Staking info",
      items: [
        { label: "Principal", value: `${limitDecimals(nftDetail[0]?.principal, 3)} TON` },
        { label: "Nominator Pool", value: `${transformNominatorName(nftDetail[0]?.nominator)}` },
        { label: "Leveraged", value: `${nftDetail[0]?.leverage}X` },
        { label: "Lockup period", value: `${nftDetail[0]?.lockPeriod}` },
        { label: "Unstakable date", value: new Date(nftDetail[0].unstakableDate).toLocaleDateString() },
        { label: "Protocol Fees", value: "2%" },
        { label: "Total Amount", value: `${limitDecimals(nftDetail[0]?.totalAmount, 3)} TON` },
      ],
    },
  ];

  const [modal, setModal] = useState<ModalState>({
    type: "confirmRepay",
    toggled: false,
  });

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
        navigate("/loan");
      });
    }

    return () => {
      if (tele) {
        tele.offEvent("backButtonClicked");
      }
    };
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }
    };
    initializeData();
  }, [refresh, id]);

  const handleRepay = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = () => {
        return {
          query_id: BigInt(Date.now()),
          amount: toNano(borrowDetail?.repayAmount),
          value: toNano("0.1"),
          forward_ton_amount: toNano("0.05"),
        };
      };

      await sendMessage(data());
      let timeRotate = 0;
      while (true) {
        const response = await axios.get(`/data/validate-repaying?nftId=${Number(id)}&address=${address}`, {
          baseURL: `${import.meta.env.VITE_BASE_URL}`,
        });
        const validation = response.status;
        console.log("test:", validation);
        if (validation && validation == 200 && timeRotate <= 24) {
          break;
        } else if (validation && validation == 202 && timeRotate <= 24) {
        } else {
          break;
        }
        timeRotate += 1;
        await delay(5000);
      }
      const response = await postRepayInfo({
        nftId: Number(id),
        address: address,
      });
      if (response === 200) {
        setModal({ type: "repay", toggled: true });
      } else {
        throw new Error("response");
      }
    } catch (error) {
      console.error("Error during borrow confirmation:", error); // 에러 로그
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [contractLoading, sendMessage, setError]);

  const handleRepayConfirm = () => {
    toggleModal();
    handleRepay();
  };

  return (
    <div>
      <RepaymentWrapper>
        <RepaymentHeaderBox>
          <RepaymentHeaderBoxTitle>
            <h1>Repayment</h1>
          </RepaymentHeaderBoxTitle>
        </RepaymentHeaderBox>
        <RepaymentContentBox>
          <StakingInfo
            isExpandable={true}
            theme="white"
            title={`Loan ${borrowDetail?.loanId}`}
            alwaysVisibleItems={alwaysVisibleItems}
            stakingInfoItems={stakingInfoItems}
            status={borrowDetail?.status}
          />
          <RepayRateBox>
            <RepayRateBoxHeader>Amount to be repaid</RepayRateBoxHeader>
            <RepayRateBoxDivider />
            <RepayRateBoxBottom>{limitDecimals(borrowDetail?.repayAmount, 3)} NxTON</RepayRateBoxBottom>
          </RepayRateBox>
        </RepaymentContentBox>
        {isLoading && <TransactionConfirmModal />}
        {modal.type === "confirmRepay" && modal.toggled && (
          <ConfirmRepaymentModal toggleModal={toggleModal} onConfirm={handleRepayConfirm} loanId={loanId} />
        )}
        {!isDevMode
          ? borrowDetail?.status == 0 && modal.type !== "repay" && <MainButton text="Pay now" onClick={toggleModal} />
          : modal.type !== "repay" && <button onClick={toggleModal}>Pay now</button>}
      </RepaymentWrapper>

      {modal.type === "repay" && modal.toggled && (
        <BasicModal isDark type="repay" toggleModal={toggleModal} navigateOnClose="/loan" />
      )}
    </div>
  );
};

export default RepaymentDetails;
