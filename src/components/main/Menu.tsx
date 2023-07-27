import styled from "styled-components";
import MainText from "./common/MainText";
import Button from "./common/Button";

const Menu = () => {
  return (
    <MenuWrapper>
      <MainText title="Menu" type="Menu" />
      <Button title="Stake" page="Stake" />
      <Button title="Become LP" page="Nlp" />
      <Button title="My Asset" page="Myasset" />
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  width: 100%;
`;
