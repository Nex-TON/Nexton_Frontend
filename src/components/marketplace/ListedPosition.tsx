import styled from "styled-components";
import { position } from "../../types/Nft";

interface ListedPositionProps {
  positions: position[];
}

const ListedPosition = (props: ListedPositionProps) => {
  const { positions } = props;

  return (
    <RootWrapper>
      <ContentWrapper>
        <SectionHeader>
          <span>Listed Position</span>
          <div>
            <span>Total</span>
            <span>{positions.length}</span>
          </div>
        </SectionHeader>
      </ContentWrapper>
    </RootWrapper>
  );
};

export default ListedPosition;

const RootWrapper = styled.div`
  margin: 4rem 1.3rem 0rem 1.3rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #2f3038;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_2};
  }
  div {
    display: flex;
    gap: 0.4rem;
    span {
      color: #333;
      ${({ theme }) => theme.fonts.Nexton_Label_Small};
    }
  }
`;

const TableLabel = styled.div``;
