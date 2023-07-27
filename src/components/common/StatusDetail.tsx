import { useEffect } from "react";
import styled from "styled-components";

interface StatusDetailProps {
  type: string;
  input?: string;
  maxLeverage?: number;
  setMaxLeverage?: (maxLeverage: number) => void;
}
const StatusDetail = (props: StatusDetailProps) => {
  const { type, input, maxLeverage, setMaxLeverage } = props;

  const checkMaxLeverage = (ratio: number) => {
    if (ratio >= 5) {
      return "x5.0";
    } else if (ratio >= 4.5 && ratio < 5) {
      return "x4.5";
    } else if (ratio >= 4 && ratio < 4.5) {
      return "x4.0";
    } else if (ratio >= 3.5 && ratio < 4) {
      return "x3.5";
    } else if (ratio >= 3 && ratio < 3.5) {
      return "x3.0";
    } else if (ratio >= 2.5 && ratio < 3) {
      return "x2.5";
    } else if (ratio >= 2 && ratio < 2.5) {
      return "x2.0";
    } else if (ratio >= 1.5 && ratio < 2) {
      return "x1.5";
    } else {
      return "x1.0";
    }
  };

  useEffect(() => {
    if (setMaxLeverage) {
      setMaxLeverage(
        (Number(input) + Number(0.8)) / Number(input) > 5
          ? 5
          : (Number(input) + Number(0.8)) / Number(input)
      );
    }
  }, [input, setMaxLeverage]);

  return (
    <LerverageDetailWrapper>
      {type === "Leverage" ? (
        <LeverageDetailText>💪🏼 Max. leverage Amount & Times</LeverageDetailText>
      ) : (
        <LeverageDetailText>💧 Pool Status</LeverageDetailText>
      )}
      <AvailableBox>
        <LeverageDetailText>Available Amount</LeverageDetailText>
        <div>
          <LeverageDetailText style={{ marginRight: "1.3rem" }}>
            0.8
          </LeverageDetailText>
          <LeverageDetailText>TON</LeverageDetailText>
        </div>
      </AvailableBox>
      <MaxLeverageBox>
        {type === "Leverage" ? (
          <>
            <LeverageDetailText>Max Leverage</LeverageDetailText>
            <LeverageDetailText>
              {maxLeverage && checkMaxLeverage(maxLeverage)}
            </LeverageDetailText>
          </>
        ) : (
          <>
            <LeverageDetailText>Total Liquidity Provision </LeverageDetailText>
            <div>
              <LeverageDetailText style={{ marginRight: "1.3rem" }}>
                000.000
              </LeverageDetailText>
              <LeverageDetailText>TON</LeverageDetailText>
            </div>
          </>
        )}
      </MaxLeverageBox>
    </LerverageDetailWrapper>
  );
};

export default StatusDetail;

const LerverageDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 1.6rem 1.8rem;

  border: 0.1rem solid #d1d1d6;
  border-radius: 1rem;
`;

const LeverageDetailText = styled.span`
  color: #8e8e93;
  font-family: Pretendard;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 510;
  line-height: 1.8rem; /* 138.462% */
  letter-spacing: -0.0078rem;
`;

const AvailableBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 1.4rem;
`;

const MaxLeverageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 0.6rem;
`;
