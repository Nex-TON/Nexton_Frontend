import { useEffect, useState } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import BasicModal from "@/components/common/Modal/BasicModal.tsx";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal.tsx";
import { ConfirmBorrowModal } from "@/components/loan/Borrow/ConfirmBorrowModal.tsx";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import { isDevMode } from "@/utils/isDevMode.ts";

import { BorrowHeaderBox, BorrowHeaderBoxTitle, BorrowWrapper } from "./BorrowDetails.styled.tsx";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "borrow" | "confirmBorrow";
  toggled: boolean;
}

const stakingInfoItems = [
  {
    items: [
      { label: "Borrowed nxTON", value: "000.00 nxTON" },
      { label: "Principal", value: "00000 TON" },
      { label: "LTV", value: "95.0%" },
    ],
  },
];

// ! Data is currently mocked
const BorrowVerify = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location=useLocation();

  const {borrowAmount}=location.state||{};

  console.log(`borrow amount:${borrowAmount}`)//for the test

  const [modal, setModal] = useState<ModalState>({
    type: "confirmBorrow",
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
        navigate("/loan/1/borrow/risk-disclosure");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  const handleBorrowConfirm = () => {
    toggleModal();

    console.log("Borrow confirmed!");

    setModal({ type: "borrow", toggled: true });
  };

  return (
    <>
      <BorrowWrapper>
        <BorrowHeaderBox>
          <BorrowHeaderBoxTitle>
            <h1>Loan</h1>
          </BorrowHeaderBoxTitle>
        </BorrowHeaderBox>

        <ProgressBar currentStep={3} />

        <div style={{ marginTop: "2rem" }}>
          <StakingInfo isExpandable={false} theme="white" title="Loan 01" stakingInfoItems={stakingInfoItems} />
        </div>

        {!isDevMode ? (
          <MainButton text="Confirm loan" onClick={toggleModal} />
        ) : (
          <button onClick={toggleModal}>Confirm loan</button>
        )}
      </BorrowWrapper>

      {false && <TransactionConfirmModal />}
      {modal.type === "confirmBorrow" && modal.toggled && (
        <ConfirmBorrowModal toggleModal={toggleModal} onConfirm={handleBorrowConfirm} />
      )}
      {modal.type === "borrow" && modal.toggled && (
        <BasicModal isDark type="borrow" toggleModal={toggleModal} onClose={() => console.log("Borrowed!")} />
      )}
    </>
  );
};

export default BorrowVerify;
