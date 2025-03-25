import styled from "styled-components";
import IcOldNxton from "@/assets/icons/Main/ic_old_nxTon.svg";
import IcNewNxton from "@/assets/icons/Main/ic_new_nxTon.svg";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NewsTokenExchange = () => {
  const navigate = useNavigate();
  return (
    <ContainerWrapper
      onClick={() => {
        navigate("/exchange");
      }}
    >
      <Title>Exchange NxTON for something new!</Title>
      <ContentWarrper>
        <img src={IcOldNxton} alt="old nxTON icon" />
        <FaArrowRight color="#FFF" size={10} />
        <img src={IcNewNxton} alt="new nxTON icon" />
      </ContentWarrper>
    </ContainerWrapper>
  );
};

export default NewsTokenExchange;

const ContainerWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  border-radius: 15px;
  background: linear-gradient(98deg, #000 11.74%, #321b42 101.85%);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  padding: 27px 0 46px 0;
  background-position: center;
  p {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
    color: white;
    line-height: 150%;
  }
`;

const Title = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: italic;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.442px;
`;

const ContentWarrper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 23px;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 530px) {
    padding: 4px 42px 0 34px;
  }
`;

const NextonLogo = styled.img``;

const TomoLogo = styled.img``;

const IconX = styled.img``;
