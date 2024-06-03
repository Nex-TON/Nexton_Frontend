import { styled } from "styled-components";

export const Container = styled.div<{ $isDark?: boolean; $disablePaddingTop?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 32rem;
  height: max-content;

  background-color: ${({ $isDark }) => ($isDark ? "#1A1B23" : "#fff")};
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 3.4rem 1rem 1rem 1rem;
  padding-top: ${({ $disablePaddingTop }) => $disablePaddingTop && "1.2rem"};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-bottom: 3.8rem;
`;

export const OpenTonViewerBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 1.7rem;
  margin-bottom: 3.8rem;
`;

export const OpenTonViewer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  padding: 0;
  padding-bottom: 0.4rem;

  border: none;
  border-bottom: 0.1rem solid #007aff;
  background: transparent;
  color: #008aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};

  cursor: pointer;
`;

export const Title = styled.p<{ $isDark?: boolean }>`
  color: ${({ $isDark }) => ($isDark ? "#fff" : "#007aff")};
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
`;

export const SubTitleBox = styled.div<{ $marginBottom?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
  margin-bottom: ${({ $marginBottom }) => $marginBottom && "3.8rem"};
`;

export const SubTitle = styled.p<{ $isDark?: boolean }>`
  font-family: "pretendard";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 138.462% */

  color: ${({ $isDark }) => $isDark && "#C6C5D0"};
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: #fff;

  box-sizing: border-box;
  border-radius: 1.4rem;
  padding: 1.2rem 8.2rem;
  background: #007aff;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};

  border: none;
  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);

  cursor: pointer;
`;
