import { styled } from "styled-components";
import IcNftMoreArrow from "../../../assets/icons/Landing/ic_more_arrow.svg";
import { useNavigate } from "react-router-dom";
import MainNftViewList from "./MainNftViewList";

const MainNftView = () => {
  const navigate = useNavigate();

  return (
    <MainNftViewWrapper>
      <MainNFtViewInnerBox>
        <MainNftViewInnerTitleBox>
          <MainNFtViewInnerTitle>NFTs</MainNFtViewInnerTitle>
          <MainNftViewInnerTitleMore
            onClick={() => navigate("/myasset/nftlist")}
          >
            View more
            <img src={IcNftMoreArrow} alt="nftMore" />
          </MainNftViewInnerTitleMore>
        </MainNftViewInnerTitleBox>
        <MainNftViewList />
      </MainNFtViewInnerBox>
    </MainNftViewWrapper>
  );
};

export default MainNftView;

const MainNftViewWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
`;

const MainNFtViewInnerBox = styled.div`
  width: 100%;
  margin-top: 0.6rem;
  padding: 1.5rem;
`;

const MainNftViewInnerTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const MainNFtViewInnerTitle = styled.span`
  color: #2f3038;
  font-family: Montserrat;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.4rem;
`;

const MainNftViewInnerTitleMore = styled.div`
  display: flex;
  gap: 0.4rem;

  color: #09090a;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
  cursor: pointer;
`;
