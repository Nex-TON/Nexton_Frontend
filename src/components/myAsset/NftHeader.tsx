import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";

const NftHeader = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case "/myasset/nftlist":
        setValue(0);
        break;
      case "/myasset/unstaked":
        setValue(1);
        break;
      case "/myasset/reward":
        setValue(2);
        break;
      default:
        setValue(0);
        navigate("/myasset/nftlist"); // 기본 경로
        break;
    }
  }, [location.pathname, navigate]);

  //tab바 누르면 각 페이지로 이동하게 설정
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/myasset/nftlist"); // NFT 페이지 경로
        break;
      case 1:
        navigate("/myasset/unstaked"); // Unstaked 페이지 경로
        break;
      // case 2:
      //   navigate("/myasset/reward"); // Reward 페이지 경로
      //   break;
      default:
        break;
    }
  };
  return (
    <>
      <NftHeaderTitle>My Activity</NftHeaderTitle>
      <NftHeaderTab>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="Tabs where each tab needs to be selected manually"
            centered={true}
            indicatorColor="primary"
            textColor="inherit"
            sx={{
              display: "flex",
              "& .Mui-selected": {
                color: "#000", // 선택된 탭 글자 색상
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1F53FF", // 선택된 탭 아래의 밑줄 색상
                border: "0.3rem",
              },
              color: "black",
            }}
          >
            <Tab
              label="NFT"
              sx={{
                flex: 1,
                borderBottom: value === 0 ? "0.3rem solid #1F53FF" : "0.1rem solid #E5E5EA;",
                fontSize: "1.4rem",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: value === 0 ? "700" : "500",
                lineHeight: "2.2rem",
                color: value === 0 ? "#000" : "#909394",
              }}
            />
            <Tab
              label="Unstaked"
              sx={{
                flex: 1,
                borderBottom: value === 1 ? "0.3rem solid #1F53FF" : "0.1rem solid #E5E5EA;",
                fontSize: "1.4rem",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: value === 1 ? "700" : "500",
                lineHeight: "2.2rem",
                color: value === 1 ? "#000" : "#909394",
              }}
            />
            <Tab
              label="Reward"
              disabled={true}
              sx={{
                flex: 1,
                borderBottom: value === 2 ? "0.3rem solid #1F53FF" : "0.1rem solid #E5E5EA;",
                fontSize: "1.4rem",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "2.2rem",
                color: "#909394",
              }}
            />
          </Tabs>
        </Box>
      </NftHeaderTab>
    </>
  );
};
export default NftHeader;

const NftHeaderTab = styled.div`
  margin-bottom: 1.5rem;
`;

const NftHeaderTitle = styled.div`
  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1}
`;
