import ReferralPoints from "@/assets/image/ReferralPoints.png";
import { Button, Container, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

import { ReferralButtonWrapper, ReferralModalContent, SubBullets, SubTitleBulletBox } from "./Modal.styled";

interface ReferPointsModalProps {
  toggleModal: () => void;
}

export const ReferPointsModal = (props: ReferPointsModalProps) => {
  const { toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $isDark $disablePaddingTop>
        <ReferralModalContent>
          <Title style={{ marginBottom: "1.2rem" }} $isDark>
            Refer Points
          </Title>
          <img width={187} src={ReferralPoints} alt="ReferralPoints" />
          <SubTitleBulletBox>
            <SubBullets>Each staker who stakes at least 1 $TON earns 10 Referral Points for themselves.</SubBullets>
            <SubBullets>The referrer also earns 10 Referral Points.</SubBullets>
            <SubBullets>
              If the referred person refers another person, the original referrer earns an additional 5 Referral Points.
            </SubBullets>
          </SubTitleBulletBox>
        </ReferralModalContent>

        <ReferralButtonWrapper>
          <Button onClick={toggleModal}>I got it!</Button>
        </ReferralButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};
