import styled from "styled-components";
import { position } from "../../types/Nft";
import IcDown from "../../assets/icons/Marketplace/ic_polygonDown.svg";
import { useState, useEffect } from "react";
import PositionItem from "./PositionItem";
import EmptyList from "./EmptyList";

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

        <TableLabelWrapper>
          <IdPriceWrapper>
            <TableLabelText>#</TableLabelText>
            <TableLabelText>Price</TableLabelText>
          </IdPriceWrapper>
          <DiscountedExpiryWrapper displayWidth={window.innerWidth}>
            <LabelWithIconWrapper>
              <TableLabelText>Discounted</TableLabelText>
              <img src={IcDown} alt="Down" />
            </LabelWithIconWrapper>
            <TableLabelText>Expiry</TableLabelText>
          </DiscountedExpiryWrapper>
        </TableLabelWrapper>
        {positions.length > 0 ? (
          <ListWrapper>
            {positions.map((item) => (
              <PositionItem key={item.nftId} item={item} />
            ))}
          </ListWrapper>
        ) : (
          <EmptyList />
        )}
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
    margin-left: 0.2rem;
    color: #2f3038;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_2};
  }
  div {
    display: flex;
    gap: 0.2rem;
    span {
      color: #333;
      ${({ theme }) => theme.fonts.Nexton_Label_Small};
      margin-right: 0.2rem;
    }
  }
`;

const TableLabelWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 2rem 1rem 1.7rem;
  justify-content: space-between;

  border-radius: 2rem;
  border: 1px solid #f2f2f7;

  div {
    display: flex;
  }
`;

const IdPriceWrapper = styled.div`
  gap: 2.1rem;
`;

const DiscountedExpiryWrapper = styled.div<{ displayWidth: number }>`
  gap: ${({ displayWidth }) => `${displayWidth * 0.07}px`};
  justify-content: flex-end;
`;

const LabelWithIconWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const TableLabelText = styled.span`
  color: #767680;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

const ListWrapper = styled.div`
  width: 100%;
  padding: 0 0.55rem 1rem 0.55rem;
`;
