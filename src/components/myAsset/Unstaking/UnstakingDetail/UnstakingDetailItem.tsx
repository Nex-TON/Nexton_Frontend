import { useNavigate } from "react-router-dom";
import { css, styled } from "styled-components";

import IcTon from "../../../../assets/icons/MyAsset/ic_tonSymbol.svg";
import { nftInfo } from "../../../../types/Nft";
import {
  AvailableDate,
  UnstakingDateChanger,
} from "../../../../utils/dateChanger";
import { numberCutter } from "../../../../utils/numberCutter";

interface UnstakingDetailItemProps {
  item: nftInfo;
}

const UnstakingDetailItem = (props: UnstakingDetailItemProps) => {
  const { nftId, amount, timeStamp } = props.item;
  const navigate = useNavigate();

  return (
    <UnstakingDetailItemWrapper
      onClick={() => navigate(`/unstaking/view/${nftId}`)}
    >
      <UnstakingDetailTopBox>
        <UnstakingDetailId>
          ID {String(nftId).padStart(5, "0")}
        </UnstakingDetailId>
        <UnstakingDetailRightTopBox>
          <CaptionText>Available in</CaptionText>
          <BoldText>
            {AvailableDate(timeStamp) < 0
              ? `0000 Hours`
              : `${AvailableDate(timeStamp)} Hours`}
          </BoldText>
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
        <CaptionText>{UnstakingDateChanger(timeStamp, "detail")}</CaptionText>
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

  & + & {
    margin-top: 0.8rem;
  }

  cursor: pointer;
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
