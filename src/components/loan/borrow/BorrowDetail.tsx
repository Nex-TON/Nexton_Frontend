import { styled } from "styled-components";
import LoanHeader from "../common/LoanHeader";
import BackButton from "../../common/BackButton";
import BorrowDetailInfo from "./BorrowDetailInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicModal from "../modal/BasicModal";

const tele = (window as any).Telegram.WebApp;

const BorrowDetail = () => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleMoveLoan = () => {
    navigate("/loan");
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
      tele.offEvent("backButtonClicked");
    };
  }, []);
  return (
    <>
      {isOpenModal && <BasicModal toggleModal={handleToggleModal} />}
      <BorrowDetailWrapper>
        <LoanHeader type="detail" />
        <BorrowDetailHeader>
          {/* <BackButton type="detail" handleMoveLoan={handleMoveLoan} loan /> */}
          Borrow NXT
        </BorrowDetailHeader>
        <BorrowDetailInfo />
        <ConfirmButton onClick={handleToggleModal}>Confirm</ConfirmButton>
      </BorrowDetailWrapper>
    </>
  );
};

export default BorrowDetail;

const BorrowDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 2.9rem 1.3rem 2.9rem 1.3rem;
`;

const BorrowDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;

  width: 100%;

  color: #27293e;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 1.4rem;
  right: 1.4rem;
  bottom: 1.4rem;

  width: 93%;
  height: 5.4rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #007aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};

  cursor: pointer;
`;
