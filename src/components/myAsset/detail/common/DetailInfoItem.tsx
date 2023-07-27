import styled from "styled-components";

interface DetailInfoItemProps {
  text: string;
}

const DetailInfoItem = (props: DetailInfoItemProps) => {
  const { text } = props;

  return <DetailNftInfoText>{text}</DetailNftInfoText>;
};

export default DetailInfoItem;

const DetailNftInfoText = styled.span`
  color: #000000;
  ${({ theme }) => theme.fonts.Telegram_SubHeadline_1};
`;
