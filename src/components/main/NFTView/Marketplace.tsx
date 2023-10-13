import { styled } from "styled-components";
import IcMarketPlace from "../../../assets/icons/Landing/ic_marketplace.svg";

const Marketplace = () => {
  return (
    <MartketplaceWrapper>
      <MartketplaceMoveButton>
        <img src={IcMarketPlace} alt="marketPlace" />
        Marketplace
      </MartketplaceMoveButton>
    </MartketplaceWrapper>
  );
};

export default Marketplace;

const MartketplaceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;
const MartketplaceMoveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 1rem 2rem;

  border: none;
  border-radius: 4rem;
  background-color: #2f3038;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
