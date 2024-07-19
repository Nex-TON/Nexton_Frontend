import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  return (
    <ActionCardsWrapper>
      {/* Active version is disabled until "Borrow" section is implemented */}
      {/* <Card $large onClick={() => navigate("/myasset")}>
        <CardHeader>Borrow nxTON using your NFT as collateral</CardHeader>
        <CardBody>
          Borrow
          <ArrowIcon />
        </CardBody>
      </Card> */}

      <Card $large $disabled>
        <CardHeader $disabled>Coming Soon</CardHeader>
        <CardBody $disabled>
          Loan
          <ArrowIcon disabled />
        </CardBody>
      </Card>
      <Card $dark onClick={() => navigate("/myasset")}>
        <CardHeader>Check the NFT you received from staking</CardHeader>
        <CardBody $dark>
          My NFTs
          <ArrowIcon dark />
        </CardBody>
      </Card>
    </ActionCardsWrapper>
  );
};

export default ActionCards;

const ActionCardsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 3.9rem 1.1rem;
`;

const Card = styled.div<{ $dark?: boolean; $large?: boolean; $disabled?: boolean }>`
  flex: ${({ $large }) => ($large ? 1.65 : 1)};
  height: 145px;
  padding: 1.6rem;
  border-radius: 2rem;
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
