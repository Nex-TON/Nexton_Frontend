import { styled } from "styled-components";
import IcMenuTwitter from "../../../assets/icons/Menu/ic_menu_twitter.svg";
import IcMenuGithub from "../../../assets/icons/Menu/ic_menu_github.svg";
import IcMenuDiscord from "../../../assets/icons/Menu/ic_menu_discord.svg";
import IcNftMoreArrow from "../../../assets/icons/Landing/ic_nftMore_arrow.svg";

const JoinCommunity = () => {
  const handleNewTap = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <JoinCommunityWrapper>
      <JoinCommunityTitle>Join in our community</JoinCommunityTitle>
      <JoinCommunityButtonList>
        <JoinCommunityButton
          onClick={() => handleNewTap("https://twitter.com/NextonNode")}
        >
          <JoinCommunityButtonRightBox>
            <img src={IcMenuTwitter} alt="twitter" />
            Twitter
          </JoinCommunityButtonRightBox>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} />
        </JoinCommunityButton>
        <JoinCommunityButton
          onClick={() => handleNewTap("https://github.com/Nex-TON")}
        >
          <JoinCommunityButtonRightBox>
            <img src={IcMenuGithub} alt="github" />
            Github
          </JoinCommunityButtonRightBox>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} />
        </JoinCommunityButton>
        <JoinCommunityButton>
          <JoinCommunityButtonRightBox>
            <img src={IcMenuDiscord} alt="discord" />
            Discord
          </JoinCommunityButtonRightBox>
          <img src={IcNftMoreArrow} alt="moreArrow" width={10} />
        </JoinCommunityButton>
      </JoinCommunityButtonList>
    </JoinCommunityWrapper>
  );
};

export default JoinCommunity;

const JoinCommunityWrapper = styled.div`
  width: 100%;
  padding: 0 3rem;
`;

const JoinCommunityTitle = styled.div`
  width: 100%;

  color: #2c3542;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
  text-align: left;
`;

const JoinCommunityButtonList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  margin-top: 1rem;
`;

const JoinCommunityButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.7rem 2rem;

  border: 0.1rem solid #d1d1d6;
  border-radius: 2rem;
  background-color: #f2f2f7;

  cursor: pointer;
`;

const JoinCommunityButtonRightBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.2rem;

  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
`;
