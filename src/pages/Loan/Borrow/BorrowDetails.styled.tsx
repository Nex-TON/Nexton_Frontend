import { styled } from "styled-components";

export const BorrowWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 2.5rem 1.5rem;
`;

export const BorrowHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const BorrowHeaderBoxTitle = styled.div`
  display: flex;
  text-transform: capitalize;

  h1 {
    color: #0f0f0f;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }
`;

export const BorrowContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding-bottom: 4rem;
`;

export const CollateralizingNFTInfo = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 1.5rem 2rem;
  flex-direction: column;
  align-items: "center";
  gap: 1.2rem;

  border-radius: 1.5rem;
  background: #1a1b23;

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

export const CollateralizingNFTInfoHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #fff;
`;

export const CollateralizingNFTInfoItemBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: end;
  gap: 0.6rem;
`;

export const ExcludeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const BorrowRateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 1.6rem 2.4rem;

  border-radius: 1.5rem;
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

export const BorrowRateBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BorrowRateBoxDivider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #f1f4f4;

  margin: 1.2rem 1.7rem 2.3rem 1.7rem;
`;

export const BorrowRateBoxHeaderLeft = styled.h2`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #303234;
`;

export const BorrowRateBoxHeaderRight = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  color: #909394;
`;

export const BorrowRateBoxBottom = styled.div`
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
  display: flex;
  justify-content: end;
  align-items: center;
`;
