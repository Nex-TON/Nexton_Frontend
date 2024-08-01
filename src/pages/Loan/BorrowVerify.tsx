import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import BasicModal from "@/components/common/Modal/BasicModal.tsx";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal.tsx";
import { ConfirmBorrowModal } from "@/components/loan/Borrow/ConfirmBorrowModal.tsx";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import { isDevMode } from "@/utils/isDevMode.ts";

import { BorrowHeaderBox, BorrowHeaderBoxTitle, BorrowWrapper } from "./Borrow.styled.tsx.tsx";
import {
  StakingInfoExpanded,
  StakingInfoExpandedDivider,
  StakingInfoExpandedHeader,
  StakingInfoExpandedItem,
} from "./NFTDetail.styled.tsx";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "borrow" | "confirmBorrow";
  toggled: boolean;
}

// ! Data is currently mocked
const BorrowVerify = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
        navigate(-1);
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

        <StakingInfoExpanded $marginTop>
          <StakingInfoExpandedHeader>Loan 01</StakingInfoExpandedHeader>

          <StakingInfoExpandedItem>
            <span>Borrowed nxTON</span>
            <p>000.00 nxTON</p>
          </StakingInfoExpandedItem>
          <StakingInfoExpandedDivider />
          <StakingInfoExpandedItem>
            <span>Principal</span>
            <p>00000 TON</p>
          </StakingInfoExpandedItem>
          <StakingInfoExpandedDivider />
          <StakingInfoExpandedItem>
            <span>LTV</span>
            <p>50.0%</p>
          </StakingInfoExpandedItem>
          <StakingInfoExpandedDivider />
          <StakingInfoExpandedItem style={{ marginBottom: "4rem" }}>
            <span>Maturity date</span>
            <p>mm.dd.yy</p>
          </StakingInfoExpandedItem>
        </StakingInfoExpanded>

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
        <BasicModal isDark type="loan" toggleModal={toggleModal} onClose={() => console.log("Borrowed!")} />
      )}
    </>
  );
};

export default BorrowVerify;
