import styled from "styled-components";
import Step from "../common/Step";
import { getLockUpDate } from "../../../utils/getLockupDate";

interface Step3Props {
  input: string;
  ratio: number;
}

const Step3 = (props: Step3Props) => {
  const { input, ratio } = props;

  return (
    <Step3Wrapper>
      <Step title="Step 4" step="Step3" />
      <Step3DescWrapper>
        <Step3Desc>Check your lock-up period</Step3Desc>
      </Step3DescWrapper>
      <Step3LockUpWrapper>
        <Title3_1>Lock-up period</Title3_1>
        <Step3DaysWrapper>
          <Title3_1 style={{ marginRight: "2.1rem" }}>
            {getLockUpDate(input, ratio)}
          </Title3_1>
          <Title3_1>days</Title3_1>
        </Step3DaysWrapper>
      </Step3LockUpWrapper>
    </Step3Wrapper>
  );
};

export default Step3;

const Step3Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;

  margin-bottom: 4.6rem;
`;

const Step3DescWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.6rem;

  text-align: center;
`;

const Step3Desc = styled.div`
  margin-bottom: 1rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const Step3LockUpWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0 1rem;

  color: #45464f;
`;

const Step3DaysWrapper = styled.div``;

const Title3_1 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Title_3_1}
`;
