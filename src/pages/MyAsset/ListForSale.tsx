import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useNFTDetail } from "../../hooks/api/useNFTDetail";

const ListForSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { nftDetail } = useNFTDetail(Number(id));

  return <DetailWrapper></DetailWrapper>;
};

export default ListForSale;

const DetailWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #1a1b23;
`;
