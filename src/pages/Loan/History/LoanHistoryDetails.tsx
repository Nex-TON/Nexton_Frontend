import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import StakingInfo from "@/components/loan/common/StakingInfo";
import { LoanHeaderBox, LoanHeaderBoxTitle, LoanWrapper } from "../Loan.styled";
const tele = (window as any).Telegram.WebApp;

const alwaysVisibleItems = [
  { label: "Borrowed nxTON", value: "000.00 nxTON" },
  { label: "Principal", value: "00000 TON" },
  { label: "LTV", value: "95.0%" },
];

const stakingInfoItems = [
  {
    header: "Collateralizing NFT info",
    items: [
      { label: "NFT ID", value: "4817sddss863ddddwdwsdwd" },
      { label: "Network", value: "TON" },
      { label: "LTV", value: "95.0%" },
    ],
  },
  {
    header: "Staking info",
    items: [
      { label: "Principal", value: "10,000 TON" },
      { label: "Nominator Pool", value: "DG Pool #1" },
      { label: "Leveraged", value: "X1.0" },
      { label: "Lockup period", value: "60 days" },
      { label: "Unstakable date", value: "DD.MM.YY" },
      { label: "Protocol Fees", value: "2%" },
      { label: "Total Amount", value: "10,083 TON" },
    ],
  },
];

// ! Data is currently mocked
const LoanHistoryDetails = () => {
  const navigate = useNavigate();
  const id=useParams();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan/history");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  return (
    <LoanWrapper>
      <LoanHeaderBox>
        <LoanHeaderBoxTitle>
          <h1>Loan detail</h1>
        </LoanHeaderBoxTitle>
      </LoanHeaderBox>

      <LoanContentBox>
        <StakingInfo
          isExpandable={true}
          theme="white"
          title={String(id)}
          titleButton={<StakingInfoTitleButton $theme="paid">Paid off</StakingInfoTitleButton>}
          alwaysVisibleItems={alwaysVisibleItems}
          stakingInfoItems={stakingInfoItems}
        />
      </LoanContentBox>
    </LoanWrapper>
  );
};

export default LoanHistoryDetails;

const LoanContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  margin-top: 3.1rem;
  padding-bottom: 4rem;
`;

const StakingInfoTitleButton = styled.div<{ $theme: "paid" | "expiration" }>`
  display: inline-flex;
  height: 32px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 19px;
  background: ${({ $theme }) => ($theme === "paid" ? "#1f53ff" : "#F2F2F7")};
  color: ${({ $theme }) => ($theme === "paid" ? "#fff" : "#303234")};

  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;
