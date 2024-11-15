import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcTon from "@/assets/icons/MyAsset/ic_tonSymbol.svg";
import { IUnstakedListData } from "@/hooks/api/unstaking/useUnstakedList";
import { limitDecimals } from "@/utils/limitDecimals";

const UnstakedDetailItem = ({ item }: { item: IUnstakedListData }) => {
  const { nftId, availableIn, unstakedAt, unstakedAmount } = item;
  const navigate = useNavigate();

  return (
    <UnstakingDetailItemWrapper onClick={() => navigate(`/unstaking/${nftId}/view`)}>
      <UnstakingDetailId>ID {String(nftId).padStart(4, "0")}</UnstakingDetailId>

      <UnstakingDetailContentBox>
        <UnstakingDetailContentBoxItem style={{ marginBottom: "0.9rem" }}>
          <span>State</span>
          <p>{availableIn}</p>
        </UnstakingDetailContentBoxItem>

        <UnstakingDetailContentBoxItem>
          <span>Value</span>
          <p>{limitDecimals(unstakedAmount, 3)} TON</p>
        </UnstakingDetailContentBoxItem>

        <UnstakingDetailContentBoxDivider />

        <UnstakingDetailContentBoxItem>
          <span>Date of unstaking</span>
          <p>
            {unstakedAt
              ? new Date(unstakedAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
              : ""}
          </p>
        </UnstakingDetailContentBoxItem>
      </UnstakingDetailContentBox>
    </UnstakingDetailItemWrapper>
  );
};

export default UnstakedDetailItem;

const UnstakingDetailItemWrapper = styled.div`
  width: 100%;
  padding: 2rem;

  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.50);

  & + & {
    margin-top: 0.8rem;
  }

  cursor: pointer;
`;

const UnstakingDetailContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin-top: 1.2rem;
`;

const UnstakingDetailContentBoxItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  span {
    color: #aaaeaf;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  }
`;

const UnstakingDetailContentBoxDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f1f4f4;

  margin: 2rem 0;
`;

const UnstakingDetailId = styled.div`
  display: flex;
  width: fit-content;
  height: 32px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 30px;
  background: linear-gradient(276deg, rgba(197, 197, 197, 0.71) 5.57%, rgba(0, 0, 0, 0.8) 95.68%);

  color: #fff;
  text-align: center;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;