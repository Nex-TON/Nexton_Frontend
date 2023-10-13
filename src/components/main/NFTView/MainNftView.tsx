import { styled } from "styled-components";
import IcNftMoreArrow from "../../../assets/icons/Landing/ic_nftMore_arrow.svg";
import { useNavigate } from "react-router-dom";
import MainNftViewList from "./MainNftViewList";
import Marketplace from "./Marketplace";

const MainNftView = () => {
  const navigate = useNavigate();

  return (
    <MainNftViewWrapper>
      <MainNFtViewInnerBox>
        <MainNftViewInnerTitleBox>
          <MainNFtViewInnerTitle>NFT</MainNFtViewInnerTitle>
          <MainNftViewInnerTitleMore
            onClick={() => navigate("/myasset/nftlist")}
          >
            View more
            <img src={IcNftMoreArrow} alt="nftMore" />
          </MainNftViewInnerTitleMore>
        </MainNftViewInnerTitleBox>
        <MainNftViewList />
        <Marketplace />
      </MainNFtViewInnerBox>
    </MainNftViewWrapper>
  );
};

export default MainNftView;

const MainNftViewWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  background-color: #f1f1f4;
`;

const MainNFtViewInnerBox = styled.div`
  width: 100%;
  margin-top: 0.6rem;
  padding: 1.5rem;

  background-color: #fff;
`;

const MainNftViewInnerTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const MainNFtViewInnerTitle = styled.span`
  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;

const MainNftViewInnerTitleMore = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: #43535b;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;
