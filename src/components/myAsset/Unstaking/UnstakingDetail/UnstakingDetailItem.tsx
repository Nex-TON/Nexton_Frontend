import { css, styled } from "styled-components";
import IcTon from "../../../../assets/icons/MyAsset/ic_tonSymbol.svg";
import { useNavigate } from "react-router-dom";
import { nftInfo } from "../../../../types/Nft";
import { numberCutter } from "../../../../utils/numberCutter";
import { UnstakingDateChanger } from "../../../../utils/dateChanger";

interface UnstakingDetailItemProps {
  item: nftInfo;
}

const UnstakingDetailItem = (props: UnstakingDetailItemProps) => {
  const { nftId, amount } = props.item;
  const navigate = useNavigate();

  return (
    <UnstakingDetailItemWrapper onClick={() => navigate("/unstaking/view/1")}>
      <UnstakingDetailTopBox>
        <UnstakingDetailId>
          ID {String(nftId).padStart(5, "0")}
        </UnstakingDetailId>
        <UnstakingDetailRightTopBox>
          <CaptionText>Available in</CaptionText>
          <BoldText>0000 Hours</BoldText>
        </UnstakingDetailRightTopBox>
      </UnstakingDetailTopBox>
      <UnstakingDetailMiddel>
        <UnstakingDetailRightTopBox>
          <CaptionText>Value</CaptionText>
          <BoldText>
            {numberCutter(amount)}
            <BoldText style={{ marginLeft: "0.4rem" }}>TON</BoldText>
          </BoldText>
        </UnstakingDetailRightTopBox>
      </UnstakingDetailMiddel>
      <UnstakingDetailBottomBox>
        <CaptionText>Date of unstaking</CaptionText>
        <CaptionText>{UnstakingDateChanger("detail")}</CaptionText>
      </UnstakingDetailBottomBox>
    </UnstakingDetailItemWrapper>
  );
};

export default UnstakingDetailItem;

const UnstakingDetailItemWrapper = styled.div`
  width: 100%;
  padding: 2rem;

  border-radius: 2rem;
  background-color: #fff;
`;

const UnstakingDetailTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
const UnstakingDetailId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 0.4rem 1.2rem;

  border-radius: 2rem;
  background-color: #141420;
  color: #f1f1f1;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const UnstakingDetailMiddel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-top: 1.2rem;
`;
const UnstakingDetailRightTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.6rem;
`;

const CaptionText = styled.span`
  color: #000;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const BoldText = styled.span`
  color: #000;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
`;

const UnstakingDetailBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 2.6rem;
`;
