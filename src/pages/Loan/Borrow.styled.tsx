import { styled } from "styled-components";

export const BorrowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const BorrowCard = styled.div`
  width: 100%;
  display: flex;

  padding: 27px 69px 28px 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 11.706px;

  border-radius: 0px 0px 20px 20px;
  background: #1a1b23;
  box-shadow: 0px 4px 8.6px 0px rgba(206, 216, 225, 0.5);
`;

export const NFTStatus = styled.div<{ type?: string }>`
  background-color: lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 100%;
  padding-top: 100%;
  border-radius: 12px;

  background-image: ${({ type }) =>
    type === "ongoing"
      ? `linear-gradient(217deg, rgba(61, 80, 255, 0.00) 9.1%, #C7CAE9 88.74%), url("./src/assets/image/Loan/OngoingNFTItem.png") lightgray 50% / cover no-repeat`
      : type === "forthComing"
        ? `linear-gradient(217deg, rgba(255, 93, 57, 0.00) 57.93%, #FF5D39 88.74%), url("./src/assets/image/Loan/ForthcomingNFTItem.png") lightgray 50% / cover no-repeat;`
        : `linear-gradient(217deg, rgba(255, 255, 255, 0.00) 35.65%, #A4A4A4 88.74%), url("./src/assets/image/Loan/ExpiredNFTItem.png") lightgray 50% / cover no-repeat`};
`;

export const BorrowCardTitle = styled.h1`
  color: #fff;
  text-align: center;
  align-self: stretch;

  ${({ theme }) => theme.fonts.Nexton_Title_Medium_2};
`;

export const BorrowCardButton = styled.button`
  all: unset;

  width: 200px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 10px;
  background: #1f53ff;
  cursor: pointer;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: #fff;
`;

export const BorrowDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 2.9rem 2rem;
  gap: 1rem;
`;

export const BorrowDetailItem = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 1.3rem 1.5rem 3rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;

  border-radius: 2rem;
  background: #fff;

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

export const BorrowDetailItemCaption = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
  color: rgba(170, 174, 175, 1);
`;

export const BorrowDetailItemText = styled.p`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #303234;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BorrowDetailItemBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;
