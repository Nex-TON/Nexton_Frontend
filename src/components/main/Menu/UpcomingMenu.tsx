import { styled } from "styled-components";

import IcMenuLoan from "@/assets/icons/Menu/ic_menu_loan.svg";
import IcMenuNLP from "@/assets/icons/Menu/ic_menu_nlp.svg";
import IcMenuNXT from "@/assets/icons/Menu/ic_menu_nxt.svg";
import IcMenuSwap from "@/assets/icons/Menu/ic_menu_swap.svg";

const UpcomingMenu = () => {
  return (
    <UpcomingMenuWrapper>
      <UpcomingMenuTitle>Upcoming</UpcomingMenuTitle>
      <UpcomingMenuButtonWrapper>
        <UpcomingMenuButton>
          <img src={IcMenuLoan} alt="menuLoan" />
          <div>Loan</div>
        </UpcomingMenuButton>
        <UpcomingMenuButton>
          <img src={IcMenuNXT} alt="menuNXT" />
          <div>NXT</div>
        </UpcomingMenuButton>
        <UpcomingMenuButton>
          <img src={IcMenuNLP} alt="menuNLP" />
          <div>NLP</div>
        </UpcomingMenuButton>
        <UpcomingMenuButton>
          <img src={IcMenuSwap} alt="menuSwap" />
          <div>Swap</div>
        </UpcomingMenuButton>
      </UpcomingMenuButtonWrapper>
    </UpcomingMenuWrapper>
  );
};

export default UpcomingMenu;

const UpcomingMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px 116px 10px;
  margin-top: 48px;
`;

const UpcomingMenuTitle = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  margin-bottom: 12px;
`;

const UpcomingMenuButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 10px 12px;
`;

const UpcomingMenuButton = styled.button`
  display: flex;
  padding: 15px 0px 16px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 15px;
  background: #e1e4e6;
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);

  img {
    width: 24px;
    height: 24px;
  }
  div {
    color:#B9B9BA;
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
  }
`;
