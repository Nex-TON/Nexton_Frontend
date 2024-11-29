import styled from "styled-components";

const Tooltip = ({ text, children }) => {
  return (
    <TooltipWrapper>
      {children}
      <TooltipText className="tooltip">{text}</TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  visibility: visible; /* 항상 보이도록 설정 */
  opacity: 1; /* 항상 보이도록 설정 */
  transition: opacity 0.3s;
  background: linear-gradient(96deg, #C078F9 5.73%, #6047F4 100%);
  color: white;
  text-align: center;
  border-radius: 8px; /* 테두리 반경 */
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* 툴팁 위치 조정 */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  ${({theme})=>theme.fonts.Nexton_Label_Small_2};

  &::after {
    content: '';
    position: absolute;
    top: 100%; /* 화살표 위치 */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: linear-gradient(96deg, #C078F9 5.73%, #6047F4 100%) transparent transparent transparent; /* 화살표 색상 */
  }
`;
