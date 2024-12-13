import styled from "styled-components";

import StonfiLogo from "@/assets/image/StonfiLogoImg.svg";
import LinkIcon from "@/assets/icons/Main/arrow-down-right-sm.svg";
import BannerIllust from "@/assets/image/banner_illust.png";

const NextonNews = () => {
  return (
    <>
      <LayoutWrapper>
        <Title>Latest Update </Title>
        <ContainerWrapper
          onClick={() => window.open("https://app.ston.fi/pools/EQDp1Wo856blEgAxh8SGrkN4MVaK1p-h6Ih4ydMT2n3sJucq")}
        >
          <TextWrapper>
            <p>
              $NxTON is now
              <br /> listed on <StonfiImg src={StonfiLogo} alt="stonfi logo" />
              <br />
            </p>
            <LinkToWebsite>
              Let’s Check It Out! <img src={LinkIcon} />
            </LinkToWebsite>
          </TextWrapper>
          <IllustImg src={BannerIllust} alt="banner illust" />
        </ContainerWrapper>
      </LayoutWrapper>
    </>
  );
};
export default NextonNews;

const IllustImg = styled.img`
  width: 92px;
  height: 85px;
`;

const StonfiImg = styled.img`
  width: 105px;
  height: 22px;
`;

const LinkToWebsite = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: white;
  margin-top: 4.5px;
  display: flex;
  flex-direction: row;
  img {
    width: 24px;
    height: 24px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerWrapper = styled.div`
  width: 100%;
  background: linear-gradient(98deg, #000 11.74%, #321b42 101.85%);
  height: 125px;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.6rem;
  align-items: center;

  p {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
    color: white;
    line-height: 150%;
  }
`;

const Title = styled.div`
  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
`;

const LayoutWrapper = styled.div`
  gap: 1.5rem;
  padding: 2.7rem 1rem;
  width: 100%;
  height: 224px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
