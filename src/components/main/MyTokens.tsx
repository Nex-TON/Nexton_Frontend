import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcWarning from "@/assets/icons/Landing/ic_warning.svg";
import IcJettonCoin from "@/assets/icons/Main/ic_jetton_coin.svg";
import IcLSTCoin from "@/assets/icons/Main/ic_lst_coin.svg";

const MyTokens = () => {
  const navigate = useNavigate();

  return (
    <MyTokensWrapper>
      <MyTokensInnerBox>
        <MyTokensInnerTitleBox>
          <MyTokensInnerTitle>My Tokens</MyTokensInnerTitle>
        </MyTokensInnerTitleBox>

        <MyTokensItemBox>
          <MyTokensItem onClick={() => navigate("/stake/amount")}>
            <MyTokensItemTitle>
              <img src={IcLSTCoin} alt="lst_coin" />
              <h4>My LST</h4>
            </MyTokensItemTitle>
            <MyTokensItemContent>0.0</MyTokensItemContent>
          </MyTokensItem>

          <MyTokensItem onClick={() => navigate("/stake/amount")}>
            <MyTokensItemTitle>
              <img src={IcJettonCoin} alt="jetton_coin" />
              <h4>My Jetton</h4>
            </MyTokensItemTitle>
            <MyTokensItemContent>0.0</MyTokensItemContent>
          </MyTokensItem>
        </MyTokensItemBox>

        <MyTokensDisclaimer>
          <img src={IcWarning} alt="warning" />
          <p>
            This service is in alpha version.
            <br />
            The functionality of the service may be updated in the future.
          </p>
        </MyTokensDisclaimer>
      </MyTokensInnerBox>
    </MyTokensWrapper>
  );
};

export default MyTokens;

const MyTokensWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
`;

const MyTokensInnerBox = styled.div`
  width: 100%;
  margin-top: 0.6rem;
  padding: 1.1rem;
`;

const MyTokensInnerTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-bottom: 10px;
`;

const MyTokensInnerTitle = styled.span`
  color: #2f3038;
  font-family: Montserrat;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.4rem;
`;

const MyTokensItemBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1.7rem;
  gap: 1.1rem;
`;

const MyTokensItem = styled.div`
  width: 100%;
  height: 98px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1.6rem;
  box-shadow: 4px 4px 16px 0px rgba(206, 216, 225, 0.5);
  border-radius: 2rem;

  cursor: pointer;
`;

const MyTokensItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;

  h4 {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  }
`;

const MyTokensItemContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-family: Montserrat;
  font-size: 17px;
  font-style: normal;
  font-weight: 800;
  line-height: 26px;
  color: #46494a;
`;

const MyTokensDisclaimer = styled.div`
  margin-top: 5rem;
  display: flex;
  align-items: start;

  img {
    margin-right: 0.6rem;
    padding-top: 0.2rem;
  }

  p {
    color: #909394;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  }
`;
