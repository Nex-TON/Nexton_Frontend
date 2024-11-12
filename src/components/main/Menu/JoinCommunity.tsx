import { styled } from "styled-components";

import IcNftMoreArrow from "@/assets/icons/Landing/ic_nftMore_arrow.svg";
import IcNftMoreArrowDisabled from "@/assets/icons/Landing/ic_nftMore_arrow_disabled.svg";
import IcMenuDiscordDisabled from "@/assets/icons/Menu/ic_menu_discord_disabled.svg";
import IcMenuGithub from "@/assets/icons/Menu/ic_menu_github.svg";
import IcMenuTwitter from "@/assets/icons/Menu/ic_menu_twitter.svg";
import IcMenuTelegram from "@/assets/icons/Menu/ic_menu_telegram.svg";
import IcMenuSupport from "@/assets/icons/Menu/ic_menu_support.svg";

const JoinCommunity = () => {
  const handleNewTap = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <JoinCommunityWrapper>
      <JoinCommunityTitle>Community</JoinCommunityTitle>
      <JoinCommunityButtonList>
        <JoinCommunityButton onClick={() => handleNewTap("https://twitter.com/NextonNode")} id="menu page x button">
          <div id="menu page x button">
            <img src={IcMenuTwitter} alt="twitter" id="menu page x button" />X
          </div>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} id="menu page x button" />
        </JoinCommunityButton>
        <JoinCommunityButton
          onClick={() => handleNewTap("https://t.me/+VXJb_F6k6sthNzhl")}
          id="menu page global channel button"
        >
          <div id="menu page global channel button">
            <img src={IcMenuTelegram} alt="telegram" id="menu page global channel button" />
            Global Channel
          </div>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} id="menu page global channel button" />
        </JoinCommunityButton>
        <JoinCommunityButton onClick={() => handleNewTap("https://t.me/m/-Y3bstHbMzE9")} id="menu page support button">
          <div id="menu page github button">
            <img src={IcMenuSupport} alt="support" id="menu page support button" />
            support
          </div>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} id="menu page github button" />
        </JoinCommunityButton>
        <JoinCommunityButton onClick={() => handleNewTap("https://github.com/Nex-TON")} id="menu page github button">
          <div id="menu page github button">
            <img src={IcMenuGithub} alt="github" id="menu page github button" />
            Github
          </div>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} id="menu page github button" />
        </JoinCommunityButton>
        <JoinCommunityButton $inactive>
          <div>
            <img src={IcMenuDiscordDisabled} alt="discord_disabled" />
            Discord
          </div>
          <img src={IcNftMoreArrowDisabled} alt="moreArrow_disabled" width={10} />
        </JoinCommunityButton>
      </JoinCommunityButtonList>
    </JoinCommunityWrapper>
  );
};

export default JoinCommunity;

const JoinCommunityWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  margin-top: 49px;
`;

const JoinCommunityTitle = styled.div`
  color: var(--Neutral-variant-Neutral-variant-20, #2f3038);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;

const JoinCommunityButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  width: 100%;
  margin-top: 1rem;
`;

const JoinCommunityButton = styled.button<{ $inactive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.5rem 2rem;

  border: none;
  border-radius: 15px;
  background-color: ${({ $inactive }) => ($inactive ? "#E1E4E6" : "#FFF")};

  cursor: ${({ $inactive }) => ($inactive ? "default" : "pointer")};

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.2rem;

    color: ${({ $inactive }) => ($inactive ? "#B9B9BA" : "#2f3038")};
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
`;
