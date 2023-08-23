import { css, styled } from "styled-components";
import IcCheck from "../../../assets/icons/MyAsset/ic_check.svg";
import { useState } from "react";

const NFTFilter = () => {
  const [checkPeriod, setCheckPeriod] = useState([false, false, false, false]);
  const [period, setPeriod] = useState("");

  const handleCheckPeriod = (type: string) => {
    switch (type) {
      case "ongoing":
        setCheckPeriod([true, false, false, false]);
        setPeriod(type);
        break;
      case "forthcoming":
        setCheckPeriod([false, true, false, false]);
        setPeriod(type);
        break;
      case "expired":
        setCheckPeriod([false, false, true, false]);
        setPeriod(type);
        break;
      case "all":
        setCheckPeriod([false, false, false, true]);
        setPeriod(type);
        break;
    }
  };

  return (
    <NFTFilterWrapper>
      <NFTFilterUl>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("ongoing")}
          check={checkPeriod[0]}
          period={period}
        >
          Ongoing
          <NFTStatus type="ongoing" />
        </NFTFilterLi>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("forthcoming")}
          check={checkPeriod[1]}
        >
          Forthcoming
          <NFTStatus type="forthcoming" />
        </NFTFilterLi>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("expired")}
          check={checkPeriod[2]}
        >
          Expired
          <NFTStatus type="expired" />
        </NFTFilterLi>
        <NFTFilterLi
          onClick={() => handleCheckPeriod("all")}
          check={checkPeriod[3]}
        >
          All
          <img src={IcCheck} alt="check" />
        </NFTFilterLi>
      </NFTFilterUl>
    </NFTFilterWrapper>
  );
};

export default NFTFilter;

const NFTFilterWrapper = styled.div`
  position: absolute;
  top: 4.4rem;
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
const NFTFilterLi = styled.li<{ check: boolean; period?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  padding: 1rem 1.2rem;

  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
`;
const NFTStatus = styled.div<{ type?: string }>`
  width: 1rem;
  height: 1rem;

  border-radius: 50%;
  ${({ type }) =>
    type === "ongoing" &&
    css`
      background: linear-gradient(90deg, #61b5f2 0%, #98a1fe 100%);
    `}
  ${({ type }) =>
    type === "forthcoming" &&
    css`
      background: linear-gradient(140deg, #ff8c73 0%, #ffe0b0 100%);
    `}
      ${({ type }) =>
    type === "expired" &&
    css`
      background: linear-gradient(127deg, #a2a9bc 0%, #e5edff 100%);
    `}
`;
