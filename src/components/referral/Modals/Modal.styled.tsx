import { styled } from "styled-components";

export const ReferralModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 1.4rem;
  text-align: center;
`;

export const SubTitleBulletBox = styled.ul`
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  gap: 0.7rem;

  margin-top: 1.2rem;
  padding: 0 1.2rem;
`;

export const SubBullets = styled.li`
  font-family: "pretendard";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 138.462% */

  text-align: start;

  color: #c6c5d0;
`;

export const ReferralButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 3.4rem;
`;
