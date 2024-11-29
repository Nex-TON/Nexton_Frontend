import styled from "styled-components";

import IcArrowRight from "@/assets/icons/Stake/ic_chevron_right.svg";
import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Stake/Staking_nxTON.png";

const TokenFilter = ({toggleModal,tokenSort}) => {
  return (
    <>
      <TokenFilterWrapper onClick={toggleModal}>
        <TokenFilterIcon>
          {tokenSort === "TON" ? <img src={IcTon} alt="ton icon" /> : <img src={IcNxTon} alt="nxTon icon" />}
        </TokenFilterIcon>
        <TokenName>
        {tokenSort === "TON" ? "TON" : "nxTON"}
        </TokenName>
        <RightArrowWrapper>
          <img src={IcArrowRight} />
        </RightArrowWrapper>
      </TokenFilterWrapper>
    </>
  );
};
export default TokenFilter;

const RightArrowWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TokenName = styled.div`
color: black;

${({theme})=>theme.fonts.Nexton_Title_Medium_1}
margin-right:0.4rem;
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
