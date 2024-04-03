import { css, styled } from "styled-components";

import IcCheck from "../../../assets/icons/MyAsset/ic_check.svg";
interface NFTFilterProps {
  activeOpacity: boolean;
  checkPeriod: boolean[];
  period: string;
  handleCheckPeriod: (type: string) => void;
}

const NFTFilter = (props: NFTFilterProps) => {
  const { activeOpacity, checkPeriod, period, handleCheckPeriod } = props;

  return (
    <NFTFilterWrapper>
      <NFTFilterUl>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("Ongoing")}
          $check={checkPeriod[0]}
          $period={period}
          $activeOpacity={activeOpacity}
        >
          Ongoing
          <NFTStatus type="Ongoing" />
        </NFTFilterLi>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("Forthcoming")}
          $check={checkPeriod[1]}
          $activeOpacity={activeOpacity}
        >
          Forthcoming
          <NFTStatus type="Forthcoming" />
        </NFTFilterLi>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("Expired")}
          $check={checkPeriod[2]}
          $activeOpacity={activeOpacity}
        >
          Expired
          <NFTStatus type="Expired" />
        </NFTFilterLi>
      </NFTFilterUl>
    </NFTFilterWrapper>
  );
};

export default NFTFilter;

const NFTFilterWrapper = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 1.2rem;

  border-radius: 1rem;
  background-color: #f9f9ff;
  box-shadow: 0px 6px 10px 0px rgba(94, 97, 98, 0.3);

  z-index: 10;
`;
const NFTFilterUl = styled.ul`
  margin: 0;
  padding: 0;
`;
const NFTFilterLi = styled.li<{
  $check: boolean;
  $period?: string;
  $activeOpacity?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  padding: 1rem 1.2rem;

  color: #5e6162;
  cursor: pointer;

  ${({ theme }) => theme.fonts.Nexton_Label_Small};

  ${({ $activeOpacity }) =>
    $activeOpacity &&
    css`
      opacity: 0.3;
    `}

  ${({ $check, $period }) =>
    $check &&
    $period === "Ongoing" &&
    css`
      border-radius: 1.4rem 1.4rem 0 0;
      background-color: #e5e5ea;
    `}

    ${({ $check, $period }) =>
    $check &&
    $period === "All" &&
    css`
      border-radius: 0 0 1.4rem 1.4rem;
      background-color: #e5e5ea;
    `}
      

  ${({ $check }) =>
    $check &&
    css`
      background-color: #e5e5ea;
    `}

    transition: all 0.2s ease-in-out;
`;

const NFTStatus = styled.div<{ type?: string }>`
  width: 1.4rem;
  height: 1.4rem;

  border-radius: 50%;
  ${({ type }) =>
    type === "Ongoing" &&
    css`
      background: linear-gradient(90deg, #61b5f2 0%, #98a1fe 100%);
    `}
  ${({ type }) =>
    type === "Forthcoming" &&
    css`
      background: linear-gradient(140deg, #ff8c73 0%, #ffe0b0 100%);
    `}
      ${({ type }) =>
    type === "Expired" &&
    css`
      background: linear-gradient(127deg, #a2a9bc 0%, #e5edff 100%);
    `}
`;
