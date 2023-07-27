import styled from "styled-components";

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  const { title } = props;

  return <TiTleWrapper>{title}</TiTleWrapper>;
};

export default Title;

const TiTleWrapper = styled.span`
  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;
