import styled from "styled-components";
import DetailNftImage from "../components/myAsset/detail/DetailNftImage";
import DetailNftInfo from "../components/myAsset/detail/DetailNftInfo";
import DetailStakingInfo from "../components/myAsset/detail/DetailStakingInfo";
import FooterButton from "../components/common/FooterButton";
import * as Contract from "./../hooks/useNextonContract";
import { UserDeposit } from "../hooks/tact_NexTon";
import IcBack from "../assets/icons/ic_back.svg";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { stakingAtom } from "../lib/atom/staking";

const MyAssetDetail = () => {
  const stakingInfo = useRecoilValue(stakingAtom);
  const { id } = useParams();

  const { sendMessage } = Contract.useNextonContract();

  return (
    <MyAssetWrapper>
      <BackImg src={IcBack} onClick={() => window.history.back()} />
      <MyAssetHeaderBox>
        <MyAssetHeaderTop>My Asset</MyAssetHeaderTop>
        <MyAssetHeaderBottom>NFT Details</MyAssetHeaderBottom>
      </MyAssetHeaderBox>
      <DetailNftImage lockup={stakingInfo[id].lockup} />
      <DetailNftInfo />
      <DetailStakingInfo stakingId={id} />
      <FooterButton
        title="Withdraw"
        onClick={() => {
          const data = (): UserDeposit => {
            return {
              $$type: "UserDeposit",
              lockPeriod: 0n,
              leverage: 0n,
            };
          };
          console.log(data());
          sendMessage(data());
        }}
      />
    </MyAssetWrapper>
  );
};

export default MyAssetDetail;

const MyAssetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: relative;
  padding: 2.9rem 0 1.4rem 0;
`;

const MyAssetHeaderBox = styled.div`
  width: 100%;
  text-align: center;
`;

const MyAssetHeaderTop = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
  color: #45464f;
`;
const MyAssetHeaderBottom = styled.p`
  ${({ theme }) => theme.fonts.Telegram_Title_1};
  background: var(
    --gradation,
    linear-gradient(137deg, #6bd3ff 0%, #3461ff 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BackImg = styled.img`
  position: absolute;
  left: 1.5rem;
  top: 2.8rem;

  cursor: pointer;
`;
