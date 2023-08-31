import { styled } from "styled-components";

interface ButtonProps {
  title: string;
}

const Button = (props: ButtonProps) => {
  const { title } = props;
  return <StyleButton>{title}</StyleButton>;
};

export default Button;

const StyleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem 0;
  margin-top: 1.4rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #008aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);

  outline: none;
  cursor: pointer;
`;
