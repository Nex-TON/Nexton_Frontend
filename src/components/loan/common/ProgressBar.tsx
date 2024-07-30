import React from "react";
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const StepsWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const StepCircle = styled.div<{ active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#1F53FF" : "transparent")};
  color: ${({ active }) => (active ? "#FFF" : "#C6CACA")};
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 18px */
  letter-spacing: -0.12px;

  border: 1px solid ${({ active }) => (active ? "#1F53FF" : "#C6CACA")};
`;

const StepLabel = styled.div<{ active: boolean }>`
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  margin-top: 0.6rem;
  text-align: center;
  color: ${({ active }) => (active ? "#000000" : "#A0A0A0")};
`;

const StepConnector = styled.div`
  width: 100%;
  height: 1px;
  background-color: #c6caca;
  position: relative;
`;

const StepConnectorActive = styled(StepConnector)`
  background-color: #0056ff;
  z-index: 1;
`;

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: "Check NFT details and Borrow information." },
    { label: "Checking Loan Protocol Risk" },
    { label: "Verify the information before loan approval." },
  ];

  return (
    <ProgressBarWrapper>
      <StepsWrapper>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <StepConnector>{index <= currentStep && <StepConnectorActive />}</StepConnector>}
            <Step>
              <StepCircle active={index + 1 <= currentStep}>{index + 1}</StepCircle>
              {index + 1 <= currentStep && <StepLabel active={index + 1 <= currentStep}>{step.label}</StepLabel>}
            </Step>
          </React.Fragment>
        ))}
      </StepsWrapper>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
