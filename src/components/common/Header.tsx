import { styled } from "styled-components";
import IcNextonLogo from "../../assets/icons/Landing/ic_nexton_logo.svg";

interface HeaderProps {
  isOpen: boolean;
  handleSwitchHamburger: () => void;
}

const Header = (props: HeaderProps) => {
  const { isOpen, handleSwitchHamburger } = props;

  return (
    <HeaderWrapper isOpen={isOpen}>
      <HeaderTitle onClick={handleSwitchHamburger}>
        <img src={IcNextonLogo} alt="nextonLogo" />
        NEXTON
      </HeaderTitle>
      <Button onClick={handleSwitchHamburger} isOpen={isOpen}>
        <span></span>
        <span></span>
        <span></span>
      </Button>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem 1.5rem;

  background-color: ${({ isOpen }) => (isOpen ? "#f1f1f4" : "#fff")};
`;

const Button = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  width: 2rem;
  height: 2rem;

  span {
    background-color: #333;
    display: block;
    position: absolute;
    height: 0.2rem;
    width: 100%;
    border-radius: 2px;
    transition: all 0.3s ease;

    &:nth-child(1) {
      top: ${({ isOpen }) => (isOpen ? "50%" : "0.2rem")};
      left: 0;
      transform: ${({ isOpen }) =>
        isOpen ? "translateY(-50%) rotate(45deg)" : "none"};
    }

    &:nth-child(2) {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      bottom: ${({ isOpen }) => (isOpen ? "50%" : "0.2rem")};
      left: 0;
      transform: ${({ isOpen }) =>
        isOpen ? "translateY(50%) rotate(-45deg)" : "none"};
    }
  }
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #2c3542;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;
