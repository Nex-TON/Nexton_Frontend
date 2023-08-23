import styled from "styled-components";
interface FooterButtonProps {
  title?: string;
  input?: string;
  ratio?: number;
  onClick?: () => void;
}

const FooterButton = (props: FooterButtonProps) => {
  const { input, title, onClick } = props;

  return Number(input) < 0.2 ? (
    <FooterButtonWrapper disabled={true}>{title}</FooterButtonWrapper>
  ) : (
    <FooterButtonWrapper onClick={onClick}>{title}</FooterButtonWrapper>
  );
};

export default FooterButton;

const FooterButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #007aff;
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);

  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  color: #ffffff;

  cursor: pointer;
`;
