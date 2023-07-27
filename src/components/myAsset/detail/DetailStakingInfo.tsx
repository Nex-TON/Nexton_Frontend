import styled from "styled-components";
import DetailTitle from "./common/DetailTitle";
import { useRecoilValue } from "recoil";
import { stakingAtom } from "../../../lib/atom/staking";
import { getProtocolFee } from "../../../utils/getProtocolFee";
import { lockUpDateChanger } from "../../../utils/dateChanger";

interface DetailStakingInfoProps {
  stakingId: string;
}

const DetailStakingInfo = (props: DetailStakingInfoProps) => {
  const stakingInfo = useRecoilValue(stakingAtom);
  const { stakingId } = props;

  return (
    <DetailStakingInfoWrapper>
      <DetailTitle title="Staking info" />
      <DetailNftInfoTextBlock>
        <DetailNftInfoText>Principal</DetailNftInfoText>
        <DetailNftInfoText>
          {stakingInfo[stakingId].principal} TON
        </DetailNftInfoText>
      </DetailNftInfoTextBlock>
      <DetailNftInfoTextBlock>
        <DetailNftInfoText>leverage</DetailNftInfoText>
        <DetailNftInfoText>
          x{stakingInfo[stakingId].leverage}
        </DetailNftInfoText>
      </DetailNftInfoTextBlock>
      <DetailNftInfoTextBlock>
        <DetailNftInfoText>Timelocks</DetailNftInfoText>
        <DetailNftInfoText>
          {stakingInfo[stakingId].lockup} days left
        </DetailNftInfoText>
      </DetailNftInfoTextBlock>
      <DetailNftInfoTextBlock>
        <DetailNftInfoText>Unstakable date</DetailNftInfoText>
        <DetailNftInfoText>
          {lockUpDateChanger(stakingInfo[stakingId].lockup)}
        </DetailNftInfoText>
      </DetailNftInfoTextBlock>
      <DetailNftInfoTextBlock>
        <DetailNftInfoText>Protocol Fees</DetailNftInfoText>
        <DetailNftInfoText>
          {getProtocolFee(
            stakingInfo[stakingId].principal,
            stakingInfo[stakingId].leverage
          ).toFixed(2)}{" "}
          TON
        </DetailNftInfoText>
      </DetailNftInfoTextBlock>
    </DetailStakingInfoWrapper>
  );
};

export default DetailStakingInfo;

const DetailStakingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 2rem;
  margin-bottom: 4.2rem;
  padding: 0 3.6rem;
`;

const DetailNftInfoTextBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  & + & {
    margin-top: 1.6rem;
  }
`;

const DetailNftInfoText = styled.span`
  color: #000000;
  ${({ theme }) => theme.fonts.Telegram_SubHeadline_1};
`;
