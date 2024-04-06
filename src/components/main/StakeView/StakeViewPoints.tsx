import { styled } from "styled-components";

import IcSadSmile from "@/assets/icons/Menu/ic_menu_sad_smile.svg";
import MainButton from "@/assets/image/MainButton.png";
import MainHand from "@/assets/image/MainHand.png";
import MainNextonFlag from "@/assets/image/MainNextonFlag.png";
import MainRanking from "@/assets/image/MainRanking.png";

import { MainStakeViewBox, MainStakeViewWrapper } from "./common/StakeView.styled";

const StakeViewPoints = ({ isConnected }: { isConnected: boolean }) => {
  return isConnected ? (
    <MainStakeViewWrapper>
      <PointBoxSquad>
        <PointBoxTitle>Squad</PointBoxTitle>
        <PointBoxSquadImg src={MainNextonFlag} alt="MainNextonFlag" />
      </PointBoxSquad>

      <PointBoxButton>
        <PointBoxTitle>Button</PointBoxTitle>

        <PointBoxButtonHandImg src={MainHand} alt="MainHand" />
        <PointBoxButtonImg src={MainButton} alt="MainButton" />
      </PointBoxButton>

      <PointBoxRanking>
        <PointBoxTitle>Ranking</PointBoxTitle>
        <PointBoxRankingImg src={MainRanking} alt="MainRanking" />
      </PointBoxRanking>
    </MainStakeViewWrapper>
  ) : (
    <WalletConnectAlertWrapper>
      <img src={IcSadSmile} alt="sadSmile" />
      <WalletConnectAlertText>You need to connect to your wallet to collect your points.</WalletConnectAlertText>
    </WalletConnectAlertWrapper>
  );
};

export default StakeViewPoints;

const PointBoxSquad = styled(MainStakeViewBox)`
  background: linear-gradient(149.27deg, #1f53ff 2.01%, #c9d5ff 103.14%);

  padding: 1.6rem 0;
`;

const PointBoxSquadImg = styled.img`
  position: absolute;
  top: 50px;
`;

const PointBoxButton = styled(MainStakeViewBox)`
  background: linear-gradient(180deg, #ffed4d 0%, #4a9300 100%);

  padding: 1.6rem 0;
`;

const PointBoxButtonHandImg = styled.img`
  position: absolute;
  top: 50px;

  z-index: 10;
`;

const PointBoxButtonImg = styled.img`
  position: absolute;
  top: 103px;
  right: 0;

  border-radius: 0 0 2rem 0;
`;

const PointBoxRanking = styled(MainStakeViewBox)`
  background: linear-gradient(120.73deg, #ffbf03 -2.98%, #fff7df 99.16%);

  padding: 1.6rem 0;
`;

const PointBoxRankingImg = styled.img`
  position: absolute;
  top: 52px;
  right: 0;

  border-radius: 0 0 2rem 0;
`;

const PointBoxTitle = styled.p`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  color: #2f3038;
  text-align: center;
`;

const WalletConnectAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  margin: 2.1rem 0;
  padding: 1.6rem;

  background-color: #f1f4f4;
  border-radius: 20px;
`;

const WalletConnectAlertText = styled.p`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  color: #76797a;
`;
