import IcQuestion from "@/assets/icons/Referral/ic_question.svg";
import ReferralCoins from "@/assets/image/ReferralCoins.png";
import { Button, Container, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

import { ReferralButtonWrapper, ReferralModalContent, SubBullets, SubTitleBulletBox } from "./Modal.styled";

interface NXTPointsModalProps {
  toggleModal: () => void;
}

export const NXTPointsModal = (props: NXTPointsModalProps) => {
  const { toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $isDark $disablePaddingTop>
        <img src={IcQuestion} alt="Question" style={{ alignSelf: "start" }} onClick={toggleModal} />
        <ReferralModalContent>
          <Title style={{ marginBottom: "1.2rem" }} $isDark>
            NXT Points
          </Title>
          <img width={110} src={ReferralCoins} alt="ReferralCoins" />
          <SubTitleBulletBox>
            <SubBullets>Each hour, a fixed number of Loyalty Points is given per $TON staked.</SubBullets>
            <SubBullets>The number of points a user receives is directly tied to their staked amount.</SubBullets>
          </SubTitleBulletBox>
        </ReferralModalContent>

        <ReferralButtonWrapper>
          <Button onClick={toggleModal}>I got it!</Button>
        </ReferralButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};
