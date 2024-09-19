import styled from "styled-components";

import { getLockUpDate } from "../../../utils/getLockupDate";

interface Step3Props {
  input: string;
  ratio: number;
}

const Lockup = (props: Step3Props) => {
  const { input, ratio } = props;

  return (
    <LockupWrapper>
      <LockupDescWrapper>
        <LockupDesc>Check remaining lock-up period</LockupDesc>
      </LockupDescWrapper>
      <LockUpBox>
        <Title3_1>Remaining Lock-up period</Title3_1>
        <LockupDaysWrapper>
          <Title3_1 style={{ marginRight: "2.1rem" }}>
            {getLockUpDate(input, ratio)}
          </Title3_1>
          <Title3_1>days</Title3_1>
        </LockupDaysWrapper>
      </LockUpBox>
    </LockupWrapper>
  );
};

export default Lockup;

const LockupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 0 2rem;
  margin-bottom: 4.6rem;
`;

const LockupDescWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.9rem;
`;

const LockupDesc = styled.div`
  color: #333;
  font-family: Montserrat;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.4rem; /* 120% */
  letter-spacing: -0.046rem;
`;

const LockUpBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  color: #45464f;
`;

const LockupDaysWrapper = styled.div``;

const Title3_1 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Title_3_1}
`;
