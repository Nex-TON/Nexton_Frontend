import styled from "styled-components";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";
import SaleNftOngoing from "../../../assets/image/SaleNftOngoing.png";
import SaleNftForthComing from "../../../assets/image/SaleNftForthComing.png";

interface SaleNftProps {
  timeStamp: string;
  lockPeriod: number;
  amount: number;
  icon?: string;
}

const SaleNft = (props: SaleNftProps) => {
  const { timeStamp, lockPeriod, amount, icon } = props;

  const SwitchSaleNftImage = () => {
    if (DDayChange(timeStamp, lockPeriod) > 15) {
      return <SaleNftImage src={SaleNftOngoing} alt="NFTOngoing" />;
    } else {
      return <SaleNftImage src={SaleNftForthComing} alt="NFTForthComing" />;
    }
  };

  return (
    <NftWrapper>
      {SwitchSaleNftImage()}
      <ExpiryDateText>
        Expiry {expiredDateChanger(timeStamp, lockPeriod, "detail")}
      </ExpiryDateText>
      {icon && <StateIcon src={icon} alt="StateIcon" />}
      <ContentWrapper>
        <TotalValueLabel>Total Value</TotalValueLabel>
        <TotalValueText>{amount}</TotalValueText>
        <TotalValueText>TON</TotalValueText>
        <ValueInfoWrapper>
          <div>
            <span>Principal</span>
            <ValueWrapper>
              <span>{amount}</span>
              <span>TON</span>
            </ValueWrapper>
          </div>
          <div>
            <span>Rewards</span>
            <ValueWrapper>
              <span>0.00</span>
              <span>TON</span>
            </ValueWrapper>
          </div>
        </ValueInfoWrapper>
      </ContentWrapper>
    </NftWrapper>
  );
};

export default SaleNft;

const NftWrapper = styled.div`
  position: relative;

  width: 280px;
  height: 285px;
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  padding: 1.5rem;
  width: 100%;
`;

const SaleNftImage = styled.img``;

const ExpiryDateText = styled.div`
  padding: 0.8rem 1.4rem;
  border-radius: 1.6rem;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2.5rem);
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  color: #fff;
  position: absolute;
  top: 1.8rem;
  left: 1.8rem;
`;

const StateIcon = styled.img`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  filter: drop-shadow(2px 2px 14px rgba(19, 35, 36, 0.36));
`;

const TotalValueLabel = styled.div`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  margin-left: 0.6rem;
  margin-bottom: 0.6rem;
`;

const TotalValueText = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
  margin-left: 0.6rem;
  margin-right: 0.9rem;
`;

const ValueInfoWrapper = styled.div`
  padding: 1.4rem;
  margin-top: 2.4rem;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(
      266deg,
      rgba(255, 255, 255, 0.1) 6.34%,
      rgba(255, 255, 255, 0) 87.21%
    ),
    rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5rem);

  div {
    display: flex;
    justify-content: space-between;
    span {
      color: #e1e4e6;
      ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
    }
  }
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
