import { styled } from "styled-components";

import IcChecked from "@/assets/icons/Stake/ic_checked.svg";
import IcTriangleBlack from "@/assets/icons/Stake/ic_triangle_black.svg";
import IcTriangleDisabled from "@/assets/icons/Stake/ic_triangle_disabled.svg";
import IcTriangleWhite from "@/assets/icons/Stake/ic_triangle_white.svg";
import IcUnchecked from "@/assets/icons/Stake/ic_unchecked.svg";
import { INominator } from "@/constants/Nominator";

export type PoolType = "bemo" | "arbitrage" | "nominator";

interface NominatorItemProps {
  title: string;
  icon?: string;
  totalStake?: number;
  profit: boolean;
  pool: PoolType;
  check: boolean;
  id: number;
  description: string;
  selectedNominator: INominator;
  handleSelectNominator: (index: number) => void;
  tag?: string;
  apy?: number;
}

const NominatorItem: React.FC<NominatorItemProps> = ({
  profit,
  pool,
  title,
  icon,
  totalStake,
  id,
  selectedNominator,
  handleSelectNominator,
  tag,
  apy,
  description,
}) => {
  const isSelected = selectedNominator?.id === id;
  const iconUnchecked = profit && <img src={IcUnchecked} alt="unchecked" />;
  const iconChecked = profit && <img src={IcChecked} alt="checked" />;
  const triangleIcon = profit ? (
    <img src={isSelected ? IcTriangleWhite : IcTriangleBlack} alt="triangle" />
  ) : (
    <img src={IcTriangleDisabled} alt="triangle_disabled" />
  );

  const handleClick = () => {
    handleSelectNominator(id);
  };

  return (
    <NominatorItemWrapper $disabled={!profit} $active={isSelected} onClick={() => (profit ? handleClick() : null)}>
      <NominatorItemTop>
        <NominatorItemTopLeft>
          {tag && <NominatorItemTopTag $active={isSelected}>{tag}</NominatorItemTopTag>}
          <TitleMedium style={{ gap: "1.7rem", marginTop: "0.4rem" }}>
            {icon && <img src={icon} alt="icon" />} {title}
          </TitleMedium>
          <Caption3>
            Profit share <LabelMedium>80%</LabelMedium>
          </Caption3>
        </NominatorItemTopLeft>

        <NominatorItemTopRight>
          <NominatorCheckButton
            onClick={e => {
              e.stopPropagation();
              handleClick();
            }}
            disabled={!profit}
          >
            {isSelected ? iconChecked : iconUnchecked}
          </NominatorCheckButton>
          {/* APY is only available for bemo and arbitrage pools */}
          {apy && (
            <NominatorAPY>
              <span>APY</span>
              <h2>{apy.toFixed(2)}%</h2>
            </NominatorAPY>
          )}
        </NominatorItemTopRight>
      </NominatorItemTop>

      <NominatorItemBottom>
        <NominatorItemBottomWrapper>
          {triangleIcon}
          <NominatorItemBottomText style={{ maxWidth: "75%" }}>
            <Caption3>
              By selecting this card,
              <br />
              <Caption3 style={{ fontWeight: "bold" }}>{description}</Caption3>
            </Caption3>
          </NominatorItemBottomText>
        </NominatorItemBottomWrapper>

        {/* Temporarily removed */}
        {totalStake && (
          <NominatorItemBottomText style={{ alignItems: "flex-end" }}>
            <Caption3>TVL</Caption3>
            <LabelMedium>{totalStake.toLocaleString()} TON</LabelMedium>
          </NominatorItemBottomText>
        )}
      </NominatorItemBottom>
    </NominatorItemWrapper>
  );
};

export default NominatorItem;

const NominatorItemWrapper = styled.div<{ $active: boolean; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;

  padding: 2rem 2.4rem;
  border-radius: 2rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.14);
  & + & {
    margin-top: 1rem;
  }

  background: ${({ $active, $disabled }) => {
    let background: string;
    if ($active) {
      background = "#575757";
    } else if ($disabled) {
      background = "#E1E4E6";
    } else {
      background = "#fff";
    }

    return background;
  }};
  color: ${({ $disabled, $active }) => {
    let color: string;
    if ($active) {
      color = "#fff";
    } else if ($disabled) {
      color = "#B9B9BA";
    } else {
      color = "#303234";
    }

    return color;
  }};

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};
`;

const NominatorItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.6rem;

  width: 100%;

  border-radius: 2rem 2rem 0 0;
`;

const NominatorItemTopTag = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 6px;
  gap: 10px;

  border-radius: 5px;
  border: 1px dashed ${({ $active }) => ($active ? "#fff" : "#575757")};
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

const NominatorItemTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
`;

const NominatorItemTopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 1rem;
`;

const NominatorCheckButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 3rem;
  height: 3rem;

  border: none;
  background-color: transparent;

  outline: none;
  cursor: pointer;
`;

const NominatorAPY = styled.div`
  display: flex;
  flex-direction: column;

  span {
    text-align: end;
    ${({ theme }) => theme.fonts.Telegram_Caption_3};
  }

  h2 {
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
  }
`;

const NominatorItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;

  width: 100%;
  margin-top: 2.2rem;
`;

const NominatorItemBottomWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex: min-content;

  gap: 0.6rem;

  img {
    padding-top: 3px;
  }
`;

const NominatorItemBottomText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
`;

const Caption3 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const TitleMedium = styled.h1`
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;

const LabelMedium = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;
