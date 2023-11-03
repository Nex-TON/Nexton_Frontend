import styled from "styled-components";

const EmptyList = () => {
  return (
    <ContentWrapper>
      <EmptyItem>
        <span />
        <span />
        <span />
        <span />
      </EmptyItem>
      <MessageWrapper>
        <div />
        <span>Listing soon</span>
        <div />
      </MessageWrapper>
    </ContentWrapper>
  );
};

export default EmptyList;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 0.5rem;
`;

const EmptyItem = styled.div`
  width: 100%;
  padding: 1rem 1.3rem;
  border-radius: 2rem;
  background: #f9f9ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    border-radius: 10px;
    background: #e5e5ea;
    &:nth-child(1) {
      width: 3rem;
      height: 3rem;
    }
    &:nth-child(2) {
      width: 12rem;
      height: 1.6rem;
    }
    &:nth-child(3) {
      width: 3.4rem;
      height: 1.6rem;
    }
    &:nth-child(4) {
      width: 3.8rem;
      height: 1.6rem;
    }
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  div {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 1rem;
    background-color: #e5e5ea;
  }
  span {
    color: #5d5e67;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  }
`;
