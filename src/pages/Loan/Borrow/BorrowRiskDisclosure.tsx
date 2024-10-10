import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { styled } from "styled-components";

import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import RisksList from "@/components/loan/common/RisksList.tsx";
import { isDevMode } from "@/utils/isDevMode.ts";

import { BorrowHeaderBox, BorrowHeaderBoxTitle, BorrowWrapper } from "./BorrowDetails.styled.tsx";

const tele = (window as any).Telegram.WebApp;

const BorrowRiskDisclosure = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan/1/borrow/details");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  return (
    <BorrowWrapper>
      <BorrowHeaderBox>
        <BorrowHeaderBoxTitle>
          <h1>Loan</h1>
        </BorrowHeaderBoxTitle>
      </BorrowHeaderBox>

      <ProgressBar currentStep={2} />

      <BorrowContentBox>
        <BorrowContentBoxTitle>Loan Protocol Risk Disclosure</BorrowContentBoxTitle>
        <RisksList />
      </BorrowContentBox>

      {!isDevMode ? (
        <MainButton text="Next" onClick={() => navigate(`/loan/${id}/borrow/verify`)} />
      ) : (
        <button onClick={() => navigate(`/loan/${id}/borrow/verify`)}>next</button>
      )}
    </BorrowWrapper>
  );
};

export default BorrowRiskDisclosure;

const BorrowContentBox = styled.div`
  display: inline-flex;
  padding: 13px 25px 37.5px 20px;
  flex-direction: column;
  align-items: center;

  margin-top: 2rem;

  border-radius: 20px;
  background: #fff;

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const BorrowContentBoxTitle = styled.h2`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #303234;

  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
`;
