import styled from "styled-components";

const FeeInfo = () => {
  return (
    <ContentWrapper>
      <InfoItem>
        <span>Protocol Fee</span>
        <div>
          <span>0.000</span>
          <span>TON</span>
        </div>
      </InfoItem>
      <InfoItem>
        <span>Getgem Fee</span>
        <div>
          <span>1</span>
          <span>TON</span>
        </div>
      </InfoItem>
    </ContentWrapper>
  );
};

export default FeeInfo;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const InfoItem = styled.div`
  display: flex;
  padding: 0 0.2rem;
  justify-content: space-between;
  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #5d5e67;
  }
  div {
    display: flex;
    gap: 1rem;
  }
`;
