import { styled } from "styled-components";
import BackButton from "../../../common/BackButton";
import UnstakingPreview from "./UnstakingPreview";
import UnstakingInfo from "./UnstakingInfo";
import { useState } from "react";
import UnstakingModal from "../../modal/UnstakingModal";

const Unstaking = ({
  handleMoveUnstaking,
}: {
  handleMoveUnstaking: () => void;
}) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };
  return (
    <>
      {toggleModal && <UnstakingModal handleToggleModal={handleToggleModal} />}
      <UnstakingWrapper>
        <UnstakingHeader>
          <BackButton unstaking handleMoveUnstaking={handleMoveUnstaking} />
          Unstaking NFT
        </UnstakingHeader>
        <UnstakingPreview />
        <UnstakingInfo />
        <UnstakingMessageBox>
          During this period you may not cancel the transaction.
        </UnstakingMessageBox>
        <UnstakingButtonWrapper>
          <UnstakingButton onClick={handleToggleModal}>Confirm</UnstakingButton>
        </UnstakingButtonWrapper>
      </UnstakingWrapper>
    </>
  );
};

export default Unstaking;

const UnstakingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
`;
const UnstakingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding-top: 2.9rem;
  padding-bottom: 1.8rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const UnstakingMessageBox = styled.div`
  width: 100%;

  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
  text-align: center;
`;

const UnstakingButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2.3rem;
  padding: 0 1.6rem;
`;
const UnstakingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #007aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
  outline: none;
  cursor: pointer;
`;
