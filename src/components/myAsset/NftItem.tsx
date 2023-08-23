import { styled } from "styled-components";
import NFTOngoing from "../../assets/image/NftOngoing.png";

const NftItem = () => {
  return (
    <NFTItemWrapper>
      <NFTImage
        src={NFTOngoing}
        alt="NFTOngoing"
        style={{ width: "100%", height: "100%" }}
      />
    </NFTItemWrapper>
  );
};

export default NftItem;

const NFTItemWrapper = styled.div`
  width: 100%;
  height: 16rem;

  border-radius: 1rem;

  background-color: black;
`;

const NFTImage = styled.img`
  border-radius: 1rem;
`;
