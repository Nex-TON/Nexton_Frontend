import ModalWrapper from "@/components/common/Modal/ModalWrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IcWarning from "@/assets/icons/Stake/ic_warning_red.svg";

const ExchangeConfirmModal = ({ toggleModal }) => {
  const navigate = useNavigate();
  return (
    <ModalWrapper>
      <ModalContainer.wrapper>
        <img src={IcWarning} alt="warning icon" />
        <ModalContainer.title>
          You don't have enough
          <br /> unexchanged nxTON!
        </ModalContainer.title>
        <ModalContainer.subtitle>
          Apologies, please exchange your <br /> existing nxTON for the new one first.
        </ModalContainer.subtitle>
        <ModalContainer.buttonwrapper>
          <ModalContainer.cancel
            onClick={() => {
              toggleModal(false);
            }}
          >
            Now now
          </ModalContainer.cancel>
          <ModalContainer.submit onClick={() => navigate("/exchange")}>Go to Exchange</ModalContainer.submit>
        </ModalContainer.buttonwrapper>
      </ModalContainer.wrapper>
    </ModalWrapper>
  );
};
export default ExchangeConfirmModal;

const ModalContainer = {
  cancel: styled.div`
    cursor: pointer;
    color: #1f53ff;
    background: white;
    width: 108px;
    height: 42px;
    border-radius: 1.4rem;
    ${({ theme }) => theme.fonts.Telegram_Medium_2};

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  submit: styled.div`
    cursor: pointer;
    background: #1f53ff;
    color: white;
    width: 182px;
    height: 42px;
    border-radius: 1.4rem;
    ${({ theme }) => theme.fonts.Telegram_Medium_2};

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  buttonwrapper: styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
  `,
  subtitle: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #c6c5d0;
    text-align: center;
    margin-bottom: 4rem;
  `,
  title: styled.div`
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
    text-align: center;
    color: white;
    margin-bottom: 9px;

    display: flex;
    flex-direction: row;
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
    img{
        width: 24px;
        height: 24px;
        margin-bottom: 7px;
    }
  `,
};
