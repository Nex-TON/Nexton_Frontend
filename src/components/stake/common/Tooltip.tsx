import styled from "styled-components";

const Tooltip = ({ children }) => {
  return <TooltipContainer>{children}</TooltipContainer>;
};
export default Tooltip;

const TooltipContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 256px;
  height: fit-content;
  padding: 10px 15px 11px 17px;
  bottom: 55px;
  left: -12px;

  background: rgba(0, 0, 0, 0.65);
  border-radius: 3px;

  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 30%;
    /* transform: translateX(-50%); */

    border-color: rgba(0, 0, 0, 0.65) transparent transparent transparent;
    border-style: solid;
    border-width: 5px;
  }
`;
