import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import RisksList from "@/components/loan/common/RisksList";

const tele = (window as any).Telegram.WebApp;

const RiskDisclosure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <RiskDisclosureWrapper>
        <RiskDisclosureHeaderTitle>
          <h1>Loan Protocol Risk Disclosure</h1>
        </RiskDisclosureHeaderTitle>
      <RisksList />
    </RiskDisclosureWrapper>
  );
};

export default RiskDisclosure;

const RiskDisclosureHeaderTitle = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 1.2rem 0;

  h1 {
    color: var(--Neutral-Neutural-30, #46494a);
    font-family: Montserrat;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
    letter-spacing: -0.44px;
  }
  margin-bottom: 2.7rem;

`;
const RiskDisclosureWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 2.5rem 1.5rem;
  margin-bottom:16.9rem;
`;