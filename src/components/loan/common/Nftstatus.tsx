import { styled } from "styled-components";

export const NftStatus = styled.div<{ type?: string }>`
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
  background: ${({ type }) =>
    type === "ongoing"
      ? `linear-gradient(90deg, #61b5f2 0%, #98a1fe 100%)`
      : type === "forthComing"
      ? `linear-gradient(140deg, #FF8C73 2.52%, #FFE0B0 89.95%)`
      : `linear-gradient(127deg, #A2A9BC -17.44%, #E5EDFF 100%)`};
`;
