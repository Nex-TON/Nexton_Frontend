import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

const stageColors = {
  default: "#C6CACA", // Default or incomplete stage color
  current: "#2C80FF", // Color for the current stage
  completed: "#7FBCFF", // Color for completed stages
};

const stages = {
  "/stake/amount": ["current", "default", "default"],
  "/stake/nominator": ["completed", "current", "default"],
  // "/stake/leverage": ["completed", "completed", "current", "default"],
  "/stake/preview": ["completed", "completed", "completed"],
  default: ["default", "default", "default"],
};

const ProgressBar = () => {
  const { pathname } = useLocation();
  const [stageSetup, setStageSetup] = useState(["default", "default", "default", "default"]);

  useEffect(() => {
    const currentStages = stages[pathname] || stages.default;
    setStageSetup(currentStages.map(stage => stageColors[stage]));
  }, [pathname]);

  return (
    <ProgressBarWrapper>
      {stageSetup.map((color, index) => (
        <ProgressItem key={index} $stageColor={color} />
      ))}
    </ProgressBarWrapper>
  );
};

export default ProgressBar;

const ProgressItem = styled.div<{ $stageColor: string }>`
  flex: 1;
  height: 100%;
  background-color: ${({ $stageColor }) => $stageColor};

  &:first-child {
    border-radius: 1rem 0 0 1rem;
  }

  &:last-child {
    border-radius: 0 1rem 1rem 0;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 0.4rem;
  margin-top: 1rem;
  margin-bottom: 2.4rem;
`;
