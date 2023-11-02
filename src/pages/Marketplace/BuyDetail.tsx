import styled from "styled-components";
import SaleNftWithTitle from "../../components/myAsset/Sale/SaleNftWithTitle";

const BuyDetail = () => {
  //   const saleNftProps = {
  //     titleText: `Token ID : ${nftId}`,
  //     amount: amount,
  //     timeStamp: timeStamp,
  //     lockPeriod: lockPeriod,
  //   };

  return (
    <RootWrapper>
      {/* <SaleNftWithTitle {...saleNftProps} /> */}
      <ContentWrapper></ContentWrapper>
    </RootWrapper>
  );
};

export default BuyDetail;

const RootWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1a1b23;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: inline-flex;
  padding: 2rem 1.5rem 2rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 2rem 2rem 0rem 0rem;
  background-color: #fff;
`;
