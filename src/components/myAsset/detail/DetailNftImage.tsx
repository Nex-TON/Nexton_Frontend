import styled from "styled-components";
import NftItem from "../../common/NftItem";

interface DetailNftImageProps {
  lockup: number;
}

const DetailNftImage = (props: DetailNftImageProps) => {
  const { lockup } = props;

  return (
    <DetailNftImageWrapper>
      <NftItem lockup={lockup} />
    </DetailNftImageWrapper>
  );
};

export default DetailNftImage;

const DetailNftImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 1.9rem;
  margin-bottom: 2.5rem;
  padding: 3.6rem 0;

  background-color: #fff;
  box-shadow: 0px 0px 40px 0px rgba(174, 174, 178, 0.25) inset;
`;
