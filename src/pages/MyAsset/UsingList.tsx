import { useState } from "react";
import styled, { css } from "styled-components";

const UsingList = () => {
  const [isSelect, setIsSelect] = useState([true, false, false]);

  const handleSelect = (index: number) => {
    setIsSelect(isSelect.map((item, idx) => (idx === index ? true : false)));
  };

  return (
    <NFtListWrapper>
      <NftListHeader>
        <NFTSelectBox $active={isSelect[0]} onClick={() => handleSelect(0)}>
          All
        </NFTSelectBox>
        <NFTSelectBox $active={isSelect[1]} onClick={() => handleSelect(1)}>
          Listed
        </NFTSelectBox>
        <NFTSelectBox $active={isSelect[2]} onClick={() => handleSelect(2)}>
          Collateralized
        </NFTSelectBox>
      </NftListHeader>
    </NFtListWrapper>
  );
};

export default UsingList;

const NFtListWrapper = styled.div`
  width: 100%;

  padding: 0 0.6rem;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 3px;
    margin-bottom: 3px;
    background-clip: padding-box;
  }
`;

const NftListHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  padding: 1rem;

  border-radius: 3rem;
  background-color: #f2f2f7;
`;

const NFTSelectBox = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.8rem 1.4rem;

  border: none;
  border-radius: 2rem;
  background-color: #f9f9ff;

  ${({ theme }) => theme.fonts.Nexton_Label_Small};

  ${({ $active }) =>
    $active
      ? css`
          background-color: #333;
          color: #fff;
        `
      : css`
          background-color: #fff;
          color: #5d5e67;
        `}

  outline: none;
  cursor: pointer;
`;
