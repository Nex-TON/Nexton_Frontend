import styled, { css } from "styled-components";

interface MainTextProps {
  title: string;
  type?: string;
}

const MainText = (props: MainTextProps) => {
  const { title, type } = props;

  return <MainTextStyle type={type}>{title}</MainTextStyle>;
};

export default MainText;

const MainTextStyle = styled.div<{ type?: string }>`
  margin-bottom: 1rem;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};
  color: #8e8e93;

  text-align: center;

  ${({ type }) =>
    type === "Menu" &&
    css`
      color: #007aff;
    `}
`;
