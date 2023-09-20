import styled, { css } from "styled-components";

interface TitleProps {
  title: string;
  type?: string;
}

const Title = (props: TitleProps) => {
  const { title, type } = props;

  return <TiTleWrapper type={type}>{title}</TiTleWrapper>;
};

export default Title;

const TiTleWrapper = styled.span<{ type?: string }>`
  color: #333;
  font-family: Montserrat;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.4rem; /* 100% */
  letter-spacing: -0.046rem;

  ${({ type }) =>
    type === "step3" &&
    css`
      font-family: Montserrat;
      font-size: 2rem;
      font-style: normal;
      font-weight: 400;
      line-height: 2.4rem; /* 120% */
      letter-spacing: -0.046rem;
    `}
`;
