import styled from "styled-components";

import StonfiLogo from "@/assets/image/StonfiLogoImg.svg";

const NextonNews = () => {
  return (
    <>
      <LayoutWrapper>
        <Title>Latest Update </Title>
        <ContainerWrapper>
          <p>$nxTON is now<br/> listed on <img src={StonfiLogo} alt="stonfi logo" /><br/>(banner 디자인 진행 중)</p>
        </ContainerWrapper>
      </LayoutWrapper>
    </>
  );
};
export default NextonNews;

const ContainerWrapper = styled.div`
  width: 100%;
  background-color: black;
  height: 125px;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.6rem;
  img {
    width: 105px;
    height: 22px;
  }
  p{
    ${({theme})=>theme.fonts.Nexton_Title_Medium_1}
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
  padding: 4.5rem 1rem;
  width: 100%;
  height: 260px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
