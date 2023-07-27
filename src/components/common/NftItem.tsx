import styled from "styled-components";
import IcNft from "../../assets/icons/ic_nft.svg";
import { useNavigate } from "react-router";
import { lockUpDateChanger } from "../../utils/dateChanger";

interface NftItemProps {
  idx?: number;
  principal?: string;
  leverage?: number;
  lockup: number;
}
const NftItem = (props: NftItemProps) => {
  const navigate = useNavigate();
  const { lockup, idx } = props;

  const moveToDetail = (idx: number) => {
    navigate(`/myasset/${idx}`);
  };

  return (
    <NftItemWrapper onClick={() => moveToDetail(idx)}>
      <NftImg src={IcNft} alt="nft" />
      <NftStatusText>
        Expired Date {lockUpDateChanger(lockup, "expired")}
      </NftStatusText>
      <NftDdayText>D - {lockup}</NftDdayText>
    </NftItemWrapper>
  );
};

export default NftItem;

const NftItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 14rem;
  height: 17.5rem;

  border-radius: 1.4rem;
  background-color: #f2f2f7;

  cursor: pointer;
`;

const NftImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 14rem;

  border-radius: 1.4rem;
`;

const NftStatusText = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 0 auto;

  ${({ theme }) => theme.fonts.Telegram_Caption_2};
  color: #007aff;
`;

const NftDdayText = styled.span`
  position: absolute;
  top: 1rem;
  left: 1.5rem;

  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  color: #ffffff;
`;
