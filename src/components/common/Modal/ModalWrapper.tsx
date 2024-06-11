import { styled } from "styled-components";

function ModalWrapper({ children, ...props }) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

export default ModalWrapper;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  z-index: 1000;
`;
