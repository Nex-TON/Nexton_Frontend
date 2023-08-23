import { styled } from "styled-components";

const BorderLine = () => {
  return <BoderLineWrapper />;
};

export default BorderLine;

const BoderLineWrapper = styled.div`
  width: 100%;
  height: 0.4rem;

  margin: 2.2rem 0;

  border-radius: 2rem;
  background: var(linear-gradient(159deg, #f3f6fc 0%, #e6e7f7 100%));
  box-shadow: 0px 0.5rem 1.4rem 0px rgba(170, 174, 175, 0.2);
`;
