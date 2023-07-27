import styled from "styled-components";
import DetailInfoItem from "./DetailInfoItem";

interface DetailInfoListProps {
  title: string;
  desc: string;
}

const DetailInfoList = (props: DetailInfoListProps) => {
  const { title, desc } = props;
  return (
    <DetailNftInfoTextBlock>
      <DetailInfoItem text={title} />
      <DetailInfoItem text={desc} />
    </DetailNftInfoTextBlock>
  );
};

export default DetailInfoList;

const DetailNftInfoTextBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  & + & {
    margin-top: 1.6rem;
  }
`;
