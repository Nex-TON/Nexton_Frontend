import styled from "styled-components";

import IcArrowDown from "@/assets/icons/Stake/ic_chevron_down.svg";
import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Main/ic_new_nxTon.svg";
import IcUSDT from "@/assets/icons/Stake/Staking_USDT.png";
import IcBmTon from "@/assets/icons/Stake/Staking_BmTON2.svg";

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
          <TokenName>Stake NxTON</TokenName>
        ) : tokenSort === "USDT" ? (
            <TokenName>Stake USDT</TokenName>
        ) : tokenSort === "bmTON" ? (
          <TokenName>Stake bmTON</TokenName>
        ) : (
          <TokenName>Stake TON</TokenName>
        )
      }
        <RightArrowWrapper>
          <img src={IcArrowDown} />
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
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
  margin-right:1.3rem;
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
  margin-right: 0.8rem;
`;

const TokenFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
