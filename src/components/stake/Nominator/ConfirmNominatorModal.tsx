import IcClose from "@/assets/icons/Modal/ic_close.svg";
import IcInform from "@/assets/icons/Modal/ic_inform.svg";
import { Button, Container, ModalHeader, ModalHeader2, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ConfirmNominatorModalProps {
  onConfirm: () => void;
  toggleModal: () => void;
  name: string;
  description: string;
  isMinimumTonModal?: boolean;
  tokenSort: string;
}

export const ConfirmNominatorModal = (props: ConfirmNominatorModalProps) => {
  const { onConfirm, toggleModal, name, description, isMinimumTonModal, tokenSort} = props;
  const comment = isMinimumTonModal ? null : name === "Bemo Pool" || name === "Evaa Pool" ? `in the ${name}?` : `in a ${name} strategy?`;

  return (
    <ModalWrapper>
      <Container $isDark $disablePaddingTop>
        {isMinimumTonModal ? (
          <>
            <ModalHeader2>
              <img
                src={IcInform}
                alt="infrom"
                onClick={() => {}}
              />
            </ModalHeader2>
            <Title $isDark style={{ width: "90%", textAlign: "center" }}>
              Staking Amount Too Low<br/> 
              {comment}     
            </Title>
          </>
        ):(
         <>
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
         </>
        )

        }

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
          ):isMinimumTonModal ? (
            <>
              <SubTitle $isDark style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
              { tokenSort === "TON" 
                ? <>You need at least 100 TON to stake\n in the EVAA pool.\n Please increase the amount and try again.</>
                : <>You need at least 100 USDT to stake\n in the EVAA pool.\n Please increase the amount and try again.</>
              }
              </SubTitle>
            </>
          ): (
            <>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
              Currently, staking in the Evaa Pool issues<br/> LST; however, there may be delays when<br/> entering the vault.
            </SubTitle>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
              Please also note that arbitrage trading<br/> carries risks such as execution delays,<br/> price slippage, fees, and market volatility.
            </SubTitle>
            <SubTitle $isDark style={{ width: "100%", textAlign: "center" }}>
              { tokenSort === "TON" 
                ? <>A minimum of 100 TON is required to<br/> stake in this pool.</>
                : <>A minimum of 100 USDT is required to<br/> stake in this pool.</>
              }
            </SubTitle>
          </>
          )}
        </SubTitleBox>
        {/* <Button onClick={onConfirm}>Okay</Button> */}
        <Button 
          onClick={()=>{
            if (isMinimumTonModal){
              toggleModal();
            }else{
              onConfirm();
            }
          }}
        >
          {isMinimumTonModal ? "Got it" : "Okay"}
        </Button>
      </Container>
    </ModalWrapper>
  );
};