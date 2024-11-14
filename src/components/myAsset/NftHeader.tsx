import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";

const NftHeader = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  //tab바 누르면 각 페이지로 이동하게 설정
  const handleTabChange = (event,newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/myasset/nftlist"); // NFT 페이지 경로
        break;
      case 1:
        navigate("/myasset/unstaked"); // Unstaked 페이지 경로
        break;
      case 2:
        navigate("/myasset/reward"); // Reward 페이지 경로
        break;
      default:
        break;
    }
  };

  //처음 mypage 들어왔을 때 nftlist 뜨게 설정
  useEffect(()=>{
    navigate('/myasset/nftlist');
  },[]);

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
            sx={{
              "& .Mui-selected": {
                color: "#000", // 선택된 탭 글자 색상
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1F53FF", // 선택된 탭 아래의 밑줄 색상
                border:"0.3rem"
              },
              color: "black",
            }}
          >
            <Tab
              label="NFT"
              sx={{
                borderBottom: value === 0 ? "0.3rem solid #1F53FF" : "0.1rem solid #E5E5EA;",
                fontSize: "1.4rem",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "2.2rem",
                color: "#909394",
              }}
            />
            <Tab
              label="Unstaked"
              sx={{
                borderBottom: value === 1 ? "0.3rem solid #1F53FF" : "0.1rem solid #E5E5EA;",
                fontSize: "1.4rem",
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "2.2rem",
                color: "#909394",
              }}
            />
            <Tab
              label="Reward"
              sx={{
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
