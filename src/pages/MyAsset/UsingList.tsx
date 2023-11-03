import styled from "styled-components";

const UsingList = () => {
  return <NFtListWrapper></NFtListWrapper>;
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
