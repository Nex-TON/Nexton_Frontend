import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import SaleCardWithTitle from "../../components/myAsset/Sale/SaleCardWithTitle";

const ListForSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DetailWrapper>
      <SaleCardWithTitle titleText={"List For Sale"} />
    </DetailWrapper>
  );
};

export default ListForSale;

const DetailWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #1a1b23;
`;
