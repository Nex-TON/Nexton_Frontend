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
          Loan
        </UpcomingMenuButton>
        <UpcomingMenuButton>
          <img src={IcMenuNXT} alt="menuNXT" />
          NXT
        </UpcomingMenuButton>
        <UpcomingMenuButton>
          <img src={IcMenuNLP} alt="menuNLP" />
          NLP
        </UpcomingMenuButton>
        <UpcomingMenuButton>
          <img src={IcMenuSwap} alt="menuSwap" />
          Swap
        </UpcomingMenuButton>
      </UpcomingMenuButtonWrapper>
    </UpcomingMenuWrapper>
  );
};

export default UpcomingMenu;

const UpcomingMenuWrapper = styled.div`
  width: 100%;
  margin: 3rem 0 4.4rem 0;
  padding: 0 1.5rem;
`;

const UpcomingMenuTitle = styled.div`
  width: 100%;
  padding-left: 1rem;

  color: #2c3542;
  ${({ theme }) => theme.fonts.Nexton_Title_Small};
  text-align: left;
`;

const UpcomingMenuButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0 0.7rem;
  margin-top: 1.6rem;
`;

const UpcomingMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  width: 4.6rem;

  border: none;
  background-color: transparent;
  color: #b9b9ba;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};

  cursor: default;
`;
