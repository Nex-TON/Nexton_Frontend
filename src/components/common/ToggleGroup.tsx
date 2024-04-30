import { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $active: boolean;
}

interface ToggleProps {
  options: { label: string; value: string }[];
  value: string;
  onChange?: (option: string) => void;
}

const ToggleGroup: FC<ToggleProps> = ({ options, value, onChange }) => {
  const handleClick = option => {
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <ToggleContainer>
      {options.map(option => (
        <ToggleButton key={option.value} $active={option.value === value} onClick={() => handleClick(option.value)}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleContainer>
  );
};

export default ToggleGroup;

const ToggleContainer = styled.div`
  display: flex;
  background-color: #74748014;
  border-radius: 8.91px;
  padding: 2px 3px;
  width: 100%;
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  flex: 1;
  padding: 10px 20px;
  border: 0.5px;
  border-color: #74748014;
  background-color: transparent;
  box-shadow: ${props => (props.$active ? "0px 3px 8px 0px rgba(0, 0, 0, 0.12)" : "none")};
  border-radius: 6.93px;
  font-weight: ${props => (props.$active ? "bold" : "normal")};
  cursor: pointer;
  background-color: ${props => (props.$active ? "#FFFFFF" : "none")};
  color: #000000;
  transition: background-color 0.3s;
  text-transform: capitalize;

  &:focus {
    outline: none;
  }
`;
