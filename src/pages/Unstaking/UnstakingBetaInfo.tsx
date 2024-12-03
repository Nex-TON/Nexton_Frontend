import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import styled from "styled-components";

import ImgBeta from "@/assets/image/UnstakingBetaInfo.png";

const UnstakingBetaInfo = () => {
  const navigate = useNavigate();

  return (
    <>
      <UnstakingHeader>Unstaking NFT</UnstakingHeader>
      <ContentWrapper>
        <SizedImg src={ImgBeta} />
        <TitleText>{`Successfully\nUnstaking Requested!`}</TitleText>
        <SubText>
          Currently, as this is the Beta version, the unstaking process may take some time. We can provide the TON
          within 36 hours.
        </SubText>
        <MainButton
          text="Okay"
          onClick={() => {
            navigate(`/myasset/unstaked#specific-element`);
          }}
        />
      </ContentWrapper>
    </>
  );
};

export default UnstakingBetaInfo;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 2rem;
  text-align: center;
  white-space: pre-wrap;
`;

const UnstakingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding-top: 2.9rem;
  padding-bottom: 1.8rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const SizedImg = styled.img`
  margin-top: 5rem;
  width: 30rem;
`;

const TitleText = styled.div`
  margin-top: 4.3rem;
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
`;

const SubText = styled.div`
  margin-top: 1.2rem;
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;