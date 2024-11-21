import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Onboarding1 = () => {
  return (
    <>
      <OnbardingWrapper>
        <IllustWrapper></IllustWrapper>
        <BottomBoxWrapper></BottomBoxWrapper>
      </OnbardingWrapper>
    </>
  );
};
export default Onboarding1;

const BottomBoxWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 43.7rem;
`;

const IllustWrapper = styled.div`
  height: 45.9rem;
  width: 100%;
  background-color: #668aff;
  display: flex;
  position: absolute;
  top: 0;
`;

const OnbardingWrapper = styled.div`
  width: 100%;
  max-width: 76.8rem;
`;
