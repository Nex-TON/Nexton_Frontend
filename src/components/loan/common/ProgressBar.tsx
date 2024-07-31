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
  position: relative;
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 200px;
  margin: 2rem 0 3.5rem 0;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const StepCircle = styled.div<{ active: boolean }>`
  position: relative;
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

const StepLabel = styled.div<{ position: "left" | "center" | "right" }>`
  top: 3.5rem;
  left: ${({ position }) => (position === "left" ? "-30%" : position === "center" ? "7.5%" : "50%")};
  position: absolute;
  width: 175px;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  text-align: center;
  color: #5e6162;
`;

const StepConnector = styled.div<{ active: boolean }>`
  position: relative;
  top: 15px;
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed ${({ active }) => (active ? "#0056ff" : "#C6CACA")};
  background-color: transparent;
`;

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: "Check NFT details and Borrow information." },
    { label: "Checking Loan Protocol Risk" },
    { label: "Verify the information before loan approval." },
  ];

  const getStepPosition = currentStep => {
    if (currentStep === 1) return "left";
    if (currentStep === steps.length) return "right";
    return "center";
  };

  return (
    <ProgressBarWrapper>
      <StepsWrapper>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <StepConnector active={index <= currentStep} />}
            <Step>
              <StepCircle active={index + 1 <= currentStep}>{index + 1}</StepCircle>
              {index + 1 === currentStep && <StepLabel position={getStepPosition(currentStep)}>{step.label}</StepLabel>}
            </Step>
          </React.Fragment>
        ))}
      </StepsWrapper>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
