import styled from "styled-components";
import { useNavigate } from "react-router";

interface ButtonProps {
  title: string;
  page: string;
}
const Button = (props: ButtonProps) => {
  const navigate = useNavigate();
  const { title, page } = props;

  const moveToPage = () => {
    switch (page) {
      case "Stake":
        navigate("/leverage");
        break;
      case "Nlp":
        navigate("/nlp");
        break;
      case "Myasset":
        navigate("/myasset");
        break;
      default:
        break;
    }
  };

  return <StyledButton onClick={moveToPage}>{title}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem 2.4rem;

  border: none;
  border-radius: 3rem;
  background: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Medium_1};
  color: #ffffff;

  cursor: pointer;

  & + & {
    margin-top: 1rem;
  }
`;
