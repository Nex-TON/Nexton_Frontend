import { useEffect } from "react";
import styled from "styled-components";
import { LP_POOL } from "../../constants/Lp Pool";

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
        (Number(input) + Number(LP_POOL / 100)) / Number(input) > 5
          ? 5
          : (Number(input) + Number(LP_POOL / 100)) / Number(input)
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
            {/* {LP_POOL / 100} */}
            000.000
          </LeverageDetailText>
          <LeverageDetailText>TON</LeverageDetailText>
        </div>
      </AvailableBox>
      <MaxLeverageBox>
        {type === "Leverage" ? (
          <>
            <LeverageDetailText>Max Leverage</LeverageDetailText>
            <LeverageDetailText>
              {/* {maxLeverage && checkMaxLeverage(maxLeverage)} */}x 1.0
            </LeverageDetailText>
          </>
        ) : (
          <>
            <LeverageDetailText>Total Liquidity Provision </LeverageDetailText>
            <div>
              <LeverageDetailText style={{ marginRight: "1.3rem" }}>
                {LP_POOL}
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
  padding: 1.4rem 2rem;

  border-radius: 1rem;
  background-color: #f9f9ff;
`;

const LeverageDetailText = styled.span`
  color: #8e8e93;
  ${({ theme }) => theme.fonts.Telegram_Footnote_1};
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
