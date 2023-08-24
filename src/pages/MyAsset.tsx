import styled from "styled-components";
import MyAssetContent from "../components/myAsset";
import IcBack from "../assets/icons/ic_back.svg";
import BackButton from "../components/common/BackButton";

const MyAsset = () => {
  return (
    <MyAssetWrapper>
      <MyAssetHeaderBox>
        <BackButton />
        <MyAssetHeaderTop>MY asset</MyAssetHeaderTop>
      </MyAssetHeaderBox>
      <MyAssetContent />
    </MyAssetWrapper>
  );
};

export default MyAsset;

const MyAssetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  position: relative;

  padding: 2.9rem 1.6rem 1.4rem 1.6rem;
`;

const MyAssetHeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const MyAssetHeaderTop = styled.span`
  padding-top: 1rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;
