import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ComingSoonModal } from "../loan/ComingSoonModal";
import { useState } from "react";

interface ModalState {
  toggled: boolean;
}

const ArrowIcon = ({ dark, disabled }: { dark?: boolean; disabled?: boolean }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.60039 7.20001L14.4004 12L9.60039 16.8"
        stroke={disabled ? "#B9B9BA" : dark ? "#fff" : "#303234"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const ActionCards = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalState>({
    toggled: false,
  });

  const toggleModal = () => {
    setModal(prev => ({
      toggled: !prev.toggled,
    }));
  };
  const handleOkayButton = () => {
    toggleModal();
  };

  return (
    <>
    <ActionCardsWrapper>
      {/* Active version is disabled until "Borrow" section is implemented */}
      {/* <Card $large onClick={() => navigate("/myasset")}>
        <CardHeader>Borrow nxTON using your NFT as collateral</CardHeader>
        <CardBody>
          Borrow
          <ArrowIcon />
        </CardBody>
      </Card> */}
      <ActionCardsTitle>My Activity</ActionCardsTitle>
      <ActionCardsInnerBox>
        <Card $large onClick={() =>navigate("/loan")}>
          <CardHeader >Borrow NxTON using<br/>
          your NFT as collateral</CardHeader>
          <CardBody >
            Loan
            <ArrowIcon />
          </CardBody>
        </Card>
        <Card $dark onClick={() => navigate("/myasset/nftlist#specific-element")} id="main page my NFTS">
          <CardHeader id="main page my NFTS">Check the NFT you received from staking</CardHeader>
          <CardBody $dark id="main page my NFTS">
            My NFTs
            <ArrowIcon dark />
          </CardBody>
        </Card>
      </ActionCardsInnerBox>
      <MyTokensDisclaimer>
        <p>
          This service is in alpha version.
          <br />
          The functionality of the service may be updated in the future.
        </p>
      </MyTokensDisclaimer>
    </ActionCardsWrapper>
    {modal.toggled && (
      <ComingSoonModal toggleModal={toggleModal} onConfirm={handleOkayButton}/>
    )}
    </>
  );
};

export default ActionCards;

const ActionCardsInnerBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
`;

const ActionCardsTitle = styled.div`
  color: var(--Neutral-variant-Neutral-variant-20, #2f3038);
  ${({theme})=>theme.fonts.Nexton_Title_Medium_1}
`;

const ActionCardsWrapper = styled.div`
  display: flex;
  gap: 15px;
  padding: 3.9rem 1rem 15.4rem 1rem;
  flex-direction: column;
`;

const Card = styled.div<{ $dark?: boolean; $large?: boolean; $disabled?: boolean }>`
  flex: ${({ $large }) => ($large ? 1.65 : 1)};
  height: 145px;
  padding: 1.6rem;
  border-radius: 15px;
  box-shadow: ${({ $disabled }) => ($disabled ? "none" : "4px 4px 16px 0px rgba(206, 216, 225, 0.5)")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  background-color: ${({ $dark, $disabled }) => ($disabled ? "#E1E4E6" : $dark ? "#1A1B23" : "#fff")};
`;

const CardHeader = styled.div<{ $disabled?: boolean }>`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  color: ${({ $disabled }) => ($disabled ? "#B9B9BA" : "#76797A")};
  margin-bottom: 10px;
`;

const CardBody = styled.div<{ $dark?: boolean; $disabled?: boolean }>`
  ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
  color: ${({ $dark, $disabled }) => ($disabled ? "#B9B9BA" : $dark ? "#fff" : "#1A1B23")};

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MyTokensDisclaimer = styled.div`
  margin-top: 68px;
  display: flex;
  align-items: start;

  p {
    color: var(--Neutral-Neutural-60, #909394);

    font-family: "SF Pro";
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
  }
`;
