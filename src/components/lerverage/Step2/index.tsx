import styled from "styled-components";
import Step from "../common/Step";
import Title from "../common/Title";
import SliderBox from "./Slider/SliderBox";
import StatusDetail from "../../common/StatusDetail";
import IcBlackArrowDown from "../../../assets/icons/ic_black_arrow_down.svg";
import IcBlackArrowUp from "../../../assets/icons/ic_black_arrow_up.svg";
import { useState } from "react";

interface Step2Props {
  input: string;
  maxLeverage: number;
  ratio: number;
  setRatio: (ratio: number) => void;
  setMaxLeverage: (maxLeverage: number) => void;
}
const Step2 = (props: Step2Props) => {
  const { input, maxLeverage, setMaxLeverage, ratio, setRatio } = props;
  const [isOpenSlider, setIsOpenSlider] = useState(false);

  return (
    <Step2Wrapper>
      <Step title="Step 3" />
      <TitleBox>
        <Title title="Set Leverage  Multiplier" />
        {isOpenSlider ? (
          <img
            src={IcBlackArrowUp}
            alt="arrow"
            onClick={() => setIsOpenSlider((prev) => !prev)}
          />
        ) : (
          <img
            src={IcBlackArrowDown}
            alt="arrow"
            onClick={() => setIsOpenSlider((prev) => !prev)}
          />
        )}
      </TitleBox>
      <LeverageBox>
        Leverage
        <LeverageRightBox>
          x<span>{ratio}</span>
        </LeverageRightBox>
      </LeverageBox>
      {isOpenSlider && (
        <>
          <SliderBox ratio={ratio} setRatio={setRatio} />
          <StatusDetail
            type="Leverage"
            input={input}
            maxLeverage={maxLeverage}
            setMaxLeverage={setMaxLeverage}
          />
        </>
      )}
    </Step2Wrapper>
  );
};

export default Step2;

const Step2Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 85%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LeverageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 2.6rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const LeverageRightBox = styled.div`
  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};

  span {
    margin-left: 1rem;
    ${({ theme }) => theme.fonts.Telegram_Title_1};
  }
`;
