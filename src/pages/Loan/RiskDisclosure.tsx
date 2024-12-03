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
        <span>
          <img src={IcAlert} alt="alert_icon" />
        </span>
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

  padding: 2.9rem 1.5rem;
`;

const RiskDisclosureTitleBox = styled.div`
  width: 65%;
  display: flex;
  align-items: start;

  gap: 1.1rem;

  h1 {
    color: #0f0f0f;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }

  span {
    margin-top: 0.65rem;
  }
`;