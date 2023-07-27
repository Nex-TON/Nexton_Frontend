import styled from "styled-components";

interface DetailTitleProps {
  title: string;
}
const DetailTitle = (props: DetailTitleProps) => {
  const { title } = props;

  return <DetailNftInfoTitle>{title}</DetailNftInfoTitle>;
};

export default DetailTitle;

const DetailNftInfoTitle = styled.span`
  margin-bottom: 2.2rem;

  color: #767680;
  ${({ theme }) => theme.fonts.Telegram_Footnote};
`;
