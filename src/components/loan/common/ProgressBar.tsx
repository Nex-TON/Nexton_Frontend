import React from "react";
import styled from "styled-components";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: "Check NFT details and Borrow information."},
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
            {index > 0 && <StepConnector />}
            <Step>
              <StepCircle active={index + 1 === currentStep}>{index + 1}</StepCircle>
              {index + 1 === currentStep && <StepLabel position={getStepPosition(currentStep)}>{step.label}</StepLabel>}
            </Step>
          </React.Fragment>
        ))}
      </StepsWrapper>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.1rem;
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
  ${({ active }) => active && "outline: solid 4px rgba(31, 83, 255, 0.36)"};
`;

const StepLabel = styled.div<{ position: "left" | "center" | "right" }>`
  top: 4rem;
  left: ${({ position }) => (position === "left" ? "-35%" : position === "center" ? "7.5%" : "55%")};
  position: absolute;
  width: ${({ position }) => (position === "center" ? "175px":"150px")};
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  text-align: center;
  color: #5e6162;
`;

const StepConnector = styled.div`
  position: relative;
  top: 15px;
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #c6caca;
  background-color: transparent;
`;
