import { styled } from "styled-components";

function ModalWrapper({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}

export default ModalWrapper;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  z-index: 1000;
`;
