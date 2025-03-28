import styled from "styled-components";
import Tooltip from "../common/Tooltip";

const DashboaardRunningBotTooltip = ({ sort }) => {
  return (
    <StContainer>
      <Tooltip>
        {sort==="pnlRate"?(
        <StTooltipContainer>
          The yield rankings are displayed in
          <br /> descending order based on the bots' yield.
        </StTooltipContainer>
        ):(
        <StTooltipContainer>
          The transparency rankings
          <br /> prioritize the Dex*Dex strategy.
        </StTooltipContainer>
        ) }
      </Tooltip>
    </StContainer>
  );
};
export default DashboaardRunningBotTooltip;

const StTooltipContainer = styled.div`
  img {
    height: 22px;
    width: 22px;
    margin-right: 2px;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: var(--Neutral-Neutural-100, #fff);
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
  text-align: start;
  white-space: nowrap;
  margin: 7px;
`;
const StContainer = styled.div`
  position: absolute;
  bottom: 2.7rem;
  left: 0;
  transform: translateX(calc(-35% + 1.4rem));
`;
