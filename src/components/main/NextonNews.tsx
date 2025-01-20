import styled from "styled-components";

import StonfiLogo from "@/assets/image/StonfiLogoImg.svg";
import LinkIcon from "@/assets/icons/Main/arrow-down-right-sm.svg";
import BannerIllust from "@/assets/image/banner_illust.png";
import NewsTomo from "./NewsTomo";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Slider from "react-slick";
import Slider from "react-slick";
import NewsBackground from "../../assets/image/news_tomo.svg";

const NextonNews = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동재생속도
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0",
  };
  return (
    <>
      <LayoutWrapper>
        <Title>Latest News</Title>
        <SliderWrapper>
          <Slider {...settings}>
            <SliderItem>
              <NewsTomo />
            </SliderItem>
            <SliderItem className="first">
              <ContainerWrapper
                onClick={() =>
                  window.open("https://app.ston.fi/pools/EQDp1Wo856blEgAxh8SGrkN4MVaK1p-h6Ih4ydMT2n3sJucq")
                }
                id="main page carousel"
              >
                <TextWrapper id="main page carousel">
                  <p id="main page carousel">
                    $NxTON is now
                    <TextLine>
                      listed on <StonfiImg src={StonfiLogo} alt="stonfi logo" />
                    </TextLine>
                  </p>
                  <LinkToWebsite id="main page carousel">
                    Let’s Check It Out! <img src={LinkIcon} />
                  </LinkToWebsite>
                </TextWrapper>
                <IllustImg src={BannerIllust} alt="banner illust" id="main page carousel" />
              </ContainerWrapper>
            </SliderItem>
          </Slider>
        </SliderWrapper>
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
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 4vw;
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

const TextLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
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

const SliderWrapper = styled.div`
  width: 100%;
  .slick-slider {
    width: 100%;
  }
  .slick-track {
    width: 100%;
    display: flex;
  }
  .slick-slide {
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

const SliderItem = styled.div`
  width: 100%;
  height: 125px;
  padding: 0 2%;
`;
