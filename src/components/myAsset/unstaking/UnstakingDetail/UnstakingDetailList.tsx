import { styled } from "styled-components";
import UnstakingDetailItem from "./UnstakingDetailItem";

const UnstakingDetailList = () => {
  return (
    <UnstkaingDetailListWrapper>
      <UnstakingDetailItem />
      <UnstakingDetailItem />
      <UnstakingDetailItem />
    </UnstkaingDetailListWrapper>
  );
};

export default UnstakingDetailList;

const UnstkaingDetailListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  padding-top: 1rem;
`;
