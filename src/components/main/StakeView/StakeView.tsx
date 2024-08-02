import { useState } from "react";
import ToggleGroup from "@components/common/ToggleGroup";
import { styled } from "styled-components";

import IcWarning from "@/assets/icons/Landing/ic_warning.svg";

import MainNftViewList from "./MainNftViewList";

const toggleOptions = [
  { label: "Stake", value: "stake" },
  { label: "NFTs", value: "nfts" },
  { label: "Point", value: "point" },
];

export type MainNftViewListType = "stake" | "nfts" | "point";

const StakeView = () => {
  const [toggleSelected, setToggleSelected] = useState<MainNftViewListType>("stake");

  return (
    <MainNftViewWrapper>
      <MainNFtViewInnerBox>
        <MainNftViewInnerTitleBox>
          <MainNFtViewInnerTitle>Let’s Stake!</MainNFtViewInnerTitle>
        </MainNftViewInnerTitleBox>

        <ToggleGroup
          options={toggleOptions}
          value={toggleSelected}
          onChange={value => setToggleSelected(value as MainNftViewListType)}
        />

        <MainNftViewList state={toggleSelected} />

        <MainNFtViewDisclaimer>
          <img src={IcWarning} alt="warning" />
          <p>
            This service is in alpha version.
            <br />
            The functionality of the service may be updated in the future.
          </p>
        </MainNFtViewDisclaimer>
      </MainNFtViewInnerBox>
    </MainNftViewWrapper>
  );
};

export default StakeView;

const MainNftViewWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
`;

const MainNFtViewInnerBox = styled.div`
  width: 100%;
  margin-top: 0.6rem;
  padding: 1.1rem;
`;

const MainNftViewInnerTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-bottom: 10px;
`;

const MainNFtViewInnerTitle = styled.span`
  color: #2f3038;
  font-family: Montserrat;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.4rem;
`;

const MainNFtViewDisclaimer = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: start;

  img {
    margin-right: 0.6rem;
    padding-top: 0.2rem;
  }

  p {
    color: #909394;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  }
`;
