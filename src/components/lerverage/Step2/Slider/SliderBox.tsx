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

  useEffect(() => {
    if (ratio > 1) {
      setIsDisabled(true);
      setRatio(1.0);
      setTimeout(() => {
        setIsDisabled(false);
      }, 1500);
    }
  }, [ratio]);

  return (
    <SliderWrapper>
      <LeverageSlider ratio={ratio} setRatio={setRatio} />
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
  margin-bottom: 2.6rem;
`;

const SliderTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 2rem;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};
  color: #000000;
`;

const SliderTextRightBox = styled.div`
  span {
    ${({ theme }) => theme.fonts.Telegram_Medium_2};
    color: #000000;
  }
`;

const LeverageErrorBox = styled.div`
  width: 100%;
  margin: 1rem 0 0.6rem 0;

  color: #0088cc;
  ${({ theme }) => theme.fonts.Telegram_Caption_1};
`;
