import styled from "styled-components";

import IcArrowRight from "@/assets/icons/Stake/ic_chevron_right.svg";
import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Main/ic_new_nxTon.svg";
import IcUSDT from "@/assets/icons/Stake/Staking_USDT.png";
import IcBmTon from "@/assets/icons/Stake/Staking_BmTON2.svg";
import NewTooltip from "@/assets/image/NewTooltip.svg";

const TokenFilter = ({ toggleModal, tokenSort }) => {
  return (
    <>
      <TokenFilterWrapper onClick={toggleModal}>
        <TokenFilterIcon>
          {tokenSort === "TON" 
            ? <img src={IcTon} alt="ton icon" /> 
            : tokenSort === "nxTON" 
              ? <img src={IcNxTon} alt="nxTon icon" /> 
              : tokenSort === "USDT"
                ?<img src={IcUSDT} alt="usdt icon" />
                :<img src={IcBmTon} alt="bmTon icon" />
          }
        </TokenFilterIcon>
        { tokenSort === "nxTON" ? (
          <TooltipExist>
          <TooltipImage src={NewTooltip} alt="New Tooltip" />
          <TokenName>NxTON</TokenName>
        </TooltipExist>
        ) : tokenSort === "USDT" ? (
          <TooltipExist>
            <TooltipImage src={NewTooltip} alt="New Tooltip" />
            <TokenName>USDT</TokenName>
          </TooltipExist>
        ) : tokenSort === "bmTON" ? (
          <TokenName>bmTON</TokenName>
        ) : (
          <TokenName>TON</TokenName>
        )
      }
        <RightArrowWrapper>
          <img src={IcArrowRight} />
        </RightArrowWrapper>
      </TokenFilterWrapper>
    </>
  );
};
export default TokenFilter;

const TooltipImage = styled.img`
  position: absolute; /* 절대 위치 설정 */
  left:2.5rem; /* TokenName 시작 위치에 정렬 */
  bottom: 100%; /* TokenName 위에 위치 */
  transform: translateX(-50%); /* 왼쪽 정렬 조정 */
  margin-bottom: 5px; /* TokenName과의 간격 조정 */
  z-index: 1; /* 다른 요소 위에 표시 */
`;

const TooltipExist = styled.div`
  position: relative; /* Tooltip의 기준 위치 설정 */
  display: flex;
  align-items:start;
`;

const RightArrowWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TokenName = styled.div`
  color: black;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
  margin-right:0.4rem;
  position: relative;
`;

const TokenFilterIcon = styled.div`
  img {
    width: 37px;
    height: 37px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.6rem;
`;

const TokenFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
