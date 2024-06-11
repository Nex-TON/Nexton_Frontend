import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import LandingNftStake from "@/assets/image/LandingNFTStake.png";

import { MainStakeViewBox, MainStakeViewWrapper } from "./common/StakeView.styled";

// TBD: API connection is needed
const StakeViewPools = ({ isConnected }: { isConnected: boolean }) => {
  const navigate = useNavigate();

  return (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>{isConnected ? "Stake $TON" : "$TON TVL"}</p>
          <p>{isConnected ? "" : "$100M"}</p>
        </MainNftInfoTitleBox>

        <MainNftStakeImg src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      <CyanNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>{isConnected ? "My LST" : "LST TVL"}</p>
          <p>{isConnected ? "0.00" : "$100M"}</p>
        </MainNftInfoTitleBox>
      </CyanNftInfoBox>

      <BlueNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>{isConnected ? "My Jetton" : "Jetton TVL"}</p>
          <p>{isConnected ? "0.00" : "$100M"}</p>
        </MainNftInfoTitleBox>
      </BlueNftInfoBox>
    </MainStakeViewWrapper>
  );
};

export default StakeViewPools;

const MainNftInfoBox = styled(MainStakeViewBox)`
  background: #2f3038;
`;

const CyanNftInfoBox = styled(MainStakeViewBox)`
  background: linear-gradient(154deg, #93e6ee 0%, #278a93 74.79%);
`;

const BlueNftInfoBox = styled(MainStakeViewBox)`
  background: linear-gradient(90.11deg, #6bd3ff -19.89%, #3461ff 108.4%);
`;

const MainNftStakeImg = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  bottom: 0;
  margin: auto;
`;

const MainNftInfoTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;

  p {
    color: #f2f2f7;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;
