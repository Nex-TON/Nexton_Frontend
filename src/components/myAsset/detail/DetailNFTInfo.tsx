import { css, styled } from "styled-components";
import DetailNFTInfoHeader from "./DetailNFTInfoHeader";
import IcTonSymbol from "../../../assets/icons/MyAsset/ic_tonSymbol.svg";
import { useNavigate } from "react-router-dom";
import { nftInfo } from "../../../types/Nft";
import { numberCutter } from "../../../utils/numberCutter";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";
import { getProtocolFee } from "../../../utils/getProtocolFee";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

interface DetailNftInfoProps {
  item: nftInfo;
}
const DetailNftInfo = (props: DetailNftInfoProps) => {
  const { item } = props;
  const { nftId, amount, leverage, timeStamp, lockPeriod, nominator, status } =
    item;

  const navigate = useNavigate();

  return (
    <DetailNftInfoWrapper>
      <DetailNFTInfoHeader title="NFT info" />
      <DetailInfoItemWrapper>
        <DetailInfoItem>
          <DetailInfoItemText>Token ID</DetailInfoItemText>
          <DetailInfoItemText>
            {String(nftId).padStart(5, "0")}
          </DetailInfoItemText>
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
          <DetailInfoItemText>{numberCutter(amount)} TON</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Nominator Pool</DetailInfoItemText>
          <DetailInfoItemText>{nominator}</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Leveraged</DetailInfoItemText>
          <DetailInfoItemText>x {leverage.toFixed(1)}</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Lockup period</DetailInfoItemText>
          <DetailInfoItemText>{lockPeriod} days</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Unstakable date</DetailInfoItemText>
          <DetailInfoItemText>
            {expiredDateChanger(timeStamp, lockPeriod, "detail")}
          </DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Protocol Fees</DetailInfoItemText>
          <DetailInfoItemText>
            {numberCutter(getProtocolFee(String(amount), leverage))}%
          </DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Staking APR</DetailInfoItemText>
          <DetailInfoItemText>5%</DetailInfoItemText>
        </DetailInfoItem>
        <DetailInfoItem>
          <DetailInfoItemText>Total Amount</DetailInfoItemText>
          <DetailInfoItemText>{numberCutter(amount)} TON</DetailInfoItemText>
        </DetailInfoItem>
      </DetailInfoItemWrapper>
      <ButtonWrapper>
        {DDayChange(timeStamp, lockPeriod) > 0 ? (
          <MainButton
            text="Use as collateral"
            onClick={() => navigate(`/loan/${nftId}`)}
          />
        ) : (
          status === 0 && (
            <MainButton
              text="Unstaking"
              color="#31333e"
              textColor="#fff"
              onClick={() => navigate(`/unstaking/${nftId}`)}
            />
          )
        )}
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
  ${({ type }) =>
    type === "borrow"
      ? css`
          background-color: #007aff;
          color: #fff;
        `
      : type === "unstaking"
      ? css`
          background-color: #33343e;
          color: #fff;
        `
      : css`
          background-color: #f9f9ff;
          color: #09090a;
        `}
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);

  cursor: pointer;
  outline: none;
`;
