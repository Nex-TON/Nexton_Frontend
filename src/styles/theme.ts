import { css, DefaultTheme } from "styled-components";

const fonts = {
  Telegram_Title_1: css`
    font-family: "Pretendard";
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 3.4rem; /* 121.429% */
    letter-spacing: 0.039rem;
  `,
  Telegram_Title_2: css`
    font-family: "Pretendard";
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.8rem; /* 127.273% */
    letter-spacing: -0.0264rem;
  `,
  Telegram_Title_3: css`
    font-family: "Pretendard";
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.4rem; /* 120% */
    letter-spacing: -0.046rem;
  `,
  Telegram_Title_3_1: css`
    font-family: "Pretendard";
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.4rem; /* 120% */
    letter-spacing: -0.046rem;
  `,
  Telegram_Headline: css`
    font-family: "Pretendard";
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 590;
    line-height: 2.2rem; /* 129.412% */
    letter-spacing: -0.0442rem;
  `,
  Telegram_Body: css`
    font-family: "Pretendard";
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.2rem; /* 129.412% */
    letter-spacing: -0.0442rem;
  `,
  Telegram_Medium_1: css`
    font-family: "Pretendard";
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 510;
    line-height: 2.2rem; /* 129.412% */
    letter-spacing: -0.0442rem;
  `,
  Telegram_Medium_2: css`
    font-family: "Pretendard";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 590;
    line-height: 1.8rem; /* 120% */
    letter-spacing: -0.024rem;
  `,
  Telegram_SemiBold: css`
    font-family: "Pretendard";
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 590;
    line-height: 2.2rem; /* 129.412% */
    letter-spacing: -0.0442rem;
  `,
  Telegram_Callout: css`
    font-family: "Pretendard";
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.2rem; /* 137.5% */
    letter-spacing: -0.032rem;
  `,
  Telegram_SubHeadline_1: css`
    font-family: "Pretendard";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem; /* 120% */
    letter-spacing: -0.024rem;
  `,
  Telegram_SubHeadline_2: css`
    font-family: "Pretendard";
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem; /* 128.571% */
    letter-spacing: -0.0154rem;
  `,
  Telegram_Footnote: css`
    font-family: "Pretendard";
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem; /* 138.462% */
    letter-spacing: -0.0078rem;
  `,
  Telegram_Footnote_1: css`
    font-family: "Pretendard";
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 510;
    line-height: 1.8rem; /* 138.462% */
    letter-spacing: -0.0078rem;
  `,
  Telegram_Caption_1: css`
    font-family: "Pretendard";
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6rem; /* 133.333% */
  `,
  Telegram_Caption_1_1: css`
    font-family: "Pretendard";
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 590;
    line-height: 1.4rem; /* 133.333% */
    letter-spacing: -0.012px;
  `,
  Telegram_Caption_2: css`
    font-family: "Pretendard";
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.3rem; /* 118.182% */
    letter-spacing: 0.0066rem;
  `,
  Telegram_Caption_3: css`
    font-family: "Pretendard";
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 118.182% */
  `,
  Telegram_Caption_4: css`
    font-family: "Pretendard";
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
  `,
  Nexton_Headline_Large: css`
    font-family: "Montserrat";
    font-size: 4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 5.4rem;
  `,
  Nexton_Title_Large: css`
    font-family: "Montserrat";
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 3rem; /* 125% */
    letter-spacing: -0.012rem;
  `,
  Nexton_Title_Large_2: css`
    font-family: "Montserrat";
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4rem; /* 125% */
    letter-spacing: -0.046rem;
  `,
  Nexton_Title_Large_Small: css`
    font-family: "Montserrat";
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4rem; /* 133.333% */
    letter-spacing: -0.046px;
  `,
  Nexton_Image_Title: css`
    font-family: "Montserrat";
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  Nexton_Title_Medium: css`
    font-family: "Montserrat";
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 3rem;
  `,
  Nexton_Title_Medium_1: css`
    font-family: "Montserrat";
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem;
  `,
  Nexton_Title_Medium_2: css`
    font-family: "Montserrat";
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 3.4rem; /* 154.545% */
    letter-spacing: -0.044rem;
  `,
  Nexton_Title_Small: css`
    font-family: "Montserrat";
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4rem; /* 133.333% */
    letter-spacing: -0.046rem;
  `,
  Nexton_Body_Text_Large: css`
    font-family: "Montserrat";
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.6rem;
  `,
  Nexton_Body_Text_Large_2: css`
    font-family: "Montserrat";
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.6rem;
  `,
  Nexton_Body_Text_Medium: css`
    font-family: "Montserrat";
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.6rem;
  `,
  Nexton_Body_Text_Medium_2: css`
    font-family: "Montserrat";
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.2rem;
  `,
  Nexton_Body_Text_Medium_3: css`
    font-family: "Montserrat";
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.2rem;
  `,
  Nexton_Body_Text_Small: css`
    font-family: "Montserrat";
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
  `,
  Nexton_Label_Large: css`
    font-family: "Montserrat";
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem;
  `,
  Nexton_Label_Medium: css`
    font-family: "Montserrat";
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.6rem;
  `,
  Nexton_Label_Small: css`
    font-family: "Montserrat";
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  Nexton_Label_Small_2: css`
    font-family: Montserrat;
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    line-height: 1.6rem; /* 145.455% */
  `,
  Nexton_Comming_Soon: css`
    font-family: "Montserrat";
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 800;
    line-height: 1.6rem;
  `,
  Nexton_Dashboard_text_0: css`
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
  `,
  Nexton_Dashboard_text_1: css`
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 16px */
    letter-spacing: -0.46px;
  `,
  Nexton_Dashboard_text_2: css`
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.4px;
  `,
};

export type FontsTypes = typeof fonts;

const theme: DefaultTheme = {
  fonts,
};

export { theme };
