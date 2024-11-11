import { css, styled } from "styled-components";

import IcTon from "@/assets/icons/Stake/Staking_TON.png";
import IcNxTon from "@/assets/icons/Stake/Staking_nxTON.png";
import IcArrowDown from "@/assets/icons/Stake/chevron-down.svg";
import IcArrowUp from "@/assets/icons/Stake/chevron-up.svg";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
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
    <div>
      <FormControl>
        <Select
        //   variant="solid"
          value={token}
          onChange={handleChange}
          displayEmpty
          // inputProps={{ "aria-label": "Whitout label" }}
          sx={{
            backgroundColor: "#1A1B23",
            borderRadius: "20px",
            height: "35px",
            width: selectWidth,
            display: "flex",
            textAlign: "start",
            outline: "none",
            border: "none",
          }}
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
          slotProps={{
            root: {
              sx: {
                "&:focus": {
                  outline: "none", // 포커스 시 아웃라인 제거
                  backgroundColor: "#1A1B23", // 포커스 시 배경색 유지
                },
                "&:hover": {
                  backgroundColor: "#1A1B23", // 호버 시 배경색 유지
                },
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
        </Select>
      </FormControl>
    </div>
  );
};
export default TokenFilter;

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
