import styled from "styled-components";
import { DDayChange } from "../../../utils/dateChanger";
import { useRecoilValue } from "recoil";
import { nftInfoAtom } from "../../../lib/atom/nftInfo";
import SaleNft from "./SaleNft";

interface SaleCardWithTitleProps {
  titleText: string;
}

const SaleCardWithTitle = (props: SaleCardWithTitleProps) => {
  const { titleText } = props;
  const nftInfo = useRecoilValue(nftInfoAtom);
  const { nftId, amount, leverage, timeStamp, lockPeriod, nominator, status } =
    nftInfo;

  return (
    <ContentWrapper>
      <TitleText>{titleText}</TitleText>
      <SaleNft timeStamp={timeStamp} lockPeriod={lockPeriod} amount={amount} />
    </ContentWrapper>
  );
};

export default SaleCardWithTitle;

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
