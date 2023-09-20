import styled from "styled-components";

import { getLockUpDate } from "../../../utils/getLockupDate";

interface Step3Props {
  input: string;
  ratio: number;
}

const Step3 = (props: Step3Props) => {
  const { input, ratio } = props;

  return (
    <Step3Wrapper>
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
  align-items: flex-start;

  width: 100%;
  padding: 0 2rem;
  margin-bottom: 4.6rem;
`;

const Step3DescWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.9rem;
`;

const Step3Desc = styled.div`
  color: #333;
  font-family: Montserrat;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem; /* 120% */
  letter-spacing: -0.046rem;
`;

const Step3LockUpWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  color: #45464f;
`;

const Step3DaysWrapper = styled.div``;

const Title3_1 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Title_3_1}
`;
