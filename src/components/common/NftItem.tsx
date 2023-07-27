import styled from "styled-components";
import IcNft from "../../assets/icons/ic_nft.svg";

interface NftItemProps {
  moveToDetail?: () => void;
}
const NftItem = (props: NftItemProps) => {
  const { moveToDetail } = props;

  return (
    <NftItemWrapper onClick={moveToDetail}>
      <NftImg src={IcNft} alt="nft" />
      <NftStatusText>Expired</NftStatusText>
      <NftDdayText>D-Day</NftDdayText>
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

  border-radius: 1.4rem;
`;

const NftStatusText = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 5.3rem;

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
