import { styled } from "styled-components";
import { StyledEngineProvider } from "@mui/material";

import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Stake/Staking_nxTON.png";
import IcArrowDown from "@/assets/icons/Stake/chevron-down.svg";
import IcArrowUp from "@/assets/icons/Stake/chevron-up.svg";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TokenFilter = () => {
  const [token, setToken] = React.useState("TON");
  const handleChange = (event: SelectChangeEvent) => {
    setToken(event.target.value);
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault(); // 기본 동작 방지
    setIsOpen(!isOpen);
  };

  const CustomIcon = ({ isOpen }: { isOpen: boolean }) => (
    <img
      src={isOpen ? IcArrowUp : IcArrowDown}
      alt="toggle icon"
      style={{ width: "14px", height: "14px", marginRight: "10px" }}
    />
  );

  const selectWidth = token === "nxTON" ? "114px" : "98px";

  return (
    <StyledEngineProvider injectFirst>
      <FormControl>
        <MySelect
          selectWidth={selectWidth}
          value={token}
          onChange={handleChange}
          displayEmpty
          onMouseDown={handleToggle}
          IconComponent={() => <CustomIcon isOpen={isOpen} />}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "#1A1B23",
                borderRadius: "10px",
                marginTop: "8px",
                width: "119px",
              },
            },
          }}
        >
          <MenuItem value="TON" style={{ backgroundColor: "#1A1B23" }}>
            <DefaultFilterWrapper>
              <img src={IcTon} alt="filter ton icon" />
              <DefaultValueText>TON</DefaultValueText>
            </DefaultFilterWrapper>
          </MenuItem>
          <MenuItem value="nxTON" style={{ backgroundColor: "#1A1B23" }}>
            <DefaultFilterWrapper>
              <img src={IcNxTon} alt="filter nxton icon" />
              <DefaultValueText>nxTON</DefaultValueText>
            </DefaultFilterWrapper>
          </MenuItem>
        </MySelect>
      </FormControl>
    </StyledEngineProvider>
  );
};
export default TokenFilter;

const MySelect = styled(Select)<{ selectWidth: string }>`
  background-color: #1a1b23;
  border-radius: 20px;
  height: 35px;
  width: ${props => props.selectWidth};
  display: flex;
  text-align: start;
  
  & .MuiSelect-select {
    border: none;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: transparent;
  }
`;

const DefaultValueText = styled.div`
  display: flex;
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
  font-family: Montserrat;
  font-style: normal;
`;

const DefaultFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  img {
    width: 22px;
    height: 22px;
  }
`;
