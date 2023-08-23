import styled from "styled-components";

import Button from "./common/Button";

const Menu = () => {
  return (
    <MenuWrapper>
      <MenuTitle>Menu</MenuTitle>
      <MenuList>
        <Button top="Leverage" bottom="stake" page="Stake" type="leverage" />
        <Button top="NXT" bottom="stake" page="NXT" type="NXT" />
        <Button title="Loan" page="Myasset" type="Loan" />
        <Button title="NLP" page="Myasset" type="NLP" />
        <Button title="Swap" page="Myasset" type="Swap" />
        <Button title="My asset" page="Myasset" type="Asset" />
      </MenuList>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  width: 100%;
`;

const MenuTitle = styled.span`
  color: #767680;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const MenuList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;

  width: 100%;
`;
