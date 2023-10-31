import styled from "styled-components";
import SaleNft from "./SaleNft";

interface SaleNftWithTitleProps {
  titleText: string;
  amount: number;
  timeStamp: string;
  lockPeriod: number;
}

const SaleNftWithTitle = (props: SaleNftWithTitleProps) => {
  const { titleText, amount, timeStamp, lockPeriod } = props;

  return (
    <ContentWrapper>
      <TitleText>{titleText}</TitleText>
      <SaleNft timeStamp={timeStamp} lockPeriod={lockPeriod} amount={amount} />
    </ContentWrapper>
  );
};

export default SaleNftWithTitle;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  padding: 2rem;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;
