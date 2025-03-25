import ModalWrapper from "../common/Modal/ModalWrapper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import IcArrowRight from "@/assets/icons/Exchange/IcArrowRight_blue.svg";

const ExchangeSuccessModal = () => {
  const navigate = useNavigate();
  return (
    <ModalWrapper>
      <ModalContainer.wrapper>
        <ModalContainer.title>Exchange complete!</ModalContainer.title>
        <ModalContainer.subtitle>
          You can view the exchanged
          <br /> nxTON in your wallet.
        </ModalContainer.subtitle>
        <ModalContainer.transaction>
          Open ton viewer <img src={IcArrowRight} alt="right arrow blue" />
        </ModalContainer.transaction>
        <ModalContainer.buttonwrapper onClick={() => navigate("/stake/amount")}>Yes</ModalContainer.buttonwrapper>
      </ModalContainer.wrapper>
    </ModalWrapper>
  );
};
export default ExchangeSuccessModal;

const ModalContainer = {
  transaction: styled.div`
    color: #007aff;
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
    display: flex;
    justify-content: center;
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
    margin-bottom: 2.3rem;
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
