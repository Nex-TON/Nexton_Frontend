import styled from "styled-components";
import Step from "../common/Step";
import Title from "../common/Title";
import SliderBox from "./Slider/SliderBox";
import StatusDetail from "../../common/StatusDetail";

interface Step2Props {
  input: string;
  maxLeverage: number;
  ratio: number;
  setRatio: (ratio: number) => void;
  setMaxLeverage: (maxLeverage: number) => void;
}
const Step2 = (props: Step2Props) => {
  const { input, maxLeverage, setMaxLeverage, ratio, setRatio } = props;

  return (
    <Step2Wrapper>
      <Step title="Step 2" />
      <Title title="Set Leverage Times" />
      <SliderBox ratio={ratio} setRatio={setRatio} />
      <StatusDetail
        type="Leverage"
        input={input}
        maxLeverage={maxLeverage}
        setMaxLeverage={setMaxLeverage}
      />
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
