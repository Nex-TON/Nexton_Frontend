import styled from "styled-components";
import Tooltip from "../common/Tooltip";
import IcTon from "@/assets/icons/Dashboard/ic_ton_logo.svg";
import IcNextonLogo from "@/assets/icons/Dashboard/ic_nxTON_logo.svg";
import IcUSDTLogo from "@/assets/icons/Dashboard/ic_usdt_logo.svg";

const DashboardTvlTooltip = () => {
  return (
    <StContainer>
      <Tooltip>
        <StTooltipContainer>
          <img src={IcTon} />
          TON + 
          <img src={IcNextonLogo} style={{marginLeft:"5px"}}/>
          nxTON + 
          <img src={IcUSDTLogo} style={{marginLeft:"5px"}}/>
          USDT
        </StTooltipContainer>
      </Tooltip>
    </StContainer>
  );
};
export default DashboardTvlTooltip;

const StTooltipContainer = styled.div`
  img {
    height: 19px;
    width: 19px;
    margin-right: 2px;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: var(--Neutral-Neutural-100, #fff);
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 138.462% */
  white-space: nowrap;
`;
const StContainer = styled.div`
  position: absolute;
  bottom: 2.6rem;
  left: 0;
  transform: translateX(calc(-30%));
`;
