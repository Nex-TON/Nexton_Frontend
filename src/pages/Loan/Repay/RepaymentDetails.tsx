import { useEffect, useState,useCallback } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import BasicModal from "@/components/common/Modal/BasicModal";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import { ConfirmRepaymentModal } from "@/components/loan/Repay/ConfirmRepaymentModal";
import { isDevMode } from "@/utils/isDevMode.ts";
import * as Contract from "@/hooks/contract/repay";
import { useRepayNftDetail } from "@/hooks/api/loan/useReapyNftDetail";
import { toNano } from "@ton/core";

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
import { limitDecimals } from "@/utils/limitDecimals";

const stakingInfoItems = [
  {
    header: "Collateralizing NFT info",
    items: [
      { label: "NFT ID", value: "4817sddss863ddddwdwsdwd" },
      { label: "Network", value: "TON" },
    ],
  },
  {
    header: "Staking info",
    items: [
      { label: "Principal", value: "10,000 TON" },
      { label: "Nominator Pool", value: "DG Pool #1" },
      { label: "Leveraged", value: "X1.0" },
      { label: "Lockup period", value: "60 days" },
      { label: "Unstakable date", value: "DD.MM.YY" },
      { label: "Protocol Fees", value: "2%" },
      { label: "Total Amount", value: "10,083 TON" },
    ],
  },
];

const REPAY_AMOUNT = toNano("0.3"); //Mock data. Replace with real data later.

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
  const {data:borrowDetail}=useRepayNftDetail(Number(id));

  const alwaysVisibleItems = [
    { label: "Borrowed nxTON", value: `${limitDecimals(useRepayNftDetail[0].repayAmount,3)} nxTON`},
    { label: "Principal", value: `${borrowDetail[0].principal} TON` },
    { label: "LTV", value: `${borrowDetail[0].loanToValue}%` },
    { label: "Interest rate", value: `${borrowDetail[0].interestRate}%` },
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
  }, [navigate]);

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

  const handleRepayConfirm = useCallback(async () => {
    try {
      const data = () => {
        return {
          query_id: BigInt(Date.now()),
          amount: REPAY_AMOUNT, //Mock data. Replace with real data later.
          value: toNano("0.06"),
          forward_ton_amount: toNano("0.01"),
        };
      };

      await sendMessage(data());

      toggleModal();

      setModal({ type: "repay", toggled: true });
    } catch (error) {
      console.error(error);
    }
  }, [contractLoading]);

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
            title="Loan 01"
            alwaysVisibleItems={alwaysVisibleItems}
            stakingInfoItems={stakingInfoItems}
          />

          <RepayRateBox>
            <RepayRateBoxHeader>Amount to be repaid</RepayRateBoxHeader>
            <RepayRateBoxDivider />
            <RepayRateBoxBottom>{borrowDetail[0].repayAmount} nxTON</RepayRateBoxBottom>
          </RepayRateBox>
        </RepaymentContentBox>

        {!isDevMode ? (
          <MainButton text="Pay now" onClick={toggleModal} />
        ) : (
          <button onClick={toggleModal}>Pay now</button>
        )}
      </RepaymentWrapper>

      {false && <TransactionConfirmModal />}
      {modal.type === "confirmRepay" && modal.toggled && (
        <ConfirmRepaymentModal toggleModal={toggleModal} onConfirm={handleRepayConfirm} />
      )}
      {modal.type === "repay" && modal.toggled && (
        <BasicModal isDark type="repay" toggleModal={toggleModal} onClose={() => console.log("Repayed!")} />
      )}
    </div>
  );
};

export default RepaymentDetails;
