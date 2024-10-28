import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import "./DropdownMenu.css";

const DropdownArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M16.7998 9.5999L11.9998 14.3999L7.19981 9.5999"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DropdownMenu = ({ options, defaultValue, onOptionSelect }) => {
  return (
    <Dropdown
      className="DropdownRoot"
      controlClassName="DropdownControl"
      menuClassName="DropdownMenu"
      options={options}
      onChange={onOptionSelect}
      value={defaultValue}
      placeholder="Select an option"
      arrowClosed={<DropdownArrow />}
      arrowOpen={<DropdownArrow />}
    />
  );
};

export default DropdownMenu;
