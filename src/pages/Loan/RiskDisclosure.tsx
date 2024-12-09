import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcAlert from "@/assets/icons/Loan/ic_alert.svg";
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
      <RiskDisclosureTitleBox>
        <h1>Loan Protocol Risk Disclosure</h1>
      </RiskDisclosureTitleBox>
      <RisksList />
    </RiskDisclosureWrapper>
  );
};

export default RiskDisclosure;

const RiskDisclosureWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: auto;

  padding: 1.3rem 1.5rem 19.4rem 1.5rem;
`;

const RiskDisclosureTitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
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
