import { css, styled } from "styled-components";
import DetailNFTInfoHeader from "./DetailNFTInfoHeader";
import IcTonSymbol from "../../../assets/icons/MyAsset/ic_tonSymbol.svg";
import { useNavigate } from "react-router-dom";

interface DetailNftInfoProps {
  handleMoveUnstaking: () => void;
}
const DetailNftInfo = (props: DetailNftInfoProps) => {
  const { handleMoveUnstaking } = props;

  const navigate = useNavigate();

  return (
    <DetailNftInfoWrapper>
      <DetailNFTInfoHeader title="NFT info" />
      <DetailInfoItemWrapper>
        <DetailInfoItem>
          <DetailInfoItemText>Token ID</DetailInfoItemText>
          <DetailInfoItemText>133123123</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Token Standard</DetailInfoItemText>
          <DetailInfoItemText>TEP 62</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Network</DetailInfoItemText>
          <DetailInfoItemText>
            <DetailTonSymbol>
              <img src={IcTonSymbol} alt="tonSymbol" />
              TON
            </DetailTonSymbol>
          </DetailInfoItemText>
        </DetailInfoItem>
      </DetailInfoItemWrapper>
      <DetailNFTInfoHeader title="Staking info" />
      <DetailInfoItemWrapper>
        <DetailInfoItem>
          <DetailInfoItemText>Principal</DetailInfoItemText>
          <DetailInfoItemText>133123123 TON</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Leveraged</DetailInfoItemText>
          <DetailInfoItemText>x 2.5</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Timelocks</DetailInfoItemText>
          <DetailInfoItemText>Days left</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Unstakable date</DetailInfoItemText>
          <DetailInfoItemText>DD/MM/YY</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Protocol Fees</DetailInfoItemText>
          <DetailInfoItemText>TON</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Current accrued Rewards</DetailInfoItemText>
          <DetailInfoItemText>TON</DetailInfoItemText>
        </DetailInfoItem>
      </DetailInfoItemWrapper>
      <ButtonWrapper>
        {/* <StyledButton>Unlock</StyledButton>
        <StyledButton type="borrow">Collateralizing</StyledButton> */}
        <StyledButton type="borrow" onClick={() => navigate("/loan/1")}>
          Collateralizing
        </StyledButton>
        <StyledButton type="unstaking" onClick={handleMoveUnstaking}>
          Unstaking
        </StyledButton>
      </ButtonWrapper>
    </DetailNftInfoWrapper>
  );
};

export default DetailNftInfo;

const DetailNftInfoWrapper = styled.div`
  width: 100%;
  padding: 1.8rem 1.4rem 3rem 1.4rem;
`;

const DetailInfoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  width: 100%;
  padding: 1.4rem 1.5rem 2.6rem 1.5rem;
`;

const DetailInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const DetailInfoItemText = styled.span`
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const DetailTonSymbol = styled.div`
  display: flex;
  align-items: center;

  gap: 0.6rem;

  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;

  width: 100%;
  margin-top: 0.8rem;
`;

const StyledButton = styled.button<{ type?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem 0;

  border: none;
  border-radius: 1.2rem;
  background-color: #f9f9ff;
  color: #09090a;
  ${({ type }) =>
    type === "borrow"
      ? css`
          background-color: #007aff;
          color: #fff;
        `
      : css`
          background-color: #33343e;
          color: #fff;
        `}
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);

  cursor: pointer;
  outline: none;
`;
