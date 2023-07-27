import styled from "styled-components";
import LeverageSlider from "./LeverageSlider";

interface SliderBoxProps {
  ratio: number;
  setRatio: (ratio: number) => void;
}

const SliderBox = (props: SliderBoxProps) => {
  const { ratio, setRatio } = props;

  return (
    <SliderWrapper>
      <LeverageSlider ratio={ratio} setRatio={setRatio} />
      <SliderTextBox>
        Leveraged reward
        <SliderTextRightBox>
          <span style={{ marginRight: "2.4rem" }}>x{ratio}</span>
          <span>TON/1yr</span>
        </SliderTextRightBox>
      </SliderTextBox>
    </SliderWrapper>
  );
};

export default SliderBox;

const SliderWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.1rem;
`;

const SliderTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 2.3rem;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};
  color: #000000;
`;

const SliderTextRightBox = styled.div`
  span {
    ${({ theme }) => theme.fonts.Telegram_Medium_2};
    color: #000000;
  }
`;
