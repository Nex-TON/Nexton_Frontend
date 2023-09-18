import styled from "styled-components";

import Button from "./common/Button";

const Menu = () => {
  return (
    <MenuWrapper>
      <MenuList>
        <Button title="Stake" page="Stake" type="leverage" />
        <Button title="Loan" page="Loan" type="Loan" />
        <Button title="Swap" type="Swap" page="Swap" />
        <Button title="NXT" page="NXT" type="NXT" />
        <Button title="NLP" type="NLP" />
        <Button title="My asset" page="Myasset" type="Asset" />
      </MenuList>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  width: 100%;
  padding: 3rem 4.8rem;

  background-color: #fff;

  z-index: 1;
`;

const MenuList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(5rem, 1fr));
  row-gap: 2rem;
  column-gap: 4rem;

  width: 100%;
`;
