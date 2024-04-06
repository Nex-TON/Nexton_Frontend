import { styled } from "styled-components";

export const MainStakeViewBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 150px;
  padding: 1.6rem;
  border-radius: 2rem;

  cursor: pointer;
`;

export const MainStakeViewWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  margin: 2.1rem 0;
`;
