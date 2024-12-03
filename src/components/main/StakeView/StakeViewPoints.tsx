import { styled } from "styled-components";

import IcSadSmile from "@/assets/icons/Menu/ic_menu_sad_smile.svg";
import MainButtonDisabled from "@/assets/image/MainButtonDisabled.png";
import MainHand from "@/assets/image/MainHand.png";
import MainNextonFlagDisabled from "@/assets/image/MainNextonFlagDisabled.png";
import MainRankingDisabled from "@/assets/image/MainRankingDisabled.png";

import { MainStakeViewBox, MainStakeViewWrapper } from "./common/StakeView.styled";

const StakeViewPoints = ({ isConnected }: { isConnected: boolean }) => {
  return isConnected ? (
    <MainStakeViewWrapper>
      <PointBoxSquad $inactive>
        <PointBoxTitle>Squad</PointBoxTitle>
        <PointBoxSquadImg src={MainNextonFlagDisabled} alt="MainNextonFlag_Disabled" />
      </PointBoxSquad>

      <PointBoxButton $inactive>
        <PointBoxTitle>Button</PointBoxTitle>

        <PointBoxButtonHandImg src={MainHand} alt="MainHand_Disabled" />
        <PointBoxButtonImg src={MainButtonDisabled} alt="MainButton_Disabled" />
      </PointBoxButton>

      <PointBoxRanking $inactive>
        <PointBoxTitle>Ranking</PointBoxTitle>
        <PointBoxRankingImg src={MainRankingDisabled} alt="MainRanking_Disabled" />
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

const PointBoxSquad = styled(MainStakeViewBox)<{ $inactive?: boolean }>`
  background: ${({ $inactive }) =>
    $inactive ? "#E1E4E6" : "linear-gradient(149.27deg, #1f53ff 2.01%, #c9d5ff 103.14%)"};

  padding: 1.6rem 0;
  cursor: ${({ $inactive }) => ($inactive ? "default" : "pointer")};
`;

const PointBoxSquadImg = styled.img`
  position: absolute;
  top: 50px;
`;

const PointBoxButton = styled(MainStakeViewBox)<{ $inactive?: boolean }>`
  background: ${({ $inactive }) => ($inactive ? "#E1E4E6" : "linear-gradient(180deg, #ffed4d 0%, #4a9300 100%)")};

  padding: 1.6rem 0;
  cursor: ${({ $inactive }) => ($inactive ? "default" : "pointer")};
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

const PointBoxRanking = styled(MainStakeViewBox)<{ $inactive?: boolean }>`
  background: ${({ $inactive }) =>
    $inactive ? "#E1E4E6" : "linear-gradient(120.73deg, #ffbf03 -2.98%, #fff7df 99.16%)"};

  padding: 1.6rem 0;
  cursor: ${({ $inactive }) => ($inactive ? "default" : "pointer")};
`;

const PointBoxRankingImg = styled.img`
  position: absolute;
  top: 52px;
  right: 0;

  border-radius: 0 0 2rem 0;
`;

const PointBoxTitle = styled.p`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  color: #b9b9ba;
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
