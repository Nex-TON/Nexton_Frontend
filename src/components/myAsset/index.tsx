import styled from "styled-components";
import NftHeader from "./NftHeader";
import NftList from "./NftList";
import FooterButton from "../common/FooterButton";

const MyAssetContent = () => {
  return (
    <MyAssetContentWrapper>
      <NftHeader />
      <NftList />
      <FooterButton title="Close" />
    </MyAssetContentWrapper>
  );
};

export default MyAssetContent;

const MyAssetContentWrapper = styled.div`
  width: 100%;
`;
