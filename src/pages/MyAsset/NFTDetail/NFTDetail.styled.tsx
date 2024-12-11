import { styled } from "styled-components";

export const NFTDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const NFTDetailCard = styled.div`
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

export const NFTDetailCardImageBox = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f5f5f5;
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
  }

  img {
    width: 171px;
    height: auto;
    border-radius: 2rem;
  }
`;

export const NFTDetailCardTitle = styled.h1`
  color: #fff;
  text-align: center;
  align-self: stretch;

  ${({ theme }) => theme.fonts.Nexton_Title_Medium_2};
`;

export const NFTDetailCardButton = styled.button<{ $disabled?: boolean }>`
  all: unset;

  width: 200px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 1.5rem;
  background: ${({ $disabled }) => ($disabled ? "#E1E4E6" : "#1f53ff")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: #fff;
`;

export const NFTDetailContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding: 2.9rem 2rem;
  gap: 1rem;
`;

export const NFTDetailItem = styled.div<{ $marginTop?: boolean; $itemsCenter?: boolean }>`
  width: 100%;
  display: inline-flex;
  padding: 1.5rem 2rem;
  flex-direction: column;
  align-items: ${({ $itemsCenter }) => ($itemsCenter ? "center" : "flex-start")};
  gap: 0.3rem;

  border-radius: 1.5rem;
  background: #fff;

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);

  margin-top: ${({ $marginTop }) => ($marginTop ? "3.7rem" : "0")};
`;

export const NFTDetailItemCaption = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: #aaaeaf;
`;

export const NFTDetailItemText = styled.p<{ $textCenter?: boolean }>`
  width: 100%;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #303234;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

  text-align: ${({ $textCenter }) => ($textCenter ? "center" : "left")};
  img {
    width: 18px;
    height: 18px;
    margin-right: 0.6rem;
  }
`;

export const NFTDetailItemBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  margin-bottom: 3.7rem;
`;
