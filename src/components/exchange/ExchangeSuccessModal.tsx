import ModalWrapper from "../common/Modal/ModalWrapper";
import styled from "styled-components";

const ExchangeSuccessModal = ({toggleModal}) => {
  return (
    <ModalWrapper>
      <ModalContainer.wrapper>
        <ModalContainer.title>
          Your request has been <br />
          completed!
        </ModalContainer.title>
        <ModalContainer.subtitle>
          The former NxTON will be burned. The
          <br /> exchange process may take more <br />
          than 24 hours. Please wait patiently.
        </ModalContainer.subtitle>
        <ModalContainer.buttonwrapper onClick={() =>toggleModal(false)}>Yes</ModalContainer.buttonwrapper>
      </ModalContainer.wrapper>
    </ModalWrapper>
  );
};
export default ExchangeSuccessModal;

const ModalContainer = {
  transaction: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;

    padding: 0;
    padding-bottom: 0.4rem;

    border: none;
    border-bottom: 0.1rem solid #007aff;
    background: transparent;
    color: #008aff;
    ${({ theme }) => theme.fonts.Nexton_Label_Small};

    cursor: pointer;
    margin-bottom: 2.9rem;
  `,
  buttonwrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    background: #1f53ff;
    border-radius: 14px;
    color: white;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.fonts.Telegram_Medium_2};
  `,
  subtitle: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #c6c5d0;
    text-align: center;
    margin-bottom: 5.4rem;
  `,
  title: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
    text-align: center;
    color: white;
    margin-bottom: 9px;
  `,
  wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 2rem;
    width: 320px;
    height: auto;
    padding: 5rem 1rem 1rem 1rem;
    background: #1a1b23;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
