import styled from "styled-components";
import MyAssetContent from "../components/myAsset";
import IcBack from "../assets/icons/ic_back.svg";

const MyAsset = () => {
  return (
    <MyAssetWrapper>
      <BackImg src={IcBack} onClick={() => window.history.back()} />
      <MyAssetHeaderBox>
        <MyAssetHeaderTop>My Asset</MyAssetHeaderTop>
        <MyAssetHeaderBottom>NFT</MyAssetHeaderBottom>
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
  width: 100%;
  text-align: center;
`;

const MyAssetHeaderTop = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
  color: #45464f;
`;
const MyAssetHeaderBottom = styled.p`
  ${({ theme }) => theme.fonts.Telegram_Title_1};
  background: var(
    --gradation,
    linear-gradient(137deg, #6bd3ff 0%, #3461ff 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BackImg = styled.img`
  position: absolute;
  left: 1.5rem;
  top: 2.8rem;

  cursor: pointer;
`;
