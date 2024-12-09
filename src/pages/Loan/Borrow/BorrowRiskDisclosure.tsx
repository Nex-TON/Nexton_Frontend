import { useEffect } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
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
  const location=useLocation();
  const {borrowAmount}=location.state||{};

  const handleNext = () => {
    console.log(`borrow amount:${borrowAmount}`)
    navigate(`/loan/${id}/borrow/verify`, {
      state: { borrowAmount }, // 값을 그대로 다음 페이지로 전달
    });
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(`/loan/${id}/borrow/details`);
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

        <BorrowContentBoxTitle>Loan Protocol Risk Disclosure</BorrowContentBoxTitle>
        <RisksList />

      {!isDevMode ? (
        <MainButton text="Next" onClick={handleNext} />
      ) : (
        <button onClick={handleNext}>next</button>
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

  border-radius: 1.5rem;
  background: #fff;

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const BorrowContentBoxTitle = styled.h2`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
  color: #303234;

  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 1.7rem;
`;
