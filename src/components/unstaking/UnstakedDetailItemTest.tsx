//This File is the test file for unstakeddetailitem design
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const UnstakedDetailItem = () => {
  const navigate = useNavigate();

  return (
    <UnstakingDetailItemWrapper onClick={() => navigate(`/unstaking/1/view`)}>
      <UnstakingDetailId>ID 1234</UnstakingDetailId>

      <UnstakingDetailContentBox>
        <UnstakingDetailContentBoxItem style={{ marginBottom: "0.9rem" }}>
          <span>State</span>
          <p>58 Days 36Hrs</p>
        </UnstakingDetailContentBoxItem>

        <UnstakingDetailContentBoxItem>
          <span>Value</span>
          <p>000 TON</p>
        </UnstakingDetailContentBoxItem>

        <UnstakingDetailContentBoxDivider />

        <UnstakingDetailContentBoxItem>
          <span>Date of unstaking</span>
          <p>
            01D/01M/2023Y
          </p>
        </UnstakingDetailContentBoxItem>
      </UnstakingDetailContentBox>
    </UnstakingDetailItemWrapper>
  );
};

export default UnstakedDetailItem;

const UnstakingDetailItemWrapper = styled.div`
  width: 100%;
  padding: 2rem;

  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.50);

  & + & {
    margin-top: 0.8rem;
  }

  cursor: pointer;
`;

const UnstakingDetailContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin-top: 1.2rem;
`;

const UnstakingDetailContentBoxItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  span {
    color: #aaaeaf;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  }
`;

const UnstakingDetailContentBoxDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f1f4f4;

  margin: 2rem 0;
`;

const UnstakingDetailId = styled.div`
  display: flex;
  width: fit-content;
  height: 32px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 30px;
  background: linear-gradient(276deg, rgba(197, 197, 197, 0.71) 5.57%, rgba(0, 0, 0, 0.8) 95.68%);

  color: #fff;
  text-align: center;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;