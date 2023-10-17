import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

const ProgressBar = () => {
  const [progressStatus, setProgressStatus] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    setProgressStatus(pathname.slice(7));
  });

  return (
    <ProgressBarWrapper>
      <ProgressFirstItem progressStatus={progressStatus} />
      <ProgressSecondItem progressStatus={progressStatus} />
      <ProgressThirdItem progressStatus={progressStatus} />
      <ProgressFinalItem progressStatus={progressStatus} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;

const ProgressBarWrapper = styled.div`
  display: flex;

  width: 100%;
  height: 0.4rem;
  margin-top: 1rem;
  margin-bottom: 2.4rem;
`;

const ProgressFirstItem = styled.div<{ progressStatus: string }>`
  width: 25%;
  height: 100%;

  background-color: ${({ progressStatus }) =>
    progressStatus === "amount" ? "#2C80FF" : "#7FBCFF"};

  border-radius: 1rem 0 0 1rem;
`;
const ProgressSecondItem = styled.div<{
  progressStatus: string;
}>`
  width: 25%;
  height: 100%;

  background-color: ${({ progressStatus }) =>
    progressStatus === "amount"
      ? "#C6CACA"
      : progressStatus === "nominator"
      ? "#2C80FF"
      : "#7FBCFF"};
`;
const ProgressThirdItem = styled.div<{ progressStatus: string }>`
  width: 25%;
  height: 100%;

  background-color: ${({ progressStatus }) =>
    progressStatus === "leverage"
      ? "#2C80FF"
      : progressStatus === "preview"
      ? "#7FBCFF"
      : "#C6CACA"};
`;

const ProgressFinalItem = styled.div<{ progressStatus: string }>`
  width: 25%;
  height: 100%;

  background-color: ${({ progressStatus }) =>
    progressStatus === "preview" ? "#2C80FF" : "#C6CACA"};

  border-radius: 0 1rem 1rem 0;
`;
