import IcClose from "@/assets/icons/Modal/ic_close.svg";
import { Button, Container, ModalHeader, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ConfirmNominatorModalProps {
  onConfirm: () => void;
  toggleModal: () => void;
  name: string;
  description: string;
}

export const ConfirmNominatorModal = (props: ConfirmNominatorModalProps) => {
  const { onConfirm, toggleModal, name, description} = props;
  const comment = name === "Bemo Pool" || name === "Evaa Pool" ? `in the ${name}?` : `in a ${name} strategy?`;

  return (
    <ModalWrapper>
      <Container $isDark $disablePaddingTop>
        <ModalHeader>
          <img
            src={IcClose}
            alt="close"
            onClick={() => {
              toggleModal();
            }}
          />
        </ModalHeader>

        <Title $isDark style={{ width: "90%", textAlign: "center" }}>
              Would you like to invest<br/> 
              {comment}     
        </Title>

        <SubTitleBox $marginBottom>
          {name !== "Bemo Pool" && name !== "Evaa Pool" ? (
          <SubTitle $isDark style={{ width: "90%", textAlign: "center" }}>
            {description}
          </SubTitle>
          ) : (name === "Bemo Pool") ? (
          <>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
              Currently, staking in the Bemo Pool<br/> issues LST, but the process of entering<br/> the vault may be delayed.
            </SubTitle>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center" }}>
              Additionally, Arbitrage trading may<br/> result in losses due to execution delays,<br/> price slippage, fees, and market volatility.
            </SubTitle>
          </>
          ):(
            <>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
              Currently, staking in the Evaa Pool issues<br/> LST; however, there may be delays when<br/> entering the vault.
            </SubTitle>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
              Please also note that arbitrage trading<br/> carries risks such as execution delays,<br/> price slippage, fees, and market volatility.
            </SubTitle>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center" }}>
              A minimum of 100 TON is required to<br/> stake in this pool.
            </SubTitle>
          </>
          )}
        </SubTitleBox>
        <Button onClick={onConfirm}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
};