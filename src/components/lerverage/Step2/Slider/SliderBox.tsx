import styled from "styled-components";
import LeverageSlider from "./LeverageSlider";
import { useEffect, useState } from "react";

interface SliderBoxProps {
  ratio: number;
  setRatio: (ratio: number) => void;
}

const SliderBox = (props: SliderBoxProps) => {
  const { ratio, setRatio } = props;
  const [isDisabled, setIsDisabled] = useState(false);

  const getValues = (event: Event, value: number | number[]) => {
    event.preventDefault();
    if (Number(value) > 1) {
      setIsDisabled(true);
      setRatio(1.0);
      setTimeout(() => {
        setIsDisabled(false);
      }, 2500);
      return;
    }
    setRatio(value as number);
  };

  return (
    <SliderWrapper>
      <LeverageSlider
        ratio={ratio}
        getValues={getValues}
        isDisabled={isDisabled}
      />
      {isDisabled && (
        <LeverageErrorBox>
          Please adjust leverage times with the max leverage multiplier.
        </LeverageErrorBox>
      )}
    </SliderWrapper>
  );
};

export default SliderBox;

const SliderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.076rem;
`;

const LeverageErrorBox = styled.div`
  width: 100%;
  margin: 0 0 0.6rem 0;

  color: #0088cc;
  ${({ theme }) => theme.fonts.Telegram_Caption_1};
`;
