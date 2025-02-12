import styled, { css } from "styled-components";

const NFTFilter = ({ checkPeriod, handleCheckPeriod }) => {
  return (
    <NftFilterWrapper>
      <NftFilterButton $selected={checkPeriod[3]} onClick={() => handleCheckPeriod("All")} id="nft filter selectall">
        All
      </NftFilterButton>
      <NftFilterButton $selected={checkPeriod[0]} onClick={() => handleCheckPeriod("Ongoing")} id="nft filter ongoing">
        Lending Available
      </NftFilterButton>
      <NftFilterButton $selected={checkPeriod[2]} onClick={() => handleCheckPeriod("Expired")} id="nft filter expired">
        Unstaking Available
      </NftFilterButton>
    </NftFilterWrapper>
  );
};

export default NFTFilter;

const NftFilterButton = styled.div<{ $selected: boolean }>`
  height: 34px;
  width: auto;
  padding: 0.8rem 1rem;
  white-space: nowrap;

  border: 1px solid #e5e5ea;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  color: #5d5e67;

  ${({ $selected }) =>
    $selected &&
    css`
      background-color: #1a1b23;
      color: #ffffff;
    `}
`;

const NftFilterWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.8rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const NFTStatus = styled.div<{ type?: string }>`
  width: 1.4rem;
  height: 1.4rem;

  border-radius: 50%;
  ${({ type }) =>
    type === "Ongoing" &&
    css`
      background: linear-gradient(90deg, #61b5f2 0%, #98a1fe 100%);
    `}
  ${({ type }) =>
    type === "Expired" &&
    css`
      background: linear-gradient(127deg, #a2a9bc 0%, #e5edff 100%);
    `}
`;
