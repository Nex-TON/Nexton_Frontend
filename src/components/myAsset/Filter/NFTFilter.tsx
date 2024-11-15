import { useState } from "react";
import styled, { css } from "styled-components";

const NFTFilter = () => {
  const [selected, setSelected] = useState<String[]>(["All"]);
  const handleButtonClick = (type: string) => {
    if (type === "All") {
      setSelected(["All"]);
    } else {
      if (selected.includes("All")) {
        setSelected([type]);
      } else {
        setSelected(prev => (prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type]));
      }
    }
  };
  return (
    <>
      <NftFilterWrapper>
        <NftFilterButton $selected={selected.includes("All")} onClick={() => handleButtonClick("All")}>
          All
        </NftFilterButton>
        <NftFilterButton $selected={selected.includes("Ongoing")} onClick={() => handleButtonClick("Ongoing")}>
          <NFTStatus type="Ongoing" />
          Ongoing
        </NftFilterButton>
        <NftFilterButton $selected={selected.includes("Forthcoming")} onClick={() => handleButtonClick("Forthcoming")}>
          <NFTStatus type="Forthcoming" />
          Forthcoming
        </NftFilterButton>
        <NftFilterButton $selected={selected.includes("Expired")} onClick={() => handleButtonClick("Expired")}>
          <NFTStatus type="Expired" />
          Expired
        </NftFilterButton>
      </NftFilterWrapper>
    </>
  );
};
export default NFTFilter;

const NftFilterButton = styled.div<{ $selected: boolean }>`
  height: 34px;
  padding: 0.8rem 1rem;

  border: 1px solid #e5e5ea;
  border-radius: 15px;

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

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
    type === "Forthcoming" &&
    css`
      background: linear-gradient(140deg, #ff8c73 0%, #ffe0b0 100%);
    `}
      ${({ type }) =>
    type === "Expired" &&
    css`
      background: linear-gradient(127deg, #a2a9bc 0%, #e5edff 100%);
    `}
`;
