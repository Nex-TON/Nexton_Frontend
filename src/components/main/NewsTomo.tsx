import styled from "styled-components";
import NewsBackground from "../../assets/image/news_tomo.svg";
import ImgNextonLogo from "../../assets/image/news_nextonLogo.svg";
import ImgTomoLogo from "../../assets/image/news_tomoLogo.svg";
import ImgNewsX from "../../assets/image/news_X.svg";

const NewsTomo = () => {
  return (
    <ContainerWrapper>
      <Title>PARTNERSHIP ANNOUNCEMENT</Title>
      <ContentWarrper>
        <NextonLogo src={ImgNextonLogo} />
        <IconX src={ImgNewsX} />
        <TomoLogo src={ImgTomoLogo} />
      </ContentWarrper>
    </ContainerWrapper>
  );
};

export default NewsTomo;

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  background-image: url(${NewsBackground});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  padding: 25px 0 45px;
  background-position: center;
  p {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
    color: white;
    line-height: 150%;
  }
`;

// background-image: url(${NewsBackground});
//background-position: calc(50% + 4px) calc(50% - 3px);
/*

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url(${NewsBackground});
  background-repeat: no-repeat;
  background-size: cover;
  
  padding-top: 27px;
  p {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
    color: white;
    line-height: 150%;
  }
`;


*/

const Title = styled.div`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.442px;
`;

const ContentWarrper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 42px 0 33px;
  gap: 23px;
  justify-content: space-between;
  @media screen and (min-width: 530px) {
    padding: 4px 42px 0 34px;
  }
`;

const NextonLogo = styled.img``;

const TomoLogo = styled.img``;

const IconX = styled.img``;
