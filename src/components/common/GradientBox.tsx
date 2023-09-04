import { styled } from "styled-components";

const GradientBox = () => {
  return (
    <GradientBoxWrapper>
      <CommingSoonText>
        Coming
        <br />
        soon
      </CommingSoonText>
    </GradientBoxWrapper>
  );
};

export default GradientBox;

const GradientBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  width: 90%;
  height: 90%;

  border-radius: 50%;
  background: radial-gradient(
    60.61% 60.61% at 50% 50%,
    #f2f2f7 0%,
    rgba(242, 242, 247, 0) 82.33%
  );
`;

const CommingSoonText = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 0.5rem;

  color: #0088cc;
  ${({ theme }) => theme.fonts.Nexton_Comming_Soon};

  text-align: center;
  z-index: 1;
`;
