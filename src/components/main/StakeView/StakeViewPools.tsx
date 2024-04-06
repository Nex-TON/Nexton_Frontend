import { useNavigate } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";

import LandingNftStake from "@/assets/image/LandingNFTStake.png";

import { MainStakeViewBox, MainStakeViewWrapper } from "./common/StakeView.styled";

const StakeViewPools = () => {
  const navigate = useNavigate();

  return (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftInfoTitleBox>

        <img src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      <EmptyNftItem />
      <EmptyNftItem />
    </MainStakeViewWrapper>
  );
};

export default StakeViewPools;

const MainNftInfoBox = styled(MainStakeViewBox)`
  background: #2f3038;
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

const shimmerAnimation = keyframes`
0% {
  background-position: -200% 0;
}
100% {
  background-position: 200% 0;
}
`;

const EmptyNftItem = styled(MainStakeViewBox)<{ isloading?: boolean }>`
  background-color: #f1f4f4;

  ${({ isloading }) =>
    isloading &&
    css`
      background: linear-gradient(90deg, #f1f4f4 25%, #f3f6f6 50%, #f1f4f4 75%);
      animation: ${shimmerAnimation} 1.5s infinite;
      background-size: 200% 100%;
    `}
`;
