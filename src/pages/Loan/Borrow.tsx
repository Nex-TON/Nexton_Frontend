import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DDayChange } from "@/utils/dateChanger";

import {
  BorrowCard,
  BorrowCardButton,
  BorrowCardTitle,
  BorrowDetailItem,
  BorrowDetailItemBox,
  BorrowDetailItemCaption,
  BorrowDetailItemText,
  BorrowDetailWrapper,
  BorrowWrapper,
  NFTStatus,
} from "./Borrow.styled";

const tele = (window as any).Telegram.WebApp;

const Borrow = () => {
  const navigate = useNavigate();

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
  }, [navigate]);

  return (
    <BorrowWrapper>
      <BorrowCard>
        {/* // to-do: change the image path */}
        <NFTStatus type="ongoing" />

        <BorrowCardTitle>Staking NFT</BorrowCardTitle>
        <BorrowCardButton>Borrow nxTON &rarr;</BorrowCardButton>
      </BorrowCard>

      <BorrowDetailWrapper>
        <BorrowDetailItem>
          <BorrowDetailItemCaption>Token ID</BorrowDetailItemCaption>
          <BorrowDetailItemText>542394817863ddddddddd</BorrowDetailItemText>
        </BorrowDetailItem>

        <BorrowDetailItemBox>
          <BorrowDetailItem>
            <BorrowDetailItemCaption>Network</BorrowDetailItemCaption>
            <BorrowDetailItemText>TON</BorrowDetailItemText>
          </BorrowDetailItem>
          <BorrowDetailItem>
            <BorrowDetailItemCaption>LTV</BorrowDetailItemCaption>
            <BorrowDetailItemText>50%</BorrowDetailItemText>
          </BorrowDetailItem>
        </BorrowDetailItemBox>
      </BorrowDetailWrapper>
    </BorrowWrapper>
  );
};

export default Borrow;

{
  /* <BorrowDetailWrapper>
        {isOpenModal && <BasicModal type="loan" toggleModal={handleToggleModal} />}
         <BorrowDetailHeader>
          <BackButton type="detail" handleMoveLoan={handleMoveLoan} loan />
          Borrow NXT
        </BorrowDetailHeader>
        <BorrowDetailInfo />

        <MainButton text="Confirm" onClick={handleToggleModal} />
         <ConfirmButton onClick={handleToggleModal}>Confirm</ConfirmButton>
      </BorrowDetailWrapper> */
}
